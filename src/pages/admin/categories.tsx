import { useSession } from 'next-auth/react';
import { useState } from 'react';
import BackendLayout from '@/components/layouts/Backend';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import AdminForm from '@/components/admin/Form';

const types = ['BOOKMARK', 'JOB'];

const AdminCategoriesIndex = () => {
  const { mutate, data: categories, error } = useStaleSWR('/api/admin/categories');
  const { data: session } = useSession();

  const categoryFormat = {
    id: null,
    name: '',
    type: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(categoryFormat);

  const openElement = (item: any) => {
    setCategory(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const columns = ['name', 'type'];

  const newData: any[] = [];
  categories?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d = item.type;
    obj.description = `used in ${item.bookmarks?.length} bookmark(s)`;
    newData.push(obj);
  });

  const title = 'Categories';
  const single = 'category';

  const inputList = [
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
      label: 'Type',
      name: 'type',
      type: 'select',
      value: 'type',
      required: true,
      selectOptions: types.map((type) => ({ id: type, name: type })),
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
      id: 'type',
      name: 'Type',
    },
    {
      id: 'updatedAt',
      name: 'Update date',
    },
  ];

  if (session) {
    return (
      <BackendLayout isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={categoryFormat}
            openAction={openElement}
            editAction={openElement}
            sortList={sortType}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm
            apiURL="/api/admin/categories"
            titleElement={single}
            itemFormat={categoryFormat}
            itemData={category}
            inputList={inputList}
            closeElement={closeElement}
          />
        </div>
      </BackendLayout>
    );
  }
  return null;
};

export default AdminCategoriesIndex;
