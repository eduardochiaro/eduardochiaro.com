import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef, useRef } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import List from '@/components/admin/List';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import Image from 'next/image';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';

const AdminAppsIndex = ({ formRef }) => {
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
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [app, setApp] = useState(appFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const inputFileRef = useRef(null);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(app)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(app)) {
      if (key == 'image') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: app.id ? 'PUT' : 'POST',
      url: app.id ? `/api/portfolio/apps/${app.id}` : '/api/portfolio/apps/create',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFormError(true);
        setFormSuccess(false);
      })
      .then(({ data }) => {
        inputFileRef.current.value = '';
        mutate();
        const mergedData = mergeObj(appFormat, data);
        setApp(mergedData);
        closeModal();
      });
  };

  const isFormValid = (form) => {
    if (form.name == '' || form.url == '' || (!form.id && !form.image)) {
      return false;
    }
    return true;
  };

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/portfolio/apps/${app.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    inputFileRef.current.value = '';
    mutate();
    closeDeleteModal();
  };

  const openElement = (app) => {
    const openApp = mergeObj(appFormat, app);
    setApp(openApp);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    inputFileRef.current.value = '';
    setFormError(false);
    setFormSuccess(true);
  };

  const openDeleteModal = (app) => {
    const openApp = mergeObj(appFormat, app);
    setApp(openApp);
    setIsOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setApp(appFormat);
    setIsOpenDelete(false);
    setIsOpen(false);
  };

  const closeElement = () => {
    setApp(appFormat);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setApp({ ...app, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const columns = ['name', 'description', 'github_url'];

  const newData = [];
  apps?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <Image src={`/uploads/${item.image}`} fill sizes="33vw" alt={item.name} title={item.name} className="bg-transparent object-cover" priority="false" />
    );
    newData.push(obj);
  });

  const title = 'Apps';
  const single = 'app';

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
            openAction={openElement}
            editAction={openElement}
            activeId={app.id}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2"
              onClick={() => closeElement()}
              role="menuitem"
              tabIndex="-1"
            >
              <ChevronLeftIcon className="h-3" /> apps
            </a>
            <h2 className="text-2xl flex items-center gap-2">{app.id ? 'Edit app' : 'Add new app'}</h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openDeleteModal(app)} role="menuitem" tabIndex="-1">
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
                    value={app.name}
                    onChange={handleChange}
                    maxLength={191}
                    required
                  />
                </div>
                <div className="col-span-4">
                  <label htmlFor="image-url-form" className="input-label">
                    Image {!app.id && <span className="text-secondary-700">*</span>}
                  </label>
                  <input
                    ref={inputFileRef}
                    type="file"
                    name="image"
                    id="image-url-form"
                    className="input-field
                      mt-1
                      py-1.5 px-2
                      focus:outline-none
                      "
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  {app.id > 0 && app.image && (
                    <>
                      <label htmlFor="style-form" className="input-label">
                        Current
                      </label>
                      <div className="mt-4 w-32 h-20 m-auto  relative">
                        <Image
                          src={`/uploads/${app.image}`}
                          fill
                          sizes="100vw"
                          alt={app.name}
                          title={app.name}
                          className="bg-transparent object-contain"
                          priority="false"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="col-span-6">
                  <label htmlFor="url-form" className="input-label">
                    GitHub URL <span className="text-secondary-700">*</span>
                  </label>
                  <input
                    type="url"
                    name="url"
                    id="url-form"
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                    className="mt-1 input-field"
                    value={app.url}
                    onChange={handleChange}
                    maxLength={191}
                    required
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="description-form" className="input-label">
                    Description ({app.description.length}/191)
                  </label>
                  <textarea
                    name="description"
                    id="description-form"
                    className="mt-1 input-field"
                    rows={5}
                    value={app.description}
                    onChange={handleChange}
                    maxLength={191}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <AdminModal
          title="Delete app"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete app &quot;{app.name}&quot;?</p>
        </AdminModal>
      </AdminWrapper>
    );
  }
  return null;
};

export async function getStaticProps() {
  return {
    props: { formRef: createRef() }, // will be passed to the page component as props
  };
}

export default AdminAppsIndex;
