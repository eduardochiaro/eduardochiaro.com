import { Bars3Icon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import Table from '@/components/admin/Table';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';

const AdminCategoriesIndex = ({ formRef, images }) => {
  const { data: menuLinks, error } = useStaleSWR('/api/site/menu');
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const menuLinkFormat = {
    id: null,
    name: '',
    url: '',
    onlyMobile: false,
    active: true,
    order: 0
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [menuLink, setMenuLink] = useState(menuLinkFormat);
  let [formError, setFormError] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(menuLink)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(menuLink)) {
      formData.append(key, value);
    }

    //replace with axios
    axios({
      method: menuLink.id ? 'PUT' : 'POST',
      url: menuLink.id ? `/api/site/menu/${menuLink.id}` : '/api/site/menu/create',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(({ data }) => {
      mutate('/api/site/menu');
      closeModal();
    });
  };

  const isFormValid = (form) => {
    if (form.name == '' || form.url == '') {
      return false;
    }
    return true;
  };

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/site/menu/${menuLink.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mutate('/api/site/menu');
    closeModalDelete();
  };

  const openModal = (menuLink) => {
    const openMenuLink = mergeObj(menuLinkFormat, menuLink);
    setMenuLink(openMenuLink);
    setIsOpen(true);
  };

  const closeModal = () => {
    setMenuLink(menuLinkFormat);
    setIsOpen(false);
    setFormError(false);
  };

  const openModalDelete = (menuLink) => {
    const openMenuLink = mergeObj(menuLinkFormat, menuLink);
    setMenuLink(openMenuLink);
    setIsOpenDelete(true);
  };

  const closeModalDelete = () => {
    setMenuLink(menuLinkFormat);
    setIsOpenDelete(false);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setMenuLink({ ...menuLink, [e.target.name]: e.target.files[0] });
    } else {
      setMenuLink({ ...menuLink, [e.target.name]: e.target.value });
    }
  };

  const columns = [
    {
      name: 'Name',
      key: 'name',
      searchable: true,
      classNameTd: 'font-bold',
    },
    {
      name: 'Url',
      key: 'url',
      searchable: true,
    },
    {
      name: 'Show on...',
      key: 'onlyMobile_d',
      searchable: false,
    },
    {
      name: 'Status',
      key: 'active_d',
      searchable: false,
    },
    {
      name: 'Updated',
      key: 'updated',
      classNameTd: 'w-44',
    },
  ];

  const newData = [];
  menuLinks?.results.map((item) => {
    const obj = { ...item };
    obj.onlyMobile_d = !item.onlyMobile ? "All Browsers" : "Mobile only";
    obj.active_d = (
      <span className={ item.active ? "text-emerald-500 font-bold" : "text-red-500 font-bold" }>{ item.active ? "Active" : "Inactive" }</span>
    );
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper>
        <AdminWrapper.Header>
          <h1 className="text-2xl flex items-center gap-2">
            <Bars3Icon className="h-6 text-primary-700 dark:text-primary-600" /> Menu link list
          </h1>
        </AdminWrapper.Header>
        <Table
          columns={columns}
          data={newData}
          format={menuLinkFormat}
          editAction={openModal}
          deleteAction={openModalDelete}
          openAction={openModal}
          openActionLabel="Add new menu link"
        />
        <AdminModal
          title={menuLink.id ? 'Edit menu link' : 'Add new menu link'}
          isOpen={isOpen}
          closeModal={closeModal}
          showButtons={true}
          onSecondaryButtonClick={closeModal}
          onPrimaryButtonClick={onPrimaryButtonClick}
        >
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
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-primary-700">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name-form"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={menuLink.name}
                  onChange={handleChange}
                  maxLength={191}
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Url <span className="text-primary-700">*</span>
                </label>
                <input
                  type="text"
                  name="url"
                  id="url-form"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  className="mt-1 input-field w-5/6"
                  value={menuLink.url}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="name-form" className="input-label">
                  Show on...
                </label>

                <select name="onlyMobile" id="onlyMobile-form" className="mt-1 input-field" onChange={handleChange} value={menuLink.onlyMobile} required>
                  <option value={false}>All Browsers</option>
                  <option value={true}>Mobile only</option>
                </select>
               
              </div>
              <div className="col-span-2">
                <label htmlFor="name-form" className="input-label">
                  Active link
                </label>

                <select name="active" id="active-form" className="mt-1 input-field" onChange={handleChange} value={menuLink.active} required>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
               
              </div>
              <div className="col-span-1">
                <label htmlFor="name-form" className="input-label">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  id="order-form"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  className="mt-1 input-field w-5/6"
                  value={menuLink.order}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </AdminModal>
        <AdminModal
          title="Delete menuLink"
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete menuLink &quot;{menuLink.name}&quot;?</p>
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
