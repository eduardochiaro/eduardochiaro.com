import type { ResumeProject } from '@prisma/client';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Input } from '../form';
import { useReducer, useRef, useState } from 'react';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';
import { createEditItem } from '@/utils/apiAdmin';
import useStaleSWR from '@/utils/staleSWR';
import NaturalImage from '../NaturalImage';

type Props = {
  resumeId?: number | null;
};

const AdminResumeProjects = ({ resumeId }: Props) => {
  const { mutate, data: projects } = useStaleSWR(`/api/portfolio/resume/${resumeId}/projects`);
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  console.log(projects?.results);

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

  const inputToValidate = ['name', 'image'];
  const apiURL = '/api/portfolio/resumeProjects'

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
    setForm({ ...formInitialState });
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const onSubmitModal = async (e: Event) => {
    e.preventDefault();
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
    } catch (error) {
      // handle error
      console.log(error);
      setForm({ ...formInitialState, error: true });
    }
    return true;
  };

  return (
    <>
      <h3 className="text-lg font-bold border-b border-primary-700 pb-2 mb-5 mt-10">Projects</h3>
      {form.error && (
        <div className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">
            <ExclamationTriangleIcon className="inline-flex align-middle h-6 mr-4" />
            Invalid Form!{' '}
          </strong>
          <span className="block sm:inline">Some required fields are missing.</span>
        </div>
      )}
      <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={(e: any) => onSubmitModal(e)}>
        <div className="flex items-center gap-6">
          <div className="grow">
            <Input type="text" name="name" label="Name" value={item.name} invalid={false} onChange={(e) => handleChange(e)} />
          </div>
          <div className="grow">
            <Input
              ref={inputFileRef}
              type="file"
              name="image"
              label="Logo"
              value=""
              invalid={false}
              accept="image/*"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
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
          <div className="flex-none">
            <button className="button-success mb-1 !px-4 mt-7" type="submit">
              add
            </button>
          </div>
        </div>
      </form>
      {projects?.results.map((project: ResumeProject, key: any) => (
        <div className="flex items-center gap-4 h-14 px-4 my-4" key={key}>
          <div className="w-16 h-14 relative">
            <Image alt={project.name} className={'bg-transparent object-cover'} fill src={`/uploads/${project.image}`} sizes="33vw" />
          </div>
          <span>{project.name}</span>
        </div>
      ))}
    </>
  );
};

export default AdminResumeProjects;
