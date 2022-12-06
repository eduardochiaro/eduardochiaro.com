import { CpuChipIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import List from '@/components/admin/List';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/solid';

const AdminAppsIndex = ({ formRef }) => {
  const { data: apps } = useStaleSWR('/api/portfolio/apps');
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const appFormat = {
    id: null,
    name: '',
    description: '',
    image: '',
    url: '',
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [app, setApp] = useState(appFormat);
  let [formError, setFormError] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(app)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(app)) {
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
    }).then(({ data }) => {
      mutate('/api/portfolio/apps');
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
    mutate('/api/portfolio/apps');
    closeModalDelete();
  };

  const openModal = (app) => {
    const openApp = mergeObj(appFormat, app);
    setApp(openApp);
    setIsOpen(true);
  };

  const closeModal = () => {
    setApp(appFormat);
    setIsOpen(false);
    setFormError(false);
  };

  const openModalDelete = (app) => {
    const openApp = mergeObj(appFormat, app);
    setApp(openApp);
    setIsOpenDelete(true);
  };

  const closeModalDelete = () => {
    setApp(appFormat);
    setIsOpenDelete(false);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setApp({ ...app, [e.target.name]: e.target.files[0] });
    } else {
      setApp({ ...app, [e.target.name]: e.target.value });
    }
  };

  const columns = ['name', 'description', 'github_url'];

  const newData = [];
  apps?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.image_d = (
      <Image src={`/uploads/${item.image}`} fill sizes="33vw" alt={item.name} title={item.name} className="bg-transparent object-cover" priority="false" />
    );
    newData.push(obj);
  });

  const title = (
    <h1 className="grow flex items-center gap-2">
      <CpuChipIcon className="h-6 text-secondary-700 dark:text-secondary-600" />
      <span>Apps list</span>
    </h1>
  );

  if (session) {
    return (
      <AdminWrapper>
        <div className="h-full py-8 w-full w-1/4">
          <List title={title} columns={columns} data={newData} format={appFormat} openAction={openModal} editAction={openModal} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6  ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl flex items-center gap-2">
              <CpuChipIcon className="h-6 text-secondary-700 dark:text-secondary-600" /> {app.id ? 'Edit app' : 'Add new app'}
            </h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openModalDelete(app)} role="menuitem" tabIndex="-1">
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
                    type="file"
                    name="image"
                    id="image-url-form"
                    className="mt-1 block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary-200 file:text-primary-700
                          hover:file:bg-primary-300
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
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
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
