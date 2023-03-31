import { useSession } from 'next-auth/react';
import { useState, useReducer } from 'react';
import AdminWrapper from '@/components/admin/Wrapper';
import List from '@/components/admin/List';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import Image from 'next/image';
import { App } from '@prisma/client';
import AdminForm from '@/components/admin/Form';
import { useRouter } from 'next/router';
import adminType from '@/utils/adminType';

const AdminAppsIndex = () => {
  const router = useRouter();
  const { contentType } = router.query as { contentType: string };
  const { endpoint, title, single, format, columns, inputList  } = adminType(contentType) as { endpoint:string, title: string, single: string, format: object, columns: string[], inputList: any[] };
  const { mutate, data: items } = useStaleSWR(endpoint);
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [app, setApp] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, format);

  const openElement = (item: App) => {
    setApp(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const newData: any[] = [];
  items?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <Image src={`/uploads/${item.image}`} fill sizes="33vw" alt={item.name} title={item.name} className="bg-transparent object-cover" priority={false} />
    );
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={format}
            openAction={(e) => openElement(e)}
            editAction={(e) => openElement(e)}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL={endpoint}
            titleElement={single}
            itemFormat={format}
            itemData={app}
            inputList={inputList}
            closeElement={closeElement}
          />
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminAppsIndex;
