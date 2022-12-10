import { Bars3Icon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid';

const AdminCategoriesIndex = ({ formRef, images }) => {
  const { mutate, data: menuLinks, error } = useStaleSWR('/api/site/menu');
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
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [menuLink, setMenuLink] = useState(menuLinkFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(menuLink)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(menuLink)) {
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
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFormError(true);
        setFormSuccess(false);
      })
      .then(({ data }) => {
        mutate();
        const mergedData = mergeObj(menuLinkFormat, data);
        setMenuLink(mergedData);
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
    mutate();
    closeModalDelete();
  };

  const openModal = (menuLink) => {
    const openMenuLink = mergeObj(menuLinkFormat, menuLink);
    setMenuLink(openMenuLink);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    setFormError(false);
    setFormSuccess(true);
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

  const columns = ['name', 'url', 'status_d', 'category_d'];

  const newData = [];
  menuLinks?.results.map((item) => {
    const obj = { ...item };
    obj.status_d = obj.active ? 'Active' : 'Inactive';
    obj.description = (
      <>
        <span className={obj.active ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>{obj.status_d}</span> [{obj.url}]
      </>
    );
    obj.category_d = !item.onlyMobile ? 'All Browsers' : 'Mobile only';
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    newData.push(obj);
  });

  const title = (
    <h1 className="grow flex items-center gap-2">
      <Bars3Icon className="h-6 text-secondary-700 dark:text-secondary-600" />
      <span>Menu link list</span>
    </h1>
  );

  if (session) {
    return (
      <AdminWrapper>
        <div className="h-full py-8 w-full w-1/4">
          <List title={title} columns={columns} data={newData} format={menuLinkFormat} openAction={openModal} editAction={openModal} activeId={menuLink.id} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6  ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl flex items-center gap-2">
              <Bars3Icon className="h-6 text-secondary-700 dark:text-secondary-600" /> {menuLink.id ? 'Edit menuLink' : 'Add new menuLink'}
            </h2>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-red-500 font-semibold hover:underline"
                onClick={() => openModalDelete(menuLink)}
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

          <div className={'mt-8 mb-2'}>
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
                  <label htmlFor="name-form" className="input-label">
                    Title <span className="text-secondary-700">*</span>
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
                    Url <span className="text-secondary-700">*</span>
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
          </div>
        </div>

        <AdminModal
          title="Delete menuLink"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
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
