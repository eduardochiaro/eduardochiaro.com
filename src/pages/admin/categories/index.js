import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Input, Select } from "@/components/form";

const AdminCategoriesIndex = ({ formRef, images }) => {
  const { mutate, data: categories, error } = useStaleSWR('/api/admin/categories');
  const { data: session } = useSession();

  const categoryFormat = {
    id: null,
    name: '',
    type: '',
  };

  const types = ['BOOKMARK', 'JOB'];

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [category, setCategory] = useState(categoryFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(category)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(category)) {
      if (key == 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: category.id ? 'PUT' : 'POST',
      url: category.id ? `/api/admin/categories/${category.id}` : '/api/admin/categories/create',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFormError(true);
        setFormSuccess(false);
      })
      .then(({ data }) => {
        mutate();
        const mergedData = mergeObj(categoryFormat, data);
        setCategory(mergedData);
        closeModal();
      });
  };

  const isFormValid = (form) => {
    if (form.name == '' || form.type == '') {
      return false;
    }
    return true;
  };

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/admin/categories/${category.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mutate();
    closeElement();
  };

  const openElement = (category) => {
    const openCategory = mergeObj(categoryFormat, category);
    setCategory(openCategory);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    setFormError(false);
    setFormSuccess(true);
  };

  const openDeleteModal = (category) => {
    const openCategory = mergeObj(categoryFormat, category);
    setCategory(openCategory);
    setIsOpenDelete(true);
  };

  const closeElement = () => {
    mutate();
    closeModal();
    setCategory(categoryFormat);
    setIsOpenDelete(false);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const columns = ['name', 'type'];

  const newData = [];
  categories?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d = item.type;
    newData.push(obj);
  });

  const title = 'Categories';
  const single = 'category';

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={categoryFormat}
            openAction={openElement}
            editAction={openElement}
            activeId={category.id}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center gap-8 justify-between">
            <a
              href="#"
              className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2"
              onClick={() => closeElement()}
              role="menuitem"
              tabIndex="-1"
            >
              <ChevronLeftIcon className="h-3" /> categories
            </a>
            <h2 className="text-2xl flex items-center gap-2">{category.id ? 'Edit category' : 'Add new category'}</h2>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-red-500 font-semibold hover:underline"
                onClick={() => openDeleteModal(category)}
                role="menuitem"
                tabIndex="-1"
              >
                <TrashIcon className="inline-flex align-text-bottom h-4 mr-1" />
                Delete
              </a>
              <button onClick={onPrimaryButtonClick} type="button" className={'button-success'}>
                Save
              </button>
            </div>
          </div>

          <div className={'mt-8 mb-2 max-w-5xl mx-auto'}>
            <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={onSubmitModal}>
              {formError && (
                <div className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">
                    <ExclamationTriangleIcon className="inline-flex align-middle h-6 mr-4" />
                    Invalid Form!{' '}
                  </strong>
                  <span className="block sm:inline">Some required fields are missing.</span>
                </div>
              )}
              {formSuccess && (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">
                    <CheckIcon className="inline-flex align-middle h-6 mr-4" />
                    Success!{' '}
                  </strong>
                  <span className="block sm:inline">This page was saved.</span>
                </div>
              )}
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <Input label="Title" name="name" value={category.name} onChange={handleChange} required={true} />
                </div>
                <div className="col-span-6">
                  <Select name="type" label="Type" required onChange={handleChange} value={category.type}>
                    <>
                    <option value="">Select type</option>
                    {types.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                    </>
                  </Select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <AdminModal
          title="Delete category"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete category &quot;{category.name}&quot;?</p>
        </AdminModal>
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
    props: { formRef: createRef(), images: filenames }, // will be passed to the page component as props
  };
}

export default AdminCategoriesIndex;
