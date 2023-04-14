import type { ResumeProject } from '@prisma/client';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { Input } from '../form';
import { useReducer, useRef, useState } from 'react';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';
import { createEditItem, deleteItem } from '@/utils/apiAdmin';
import useStaleSWR from '@/utils/staleSWR';
import AdminModal from '@/components/admin/Modal';
import { TrashIcon } from '@heroicons/react/24/solid';

type Props = {
  resumeId?: number | null;
};

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
  const [openDeleteItem, setOpenDeleteItem] = useState<ResumeProject | null>(null);

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
      const { data } = await createEditItem<ResumeProject>(apiURL, item, false);
      resetForm();
      updateItem(data);
      if (data.image) {
        setImagePreview({
          file: {},
          imagePreviewUrl: `/uploads/${data.image}`,
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
      <div className="flex items-center gap-4 border-b border-primary-700 pb-4 mb-5 mt-10">
        <h3 className="text-lg font-bold grow">Projects</h3>
        <button className="button flex items-center gap-1" onClick={() => openModal({})} title={'New project'}>
          <PlusIcon className="h-5" /> add new
        </button>
      </div>

      {projects?.results.map((project: ResumeProject, key: any) => (
        <div className="flex items-center gap-4 h-14 px-4 my-4 pb-4 border-b border-primary-500/50 border:bg-primary-50/50" key={key}>
          <div className="w-16 h-14 relative">
            <Image alt={project.name} className={'bg-transparent object-cover'} fill src={`/uploads/${project.image}`} sizes="33vw" />
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
              <Input type="text" name="name" label="Name" value={item.name} invalid={false} onChange={(e) => handleChange(e)} />
            </div>
            <div className="col-span-4">
              <Input ref={inputFileRef} type="file" name="image" label="Logo" value="" invalid={false} accept="image/*" onChange={(e) => handleChange(e)} />
            </div>
            <div className="col-span-2">
              {imagePreview && imagePreview.imagePreviewUrl && (
                <div className="mt-4 w-32 h-20 m-auto relative box-card">
                  <Image
                    src={imagePreview.imagePreviewUrl}
                    fill
                    sizes="33vw"
                    alt="preview"
                    title="preview"
                    className="bg-transparent object-contain fill-primary-700 dark:fill-primary-200"
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
