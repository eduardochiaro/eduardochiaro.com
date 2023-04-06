import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AdminWrapper from '@/components/admin/Wrapper';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import AdminForm from '@/components/admin/Form';

const AdminCategoriesIndex = () => {
  const { mutate, data: menuLinks } = useStaleSWR('/api/site/menu');
  const { data: session } = useSession();

  const menuLinkFormat = {
    id: null,
    name: '',
    url: '',
    onlyMobile: false,
    active: true,
    order: 0,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [menuLink, setMenuLink] = useState(menuLinkFormat);

  const openElement = (item: any) => {
    setMenuLink(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const columns = ['name', 'url', 'status_d', 'category_d'];

  const newData: any[] = [];
  menuLinks?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.status_d = obj.active ? 'Active' : 'Inactive';
    obj.description = (
      <>
        {obj.order}) <span className={obj.active ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>{obj.status_d}</span> [{obj.url}]
      </>
    );
    obj.category_d = !item.onlyMobile ? 'All Browsers' : 'Mobile only';
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    newData.push(obj);
  });

  const title = 'Menu links';
  const single = 'link';

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
      classNames: 'col-span-6',
      label: 'URL',
      name: 'url',
      type: 'text',
      placeholder: '/',
      value: 'url',
      required: true,
    },
    {
      classNames: 'col-span-3',
      label: 'Show on...',
      name: 'onlyMobile',
      type: 'select',
      value: 'onlyMobile',
      required: false,
      selectOptions: [
        {
          id: false,
          name: 'All browsers',
        },
        {
          id: true,
          name: 'Mobile only',
        },
      ],
      selectEmptyOption: true,
    },
    {
      classNames: 'col-span-2',
      label: 'Status',
      name: 'active',
      type: 'select',
      value: 'active',
      required: false,
      selectOptions: [
        {
          id: true,
          name: 'Active',
        },
        {
          id: false,
          name: 'Inactive',
        },
      ],
      selectEmptyOption: true,
    },
    {
      classNames: 'col-span-1',
      label: 'Order',
      name: 'order',
      type: 'number',
      placeholder: '0',
      value: 'order',
      required: false,
    },
  ];

  const sortType = [
    {
      id: 'id',
      name: 'ID',
    },
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'status_d',
      name: 'Status',
    },
    {
      id: 'order',
      name: 'Order',
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
            format={menuLinkFormat}
            openAction={openElement}
            editAction={openElement}
            sortList={sortType}
            sortDefault="order"
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL="/api/site/menu"
            titleElement={single}
            itemFormat={menuLinkFormat}
            itemData={menuLink}
            inputList={inputList}
            closeElement={closeElement}
          />
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminCategoriesIndex;
