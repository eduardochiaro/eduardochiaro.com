import { TagIcon, ExclamationIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import mergeObj from "../../../lib/mergeObj";
import useStaleSWR from "../../../lib/staleSWR";
import moment from "moment";

const AdminCategoriesIndex = ({ formRef, images }) => {
  const { data: categories, error } = useStaleSWR('/api/admin/categories');
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const categoryFormat = {
    id: null,
    name: '',
    type: '',
  };

  const types = ['BOOKMARK', 'JOB'];

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false); 
  let [category, setCategory] = useState(categoryFormat);
  let [formError, setFormError] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();    
    setFormError(false);
    if (!isFormValid(category)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(category)) {
      if (key == 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: category.id ? 'PUT' : 'POST',
      url: category.id ? `/api/admin/categories/${category.id}` : '/api/admin/categories/create',
      data: formData,
      headers: {
        'Content-Type': `application/json`
      }
    }).then(({ data }) => {
      mutate('/api/admin/categories');
      closeModal();
    });
  }

  const isFormValid = (form) => {
    if (
      form.name == ''
      || form.type == ''
      ) {
        return false;
    }
    return true;
  }

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    )
  }

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/admin/categories/${category.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    mutate('/api/admin/categories');
    closeModalDelete();
  }
  
  const openModal = (category) => {
    const openCategory = mergeObj(categoryFormat, category);
    setCategory(openCategory);
    setIsOpen(true);
  }

  const closeModal = () => {
    setCategory(categoryFormat);
    setIsOpen(false);
    setFormError(false);
  }
  
  const openModalDelete = (category) => {
    const openCategory = mergeObj(categoryFormat, category);
    setCategory(openCategory);
    setIsOpenDelete(true);
  }

  const closeModalDelete = () => {
    setCategory(categoryFormat);
    setIsOpenDelete(false);
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setCategory({ ...category, [e.target.name]: e.target.files[0] });
    } else {
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
  }

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><TagIcon className="inline-flex align-text-bottom h-10 text-isabelline-800 "/> Categories list</h1>
          <div className="flex-none text-right">
            <button className="bg-isabelline-700 hover:bg-isabelline-800 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(categoryFormat)}>
              <PlusIcon className="inline-flex align-text-bottom h-5 text-white  "/> Add new category
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      Name
                    </th>
                    <th scope="col">
                      Type
                    </th>
                    <th scope="col">
                      Updated
                    </th>
                    <th scope="col" className="relative">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.results.map((item) => (
                    <tr key={item.id}>
                      <td><span className="hidden">{item.id}</span></td>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>
                        {item.type}
                      </td>
                      <td className="w-44">
                        {moment(item.updatedAt || item.createdAt).from(moment())}
                      </td>
                      <td className="w-44 text-right font-medium">
                        <a href="#" className="text-isabelline-800 dark:text-isabelline-500 hover:underline" onClick={() => openModal(item)}>
                          <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                        </a>
                        <a href="#" className="text-isabelline-800 dark:text-isabelline-500 hover:underline ml-4" onClick={() => openModalDelete(item)}>
                          <TrashIcon className="inline-flex align-text-bottom h-4 mr-1"/>Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AdminModal 
          title={category.id ? 'Edit category' : 'Add new category'}
          isOpen={isOpen} 
          closeModal={closeModal} 
          showButtons={true}
          onSecondaryButtonClick={closeModal}
          onPrimaryButtonClick={onPrimaryButtonClick}
          >
          <form 
            ref={ formRef } 
            acceptCharset="UTF-8"
            method="POST"
            encType="multipart/form-data"
            onSubmit={onSubmitModal}>
            {formError &&
              <div className="bg-terra-cotta-100 border border-terra-cotta-400 text-terra-cotta-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold"><ExclamationIcon className="inline-flex align-middle h-6 mr-4"/>Invalid Form! </strong>
                <span className="block sm:inline">Some required fields are missing.</span>
              </div>
            }
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-isabelline-700 text-xl">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={category.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="type-form" className="input-label">
                  Type <span className="text-isabelline-700 text-xl">*</span>
                </label>
                <select 
                  name="type" 
                  id="type-form"
                  className="mt-1 input-field"
                  onChange={handleChange}
                  value={category.type}
                  required
                  >
                  <option value="">Select type</option>
                  {types.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>  
          </form>
        </AdminModal>
        <AdminModal
          title="Delete category"
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
        >
          <p>Are you sure you want to delete category &quot;{ category.name }&quot;?</p>
        </AdminModal>
      </AdminWrapper>
    )
  }
  return null
}

export async function getStaticProps() {
  const dirRelativeToPublicFolder = 'images/svg-icons'
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);

  return {
    props: { formRef: createRef(), images: filenames }, // will be passed to the page component as props
  }
}

export default AdminCategoriesIndex;