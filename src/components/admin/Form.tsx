// React component form for admin to save data using axios
import { useState, useReducer, useRef, useEffect, ReactElement } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';
import { Input, Select, Textarea, Range } from '@/components/form';
import Image from 'next/image';
import { createEditItem, deleteItem } from '@/utils/apiAdmin';
import AdminModal from '@/components/admin/Modal';
import axios from 'axios';
import * as cheerio from 'cheerio';

type InputTypeProps = {
  input: {
    type: string;
    label: string;
    name: string;
    value: string;
    required: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
    accept?: string;
    selectOptions?: {
      id: string;
      name: string;
    }[];
    selectOnChange?: (e: any) => void;
    selectEmptyOption?: boolean;
    html: ReactElement;
  };
  itemData: any;
  form: {
    error: boolean;
    success: boolean;
    invalid: string[];
  };
  imagePreview?: {
    file: any;
    imagePreviewUrl: string;
  };
  handleChange: (e: any) => void;
  fetchFunction?: (url: string) => void;
  inputFileRef: any;
};

const InputType = ({ input, itemData, form, imagePreview, inputFileRef, handleChange, fetchFunction }: InputTypeProps) => {
  switch (input.type) {
    case 'text':
    case 'url':
    case 'file':
    default:
      return (
        <Input
          ref={input.type == 'file' ? inputFileRef : null}
          type={input.type}
          label={input.label}
          name={input.name}
          value={itemData[input.value]}
          placeholder={input.placeholder}
          onChange={(e) => handleChange(e)}
          required={input.required}
          invalid={form.invalid.includes(input.name)}
          accept={input.accept}
        />
      );
    case 'range':
      return (
        <Range
          label={input.label}
          name={input.name}
          min={input.min}
          max={input.max}
          step={input.step}
          value={itemData[input.value]}
          onChange={(e) => handleChange(e)}
          required={input.required}
          invalid={form.invalid.includes(input.name)}
          accept={input.accept}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={input.label}
          name={input.name}
          value={itemData[input.value]}
          onChange={(e) => handleChange(e)}
          required={input.required}
          invalid={form.invalid.includes(input.name)}
        />
      );
    case 'select':
      return (
        <Select
          label={input.label}
          name={input.name}
          value={itemData[input.value]}
          onChange={(e) => {
            handleChange(e);
            if (input.selectOnChange) {
              input.selectOnChange(e);
            }
          }}
          required={input.required}
          invalid={form.invalid.includes(input.name)}
        >
          <>
            {!input.selectEmptyOption && <option value=""> - select - </option>}
            {input.selectOptions?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </>
        </Select>
      );
    case 'imagePreview':
      if (imagePreview && imagePreview.imagePreviewUrl) {
        return (
          <div className="mt-4 w-32 h-20 m-auto relative box-card">
            <Image
              src={imagePreview.imagePreviewUrl}
              fill
              sizes="33vw"
              alt={input.name}
              title={input.name}
              className="bg-transparent object-contain"
              priority={false}
            />
          </div>
        );
      } else {
        return <></>;
      }
    case 'fetchButton':
      if (fetchFunction) {
        return (
          <button type="button" className="button-success mb-1 w-full" onClick={() => fetchFunction(itemData[input.value])}>
            Fetch
          </button>
        );
      } else {
        return <></>;
      }
  }
};

type AdminFormType = {
  apiURL: string;
  itemFormat: any;
  itemData: any;
  inputList: any[];
  titleElement: string;
  imagePreviewOriginal?: {
    file: any;
    imagePreviewUrl: string;
  };
  inputToValidate: string[];
  closeElement: () => void;
};

type ItemType = {
  id: string;
  image: string;
  [key: string]: any;
};

const AdminForm = ({ apiURL, itemFormat, itemData, inputList, titleElement, inputToValidate, closeElement }: AdminFormType) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const formInitialState = {
    error: false,
    success: false,
    info: '',
    invalid: [],
  };

  const imagePreviewSet = {
    file: {},
    imagePreviewUrl: '',
  };

  const [item, updateItem] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, itemFormat);
  const [form, setForm] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, formInitialState);
  const [imagePreview, setImagePreview] = useState(imagePreviewSet);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

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
    setImagePreview(imagePreviewSet);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    updateItem(itemData);
    if (itemData.image) {
      setImagePreview({
        file: {},
        imagePreviewUrl: `/uploads/${itemData.image}`,
      });
    }
  }, [itemData]);

  const onSubmitModal = async (e: Event) => {
    e.preventDefault();
    setForm({ ...formInitialState });
    if (!isFormValid(item, inputToValidate)) {
      const listOfInvalidInputs = findInvalidElement(item, inputToValidate);
      console.log(listOfInvalidInputs);
      setForm({ invalid: listOfInvalidInputs, error: true });
      return;
    }
    try {
      const { data } = await createEditItem<ItemType>(apiURL, item, item.id);
      resetForm();
      updateItem(data);
      if (data.image) {
        setImagePreview({
          file: {},
          imagePreviewUrl: `/uploads/${data.image}`,
        });
      }
      setForm({ ...formInitialState, success: true });
    } catch (error) {
      // handle error
      console.log(error);
      setForm({ ...formInitialState, error: true });
    }
    return true;
  };

  const openDeleteModal = (item: any) => {
    setIsOpenDelete(true);
  };

  const onPrimaryButtonClickDelete = async () => {
    await deleteItem(apiURL, item.id);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    setIsOpenDelete(false);
    resetForm();
    closeElement();
  };

  const fetchUrlData = async (url: string) => {
    if (!url) {
      setForm({ info: 'URL is missing' });
      return;
    }
    setForm({ info: 'Fetching data...' });
    const response = await axios.get(url).catch(function (error) {
      // handle error
      console.log(error);
      setForm({ info: error.message });
    });
    if (response) {
      setForm({ info: '' });
      const $ = cheerio.load(response.data);

      const titleText = $('title').first().text();
      const descriptionText =
        $('meta[name="description"]').length > 0
          ? $('meta[name="description"]').first().attr('content')
          : $('meta[property="og:description"]').first().attr('content');

      let name = titleText ? titleText : '';
      let description = descriptionText ? descriptionText : '';

      if (description.length > 191) {
        const maxLength = 188;
        //trim the string to the maximum length
        let trimmedString = description.slice(0, maxLength);
        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.slice(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';

        description = trimmedString;
      }

      updateItem({ name, description });
    }
  };

  const clickBackToList = () => {
    resetForm();
    closeElement();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2" onClick={() => clickBackToList()} role="menuitem">
          <ChevronLeftIcon className="h-3" /> back to list
        </a>
        <h2 className="text-2xl flex items-center gap-2">{item.id ? `Edit ${titleElement}` : `Add new ${titleElement}`}</h2>
        <div className="flex items-center gap-4">
          {item.id && (
            <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openDeleteModal(item)} role="menuitem">
              <TrashIcon className="inline-flex align-text-bottom h-4 mr-1" />
              Delete
            </a>
          )}
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
          {form.info && (
            <div className="bg-blue-200 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{form.info}</span>
            </div>
          )}
          <div className="grid grid-cols-6 gap-6">
            {inputList.map((input: any, index: number) => (
              <div key={index} className={input.classNames}>
                {input.html && <>{input.html}</>}
                {!input.html && (
                  <InputType
                    input={input}
                    form={form}
                    itemData={item}
                    imagePreview={imagePreview}
                    inputFileRef={inputFileRef}
                    handleChange={handleChange}
                    fetchFunction={fetchUrlData}
                  />
                )}
              </div>
            ))}
          </div>
        </form>
      </div>

      <AdminModal
        title={`Delete ${titleElement}`}
        isOpen={isOpenDelete}
        closeModal={() => setIsOpenDelete(false)}
        showButtons={true}
        onSecondaryButtonClick={() => setIsOpenDelete(false)}
        onPrimaryButtonClick={onPrimaryButtonClickDelete}
        primaryButtonLabel="Delete"
        primaryButtonClass="button-danger"
        fullSize={false}
      >
        <p>Are you sure you want to delete &quot;{item.name}&quot;?</p>
      </AdminModal>
    </>
  );
};

export default AdminForm;
