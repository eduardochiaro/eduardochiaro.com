'use client';

// React component form for admin to save data using axios
import React, { useState, useReducer, useRef, useEffect, ReactElement } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';
import { createEditItem, deleteItem } from '@/utils/apiAdmin';
import AdminModal from '@/components/admin/Modal';
import axios from 'axios';
import * as cheerio from 'cheerio';
import InputType from './InputType';

type AdminFormType = {
  children?: ReactElement;
  apiURL: string;
  itemFormat: any;
  itemData: any;
  inputList: any[];
  titleElement: string;
  closeElement: () => void;
};

type ItemType = {
  id: string;
  image: string;
  [key: string]: any;
};

const imagePreviewSet = {
  file: {},
  imagePreviewUrl: '',
};

const AdminForm = ({ children, apiURL, itemFormat, itemData, inputList, titleElement, closeElement }: AdminFormType) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const formInitialState = {
    error: false,
    success: false,
    info: '',
    invalid: [],
  };

  const [item, updateItem] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, itemFormat);
  const [form, setForm] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, formInitialState);
  const [imagePreview, setImagePreview] = useState(imagePreviewSet);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [inputToValidate, setInputToValidate] = useState<any[]>([]);

  useEffect(() => {
    setInputToValidate(
      inputList
        .filter(
          (item) => item.required && (!item.requiredCondition || (item.requiredCondition && itemData[item.requiredCondition[0]] == item.requiredCondition[1])),
        )
        .map((item) => item.name),
    );
  }, [inputList, itemData]);

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

  useEffect(() => {
    updateItem(itemData);
    if (itemData?.image) {
      setImagePreview({
        file: {},
        imagePreviewUrl: `/uploads/${itemData.image}`,
      });
    } else {
      setImagePreview(imagePreviewSet);
    }
  }, [itemData]);

  const onSubmitModal = async (e: Event) => {
    e.preventDefault();
    setForm({ ...formInitialState });
    if (!isFormValid(item, inputToValidate)) {
      const listOfInvalidInputs = findInvalidElement(item, inputToValidate);
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
        <a href="#" className="flex items-center gap-2 text-sm font-semibold opacity-70 hover:underline" onClick={() => clickBackToList()} role="menuitem">
          <ChevronLeftIcon className="h-3" /> back to list
        </a>
        <div className="flex items-center gap-4">
          {item.id && (
            <a href="#" className="text-sm font-semibold text-red-500 hover:underline" onClick={() => openDeleteModal(item)} role="menuitem">
              <TrashIcon className="mr-1 inline-flex h-4 align-text-bottom" />
              Delete
            </a>
          )}
          <button onClick={(e: any) => onSubmitModal(e)} type="button" className={'button-success'}>
            Save
          </button>
        </div>
      </div>
      <h2 className="left-1/2 top-7 my-3 flex items-center gap-2 text-2xl md:absolute md:my-0">
        {item.id ? `Edit ${titleElement}` : `Add new ${titleElement}`}
      </h2>
      <div className={'mx-auto mb-2 mt-8 max-w-5xl'}>
        <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={(e: any) => onSubmitModal(e)}>
          {form.error && (
            <div className="relative mb-4 rounded border border-accent-400 bg-accent-100 px-4 py-3 text-accent-700" role="alert">
              <strong className="font-bold">
                <ExclamationTriangleIcon className="mr-4 inline-flex h-6 align-middle" />
                Invalid Form!{' '}
              </strong>
              <span className="block sm:inline">Some required fields are missing.</span>
            </div>
          )}
          {form.success && (
            <div className="relative mb-4 rounded border border-emerald-400 bg-emerald-100 px-4 py-3 text-emerald-700" role="alert">
              <strong className="font-bold">
                <CheckIcon className="mr-4 inline-flex h-6 align-middle" />
                Success!{' '}
              </strong>
              <span className="block sm:inline">This page was saved.</span>
            </div>
          )}
          {form.info && (
            <div className="relative mb-4 rounded border border-blue-400 bg-blue-200 px-4 py-3 text-blue-700" role="alert">
              <span className="block sm:inline">{form.info}</span>
            </div>
          )}
          <div className="grid grid-cols-6 gap-6">
            {inputList.map((input: any, index: number) => (
              <div key={index} className={`max-md:col-span-6 ${input.classNames}`}>
                <InputType
                  input={input}
                  form={form}
                  itemData={item}
                  imagePreview={imagePreview}
                  inputFileRef={inputFileRef}
                  handleChange={handleChange}
                  updateItem={updateItem}
                  fetchFunction={fetchUrlData}
                />
              </div>
            ))}
          </div>
        </form>

        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
        })}
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
