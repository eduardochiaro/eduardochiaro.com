import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Listbox, Range } from '@/components/form';
import { addSkill } from '@/actions/skills';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Admin > Skills | Eduardo Chiaro',
};

export default async function DashboardSkillsNew() {
  const images = await getImages();

  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      type: formData.get('type'),
      logo: formData.get('logo'),
      percentage: formData.get('percentage'),
    };
    addSkill(rawFormData);
    redirect('/dashboard/skills');
  }

  const mappedImages = images.map((item: string) => ({
    id: item,
    name: item,
    image: `/images/svg-icons/${item}`,
  }));

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Skill New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Name" value="" required />
          </div>
          <div>
            <Listbox name="logo" label="Logo" value={null} itemList={mappedImages} required />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Range name="percentage" label="Percentage" min={0} max={100} step={5} value="0" required />
            </div>
            <div>
              <Input type="text" name="type" label="Type" value="" required />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button type="submit" className="button-danger">
              Save
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

async function getImages() {
  const dirRelativeToPublicFolder = 'images/svg-icons';
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  //filter for only svg files
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.svg'));
  return files;
}
