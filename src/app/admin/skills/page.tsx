import SVG from '@/utils/svg';
import moment from 'moment';
import { Metadata } from 'next';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Admin > Skills | Eduardo Chiaro',
};

export default async function AdminSkillsIndex() {
  const skills = await getSkills();
  const images = await getImages();

  const format = {
    id: null,
    name: '',
    type: '',
    logo: '',
    percentage: '0',
  };

  const columns = ['name', 'description', 'category_d'];

  const newData: any[] = [];
  skills?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.category_d = obj.type;
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <SVG
        title={item.name}
        className={'fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200 w-full'}
        src={`/images/svg-icons/${item.logo}`}
        height={50}
      />
    );
    obj.description = item.percentage + '%';
    newData.push(obj);
  });

  const title = 'Skills';
  const single = 'skill';

  const inputList = [
    {
      classNames: 'col-span-6',
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      value: 'name',
      required: true,
    },
    {
      classNames: 'col-span-5',
      label: 'Logo',
      name: 'logo',
      type: 'select',
      value: 'logo',
      required: true,
      selectOptions: images.map((type) => ({ id: type, name: type })),
    },
    {
      classNames: 'col-span-1 pt-3 text-center',
      type: 'svgPreview',
      name: 'logo',
    },
    {
      classNames: 'col-span-4',
      label: 'Percentage',
      name: 'percentage',
      type: 'range',
      min: 0,
      max: 100,
      step: 5,
      value: 'percentage',
      required: true,
    },
    {
      classNames: 'col-span-2',
      label: 'Type',
      name: 'type',
      type: 'text',
      placeholder: 'Type',
      value: 'type',
      required: true,
    },
  ];

  return <AdminPage title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} apiURL="/api/portfolio/skills" />;
}

async function getSkills() {
  return prisma.skill.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function getImages() {
  const dirRelativeToPublicFolder = 'images/svg-icons';
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  return fs.readdirSync(dir);
}
