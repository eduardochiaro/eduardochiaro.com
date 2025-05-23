import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Select } from '@/components/form';
import { addMenuLink } from '@/actions/menu';

export const metadata: Metadata = {
  title: 'Admin > Menu Links | Eduardo Chiaro',
};

export default async function DashboardMenuNew() {
  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      url: formData.get('url'),
      order: formData.get('order'),
      onlyMobile: formData.get('onlyMobile'),
      active: formData.get('active'),
    };
    addMenuLink(rawFormData);
    redirect('/dashboard/menu');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Menu New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Name" value="" required />
          </div>
          <div>
            <Input type="text" name="url" label="URL" value="" required />
          </div>
          <div className="flex items-center gap-4">
            <div className="grow">
              <Input type="number" name="order" label="Order" value="0" min={0} max={100} required />
            </div>
            <div className="grow">
              <Select name="active" label="Active" value="true">
                <option value="true">True</option>
                <option value="false">False</option>
              </Select>
            </div>
            <div>
              <Select name="onlyMobile" label="Show on..." value="false">
                <option value="false">All browsers</option>
                <option value="true">Only Mobile</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-accent-600 hover:bg-accent-700 focus:ring-primary-500 rounded-md px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
