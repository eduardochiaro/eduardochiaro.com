import { useSession } from 'next-auth/react';
import { useState, useReducer } from 'react';
import AdminWrapper from '@/components/admin/Wrapper';
import List from '@/components/admin/List';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import Image from 'next/image';
import { App } from '@prisma/client';
import AdminForm from '@/components/admin/Form';

const AdminAppsIndex = () => {
  const { mutate, data: apps } = useStaleSWR('/api/portfolio/apps');
  const { data: session } = useSession();

  const appFormat = {
    id: null,
    name: '',
    description: '',
    image: '',
    url: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [app, setApp] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, appFormat);

  const inputToValidate = app.id ? ['name', 'url'] : ['name', 'url', 'image'];

  const openElement = (item: App) => {
    setApp(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const columns = ['name', 'description', 'github_url'];

  const newData: any[] = [];
  apps?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <Image src={`/uploads/${item.image}`} fill sizes="33vw" alt={item.name} title={item.name} className="bg-transparent object-cover" priority={false} />
    );
    newData.push(obj);
  });

  const title = 'Apps';
  const single = 'app';

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
      classNames: 'col-span-4',
      label: 'Image',
      name: 'image',
      type: 'file',
      required: app.id ? false : true,
      accept: 'image/*',
    },
    {
      classNames: 'col-span-2',
      type: 'imagePreview',
      name: 'imagePreview',
    },
    {
      classNames: 'col-span-6',
      label: 'GitHub URL',
      name: 'url',
      type: 'text',
      placeholder: 'https://github.com',
      value: 'url',
      required: true,
    },
    {
      classNames: 'col-span-6',
      label: 'Description',
      name: 'description',
      type: 'textarea',
      value: 'description',
      required: false,
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
            format={appFormat}
            openAction={(e) => openElement(e)}
            editAction={(e) => openElement(e)}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL="/api/portfolio/apps"
            titleElement={single}
            itemFormat={appFormat}
            itemData={app}
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

export default AdminAppsIndex;
