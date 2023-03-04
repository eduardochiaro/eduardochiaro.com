import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef, useRef, useReducer } from 'react';
import axios from 'axios';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import List from '@/components/admin/List';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import Image from 'next/image';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Input, Textarea } from '@/components/form';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';
import apiAdmin from '@/utils/apiAdmin';
import { App } from '@prisma/client';
import adminSaving from "@/utils/adminSaving";

const AdminAppsIndex = () => {
  const formRef = createRef<HTMLFormElement>();
  const { mutate, data: apps } = useStaleSWR('/api/portfolio/apps');
  const { data: session } = useSession();

  const appFormat = {
    id: null,
    name: '',
    description: '',
    image: '',
    url: '',
  };

  const formInitialState = {
    error: false,
    success: false,
    invalid: [],
  };

  const imagePreviewSet = {
    file: {},
    imagePreviewUrl: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [app, updateApp] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, appFormat);
  const [form, setForm] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, formInitialState);
  const [imagePreview , setImagePreview] = useState(imagePreviewSet);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const inputToValidate = app.id ? ['name', 'url'] : ['name', 'url', 'image'];

  const onSubmitModal = async (e: Event) => {
    e.preventDefault();
    setForm({ ...formInitialState });
    if (!isFormValid(app, inputToValidate)) {
      const listOfInvalidInputs = findInvalidElement(app, inputToValidate);
      setForm({ invalid: listOfInvalidInputs, error: true });
      return;
    }

    try {
      const { data } = await apiAdmin<App>('/api/portfolio/apps', app, app.id);
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
      mutate();
      updateApp(data);
      closeModal();
    } catch (error) {
      // handle error
      console.log(error);
      setForm({ ...formInitialState, error: true });
    }
    return true;
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
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    mutate();
    closeElement();
  };

  const openElement = (app: App) => {
    updateApp(app);
    setIsOpen(true);
    setImagePreview(imagePreviewSet);
    if (app.image) {
      setImagePreview({
        file: {},
        imagePreviewUrl: `/uploads/${app.image}`,
      });
    }
    setForm({ ...formInitialState });
  };

  const closeModal = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    setForm({ ...formInitialState, success: true });
    setImagePreview(imagePreviewSet);
  };

  const openDeleteModal = (app: App) => {
    updateApp(app);
    setIsOpenDelete(true);
  };

  const closeElement = () => {
    mutate();
    closeModal();
    updateApp(appFormat);
    setIsOpenDelete(false);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    updateApp({ [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setImagePreview({
          file,
          imagePreviewUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = ['name', 'description', 'github_url'];

  const newData: any[] = [];
  apps?.results.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <Image src={`/uploads/${item.image}`} fill sizes="33vw" alt={item.name} title={item.name} className="bg-transparent object-cover" priority={false} />
    );
    newData.push(obj);
  });

  const title = 'Apps';
  const single = 'app';

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List title={title} single={single} columns={columns} data={newData} format={appFormat} openAction={(e) => openElement(e)} editAction={(e) => openElement(e)} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2" onClick={() => closeElement()} role="menuitem">
              <ChevronLeftIcon className="h-3" /> apps
            </a>
            <h2 className="text-2xl flex items-center gap-2">{app.id ? 'Edit app' : 'Add new app'}</h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openDeleteModal(app)} role="menuitem">
                <TrashIcon className="inline-flex align-text-bottom h-4 mr-1" />
                Delete
              </a>
              <button onClick={(e: any) => onSubmitModal(e)} type="button" className={'button-success'}>
                Save
              </button>
            </div>
          </div>

          <div className={'mt-8 mb-2 max-w-5xl mx-auto'}>
            <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={(e: any) => onSubmitModal(e)}>
              {form.error && (
                <div className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">
                    <ExclamationTriangleIcon className="inline-flex align-middle h-6 mr-4" />
                    Invalid Form!{' '}
                  </strong>
                  <span className="block sm:inline">Some required fields are missing.</span>
                </div>
              )}
              {form.success && (
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
                  <Input label="Title" name="name" value={app.name} onChange={handleChange} required={true} invalid={form.invalid.includes('name')} />
                </div>
                <div className="col-span-4">
                  <Input
                    type="file"
                    label="Image"
                    name="image"
                    onChange={handleChange}
                    required={app.id ? false : true}
                    ref={inputFileRef}
                    invalid={form.invalid.includes('image')}
                  />
                </div>
                <div className="col-span-2">
                  {imagePreview && imagePreview.imagePreviewUrl && (
                    <>
                      <div className="mt-4 w-32 h-20 m-auto relative">
                        <Image
                          src={imagePreview.imagePreviewUrl}
                          fill
                          sizes="33vw"
                          alt={app.name}
                          title={app.name}
                          className="bg-transparent object-contain"
                          priority={false}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="col-span-6">
                  <Input
                    type="url"
                    label="GitHub URL"
                    name="url"
                    value={app.url}
                    onChange={handleChange}
                    required={true}
                    invalid={form.invalid.includes('url')}
                  />
                </div>
                <div className="col-span-6">
                  <Textarea
                    label="Description"
                    name="description"
                    value={app.description}
                    onChange={handleChange}
                    invalid={form.invalid.includes('description')}
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

export default AdminAppsIndex;
