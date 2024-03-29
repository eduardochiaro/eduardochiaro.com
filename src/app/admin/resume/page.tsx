import moment from 'moment';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';
import SVG from '@/utils/svg';

export const metadata: Metadata = {
  title: 'Admin > Resume | Eduardo Chiaro',
};

export default async function AdminResumeIndex() {
  const session = await getServerSession(authOptions);
  const resumes = await getResume();

  const format = {
    id: null,
    name: '',
    company: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    tags: [],
    projects: [],
  };

  const columns = ['name', 'description'];

  const newData: any[] = [];
  resumes?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.startDateOrder = moment(item.startDate).unix();
    obj.category_d =
      (item.startDate ? moment(item.startDate).format('YYYY-MM') : 'N/A') + ' - ' + (item.endDate ? moment(item.endDate).format('YYYY-MM') : 'Current');
    obj.image_d = item.image ? (
      <SVG title={item.name} className={'w-full fill-primary-700 dark:fill-primary-200'} src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.image}`} height={25} />
    ) : null;
    newData.push(obj);
  });

  const title = 'Resume';
  const single = 'Job';

  const inputList = [
    {
      classNames: 'col-span-6',
      label: 'Job Title',
      name: 'name',
      type: 'text',
      placeholder: 'Job Title',
      value: 'name',
      required: true,
    },
    {
      classNames: 'col-span-6',
      label: 'Company',
      name: 'company',
      type: 'text',
      placeholder: 'Company',
      value: 'company',
      required: true,
    },
    {
      classNames: 'col-span-4',
      label: 'Company Logo',
      name: 'image',
      type: 'file',
      required: false,
      accept: 'image/*',
    },
    {
      classNames: 'col-span-2',
      type: 'imagePreview',
      name: 'imagePreview',
    },
    {
      classNames: 'col-span-3',
      label: 'Start Date',
      name: 'startDate',
      type: 'date',
      value: 'startDate',
      required: true,
    },
    {
      classNames: 'col-span-3',
      label: 'End Date',
      name: 'endDate',
      type: 'date',
      value: 'endDate',
      required: false,
    },
    {
      classNames: 'col-span-6',
      label: 'Description',
      name: 'description',
      type: 'textarea',
      value: 'description',
      rows: 10,
      required: false,
    },
    {
      classNames: 'col-span-6',
      label: 'Tags',
      name: 'tags',
      type: 'tags',
      value: 'tags',
    },
  ];

  const sortType = [
    {
      id: 'startDateOrder',
      name: 'Start date',
    },
    {
      id: 'id',
      name: 'ID',
    },
    {
      id: 'name',
      name: 'Role',
    },
    {
      id: 'updatedAt',
      name: 'Update date',
    },
  ];

  if (session) {
    return (
      <AdminPage
        title={title}
        single={single}
        columns={columns}
        data={newData}
        format={format}
        inputList={inputList}
        sortList={sortType}
        apiURL="/api/portfolio/resume"
      />
    );
  }
  return null;
}

async function getResume() {
  return prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: true,
    },
  });
}
