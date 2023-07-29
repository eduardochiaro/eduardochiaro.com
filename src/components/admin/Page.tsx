"use client";

import { useState, useReducer } from 'react';
import AdminForm from '@/components/admin/Form';
import List from '@/components/admin/List';
import BackendLayout from "@/components/layouts/Backend";
import { useRouter } from 'next/navigation';

type AdminAppsIndexProps = {
  format: any;
  columns: string[];
  title: string;
  single: string;
  data: any;
  inputList: any[];
  apiURL: string;
};

export default function AdminPage ({ format, columns, title, single, data, inputList, apiURL }: AdminAppsIndexProps) {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [app, setApp] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, format);

  const openElement = (item: any) => {
    setApp(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    setIsOpen(false);
    router.refresh();
  };

  return (
    <BackendLayout isPageOpen={isOpen}>
     <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
        <List
          title={title}
          single={single}
          columns={columns}
          data={data}
          format={format}
          openAction={(e) => openElement(e)}
          editAction={(e) => openElement(e)}
        />
      </div>
      <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
        <AdminForm
          apiURL={apiURL}
          titleElement={single}
          itemFormat={format}
          itemData={app}
          inputList={inputList}
          closeElement={closeElement}
        />
      </div>
    </BackendLayout>
  )
} 