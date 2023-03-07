import { useSession } from 'next-auth/react';
import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import SVG from 'react-inlinesvg';
import AdminWrapper from '@/components/admin/Wrapper';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import AdminForm from '@/components/admin/Form';

const AdminSkillsIndex = ({ images }: { images: any[] }) => {
  const { mutate, data: skills, error } = useStaleSWR('/api/portfolio/skills');
  const { data: session } = useSession();

  const skillFormat = {
    id: null,
    name: '',
    type: '',
    logo: '',
    percentage: '0',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [skill, setSkill] = useState(skillFormat);
  const [previewLogo, setPreviewLogo] = useState('');

  const openElement = (item: any) => {
    setSkill(item);
    setPreviewLogo(item.logo);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const inputToValidate = ['name', 'logo', 'percentage', 'type'];

  const columns = ['name', 'description', 'category_d'];

  const newData: any[] = [];
  skills?.results.map((item: any) => {
    const obj = { ...item };
    obj.category_d = obj.type;
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = <SVG title={item.name} className={'w-full fill-primary-700 dark:fill-primary-200'} src={`/images/svg-icons/${item.logo}`} height={50} />;
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
      selectOnChange: (e: any) => setPreviewLogo(e.target.value),
    },
    {
      classNames: 'col-span-1 text-center',
      html: previewLogo && <SVG title="" className={'inline-block w-14 fill-primary-700 dark:fill-primary-200'} src={`/images/svg-icons/${previewLogo}`} />,
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

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List title={title} single={single} columns={columns} data={newData} format={skillFormat} openAction={openElement} editAction={openElement} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL="/api/portfolio/skills"
            titleElement={single}
            itemFormat={skillFormat}
            itemData={skill}
            inputList={inputList}
            inputToValidate={inputToValidate}
            closeElement={closeElement}
          />
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export async function getStaticProps() {
  const dirRelativeToPublicFolder = 'images/svg-icons';
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);

  return {
    props: { images: filenames }, // will be passed to the page component as props
  };
}

export default AdminSkillsIndex;
