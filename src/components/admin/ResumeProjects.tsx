'use client';

import type { Prisma } from '@prisma/client';
import { TriangleAlertIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { Input } from '../form';
import { useReducer, useRef, useState } from 'react';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';
import { createEditItem, deleteItem } from '@/utils/apiAdmin';
import useStaleSWR from '@/utils/staleSWR';
import AdminModal from '@/components/admin/Modal';

type Props = {
  resumeId?: number | null;
};

type ResumeProjectExpanded = Prisma.ResumeProjectGetPayload<{ include: { file: true } }>;

const AdminResumeProjects = ({ resumeId }: Props) => {
  const { mutate, data: projects } = useStaleSWR(`/api/portfolio/resume/${resumeId}/projects`);
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const imagePreviewSet = {
    file: {},
    imagePreviewUrl: '',
  };

  const formInitialState = {
    error: false,
    success: false,
    info: '',
    invalid: [],
  };

  const itemFormat = {
    name: '',
    image: '',
    resumeId,
  };

  const [item, updateItem] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, itemFormat);
  const [form, setForm] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, formInitialState);
  const [imagePreview, setImagePreview] = useState(imagePreviewSet);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState<ResumeProjectExpanded | null>(null);

  const inputToValidate = ['name', 'image'];
  const apiURL = '/api/portfolio/resumeProjects';

  const handleChange = (e: React.ChangeEvent<any>) => {
    updateItem({ [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    if (e.target.files && e.target.files[0]) {
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

  const resetForm = () => {
    updateItem({ ...itemFormat });
    setForm({ ...formInitialState });
    setImagePreview(imagePreviewSet);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const openModal = (item: any) => {
    resetForm();
    setIsOpenModal(true);
  };

  const closeModal = () => {
    resetForm();
    setIsOpenModal(false);
  };

  const onPrimaryButtonClickModal = async () => {
    setForm({ ...formInitialState });
    if (!isFormValid(item, inputToValidate)) {
      const listOfInvalidInputs = findInvalidElement(item, inputToValidate);
      setForm({ invalid: listOfInvalidInputs, error: true });
      return;
    }
    try {
      const { data } = await createEditItem<ResumeProjectExpanded>(apiURL, item, false);
      resetForm();
      updateItem(data);
      if (data.file) {
        setImagePreview({
          file: {},
          imagePreviewUrl: `${process.env.NEXT_PUBLIC_CDN_URL}/${data.file.path}`,
        });
      }
      setForm({ ...formInitialState, success: true });
      mutate();
      closeModal();
    } catch (error) {
      // handle error
      console.log(error);
      setForm({ ...formInitialState, error: true });
    }
  };

  const openDeleteModal = (itemId: any) => {
    setOpenDeleteItem(itemId);
    setIsOpenDelete(true);
  };

  const onPrimaryButtonClickDelete = async () => {
    if (openDeleteItem) {
      await deleteItem(apiURL, openDeleteItem.id);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    setIsOpenDelete(false);
    mutate();
    resetForm();
  };

  return (
    <>
      <div className="border-primary-700 mt-10 mb-5 flex items-center gap-4 border-b pb-4">
        <h3 className="grow text-lg font-bold">Projects</h3>
        <button className="button flex items-center gap-1" onClick={() => openModal({})} title={'New project'}>
          <PlusIcon className="h-5" /> add new
        </button>
      </div>

      {projects?.results.map((project: ResumeProjectExpanded, key: any) => (
        <div className="border:bg-primary-50/50 border-primary-500/50 my-4 flex h-14 items-center gap-4 border-b px-4 pb-4" key={key}>
          <div className="relative h-14 w-16">
            {project.file && (
              <Image
                alt={project.name}
                className={'bg-transparent object-cover'}
                fill
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/${project.file.path}`}
                sizes="33vw"
              />
            )}
          </div>
          <span className="grow">{project.name}</span>
          <button onClick={() => openDeleteModal(project)}>
            <TrashIcon className="w-5" />
          </button>
        </div>
      ))}

      <AdminModal
        title={'Add project'}
        isOpen={isOpenModal}
        closeModal={closeModal}
        showButtons={true}
        onSecondaryButtonClick={closeModal}
        onPrimaryButtonClick={onPrimaryButtonClickModal}
        primaryButtonLabel="Add"
        primaryButtonClass="button-success"
        fullSize={false}
      >
        <>
          {form.error && (
            <div className="border-accent-400 bg-accent-100 text-accent-700 relative mb-4 flex items-center gap-2 rounded-sm border px-4 py-3" role="alert">
              <TriangleAlertIcon className="size-6 align-middle" />
              <strong className="font-bold">Invalid Form! </strong>
              <span className="block sm:inline">Some required fields are missing.</span>
            </div>
          )}
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <Input type="text" name="name" label="Name" value={item.name} invalid={false} onChange={(e) => handleChange(e)} />
            </div>
            <div className="col-span-4">
              <Input ref={inputFileRef} type="file" name="image" label="Logo" value="" invalid={false} accept="image/*" onChange={(e) => handleChange(e)} />
            </div>
            <div className="col-span-2">
              {imagePreview && imagePreview.imagePreviewUrl && (
                <div className="box-card relative m-auto mt-4 h-20 w-32">
                  <Image
                    src={imagePreview.imagePreviewUrl}
                    fill
                    sizes="33vw"
                    alt="preview"
                    title="preview"
                    className="fill-primary-700 dark:fill-primary-200 bg-transparent object-contain"
                    priority={false}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      </AdminModal>
      <AdminModal
        title={'Delete project'}
        isOpen={isOpenDelete}
        closeModal={() => setIsOpenDelete(false)}
        showButtons={true}
        onSecondaryButtonClick={() => setIsOpenDelete(false)}
        onPrimaryButtonClick={onPrimaryButtonClickDelete}
        primaryButtonLabel="Delete"
        primaryButtonClass="button-danger"
        fullSize={false}
      >
        <p>Are you sure you want to delete &quot;{openDeleteItem?.name}&quot;?</p>
      </AdminModal>
    </>
  );
};

export default AdminResumeProjects;
