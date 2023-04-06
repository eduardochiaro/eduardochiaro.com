import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import AdminWrapper from '@/components/admin/Wrapper';
import SVG from 'react-inlinesvg';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import React from 'react';
import AdminForm from '@/components/admin/Form';
import AdminProjects from '@/components/admin/Projects';

const AdminResumeIndex = () => {
  const { mutate, data: resumes } = useStaleSWR('/api/portfolio/resume');
  const { data: session } = useSession();

  const resumeFormat = {
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

  const [isOpen, setIsOpen] = useState(false);
  const [resume, setResume] = useState(resumeFormat);

  const openElement = (item: any) => {
    setResume(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const columns = ['name', 'description'];

  const newData: any[] = [];
  resumes?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.startDateOrder = moment(item.startDate).unix();
    obj.category_d =
      (item.startDate ? moment(item.startDate).format('YYYY-MM') : 'N/A') + ' - ' + (item.endDate ? moment(item.endDate).format('YYYY-MM') : 'Current');
    obj.image_d = item.image ? (
      <SVG title={item.name} className={'w-full fill-primary-700 dark:fill-primary-200'} src={`/uploads/${item.image}`} height={25} />
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
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={resumeFormat}
            openAction={openElement}
            editAction={openElement}
            sortDefault="startDateOrder"
            sortList={sortType}
            sortDirectionDefault="desc"
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL="/api/portfolio/resume"
            titleElement={single}
            itemFormat={resumeFormat}
            itemData={resume}
            inputList={inputList}
            closeElement={closeElement}
          >
            <>{resume.id && <AdminProjects projects={resume.projects} resumeId={resume.id} />}</>
          </AdminForm>
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export async function getStaticProps() {
  return {
    props: { formRef: createRef() }, // will be passed to the page component as props
  };
}

export default AdminResumeIndex;
