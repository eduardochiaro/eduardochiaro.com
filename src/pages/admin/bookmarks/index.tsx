import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AdminWrapper from '@/components/admin/Wrapper';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import { Category } from '@prisma/client';
import AdminForm from '@/components/admin/Form';

const AdminBookmarksIndex = () => {
  const { mutate, data: bookmarks } = useStaleSWR('/api/portfolio/bookmarks');
  const { data: categories } = useStaleSWR('/api/admin/categories');
  const { data: session } = useSession();

  const bookmarkFormat = {
    id: null,
    url: '',
    name: '',
    categoryId: 0,
    description: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [bookmark, setBookmark] = useState(bookmarkFormat);

  const openElement = (item: any) => {
    setBookmark(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const columns = ['name', 'url', 'category_d'];

  const newData: any[] = [];
  bookmarks?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d = item.category ? item.category.name : 'N/A';
    newData.push(obj);
  });

  const title = 'Bookmarks';
  const single = 'bookmark';

  const inputList = [
    {
      classNames: 'col-span-5',
      label: 'URL',
      name: 'url',
      type: 'text',
      placeholder: 'https://github.com',
      value: 'url',
      required: true,
    },
    {
      classNames: 'col-span-1 flex items-end',
      type: 'fetchButton',
      value: 'url',
    },
    {
      classNames: 'col-span-4',
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      value: 'name',
      required: true,
    },
    {
      classNames: 'col-span-2',
      label: 'Category',
      name: 'categoryId',
      type: 'select',
      value: 'categoryId',
      required: true,
      selectOptions: categories?.results.filter((x: Category) => x.type == 'BOOKMARK'),
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
          <List title={title} single={single} columns={columns} data={newData} format={bookmarkFormat} openAction={openElement} editAction={openElement} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL="/api/portfolio/bookmarks"
            titleElement={single}
            itemFormat={bookmarkFormat}
            itemData={bookmark}
            inputList={inputList}
            closeElement={closeElement}
          />
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminBookmarksIndex;
