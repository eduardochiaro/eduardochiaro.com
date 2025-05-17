import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Select, Textarea } from '@/components/form';
import { updateMenuLink } from '@/actions/menu';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin > Menu Links | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DashboardMenusEdit({ params }: Props) {
  const id = (await params).slug;
  const menu = await pullSingleMenuLink(id);
  if (!menu) {
    redirect('/dashboard/menu');
  }

  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      url: formData.get('url'),
      order: formData.get('order'),
      onlyMobile: formData.get('onlyMobile'),
      active: formData.get('active'),
    };
    updateMenuLink(id, rawFormData);
    redirect('/dashboard/menu');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">
          Menus Edit <ChevronRight className="mx-2" /> {menu?.name}{' '}
        </h2>
      </Card>
      {menu && (
        <Card className="mx-auto max-w-3xl">
          <form action={saveData} className="flex flex-col gap-4">
            <div>
              <Input type="text" name="name" label="Name" value={menu.name || ''} required />
            </div>
            <div>
              <Input type="text" name="url" label="URL" value={menu.url || ''} required />
            </div>
            <div className="flex items-center gap-4">
              <div className="grow">
                <Input type="number" name="order" label="Order" value={menu.order as unknown as string} min={0} max={100} required />
              </div>
              <div className="grow">
                <Select name="active" label="Active" value={menu.active ? 'true' : 'false'}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Select>
              </div>
              <div>
                <Select name="onlyMobile" label="Show on..." value={menu.onlyMobile ? 'true' : 'false'}>
                  <option value="false">All browsers</option>
                  <option value="true">Only Mobile</option>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button type="submit" className="button-danger">
                Save
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

const pullSingleMenuLink = async (id: string) => {
  return prisma.menuLink.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
