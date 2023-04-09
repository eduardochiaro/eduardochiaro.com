import { useSession } from 'next-auth/react';
import { useState } from 'react';
import BackendLayout from '@/components/layouts/Backend';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import AdminForm from '@/components/admin/Form';

const tagFormat = {
  id: null,
  name: '',
};

const AdminTagsIndex = () => {
  const { mutate, data: tags, error } = useStaleSWR('/api/admin/tags');
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState(tagFormat);

  const openElement = (item: any) => {
    setTag(item);
    setIsOpen(true);
  };

  const closeElement = () => {
    mutate();
    setIsOpen(false);
  };

  const columns = ['name'];

  const newData: any[] = [];
  tags?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.description = `used in ${item.jobs?.length} job(s)`;
    newData.push(obj);
  });

  const title = 'Tags';
  const single = 'tag';

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
  ];

  if (session) {
    return (
      <BackendLayout isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List title={title} single={single} columns={columns} data={newData} format={tagFormat} openAction={openElement} editAction={openElement} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <AdminForm apiURL="/api/admin/tags" titleElement={single} itemFormat={tagFormat} itemData={tag} inputList={inputList} closeElement={closeElement} />
        </div>
      </BackendLayout>
    );
  }
  return null;
};

export default AdminTagsIndex;
