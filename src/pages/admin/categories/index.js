import { TagIcon, ExclamationIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import TableLayout from "../../../components/admin/TableLayout";
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

  const columns = [
    {
      name: "Name",
      key: "name",
      classNameTd: "font-bold"
    },
    {
      name: "Type",
      key: "type"
    },
    {
      name: "Updated",
      key: "updated",
      classNameTd: "w-44"
    }
  ]

  const newData = [];
  categories?.results.map(item => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><TagIcon className="inline-flex align-text-bottom h-10 text-primary-700 dark:text-primary-600"/> Categories list</h1>
          <div className="flex-none text-right">
            <button className="transition flex items-center bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(categoryFormat)}>
              <PlusIcon className="h-5 mr-2 text-white "/>  Add new category
            </button>
          </div>
        </div>
        <TableLayout columns={columns} data={newData} editAction={openModal} deleteAction={openModalDelete} />
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
              <div className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold"><ExclamationIcon className="inline-flex align-middle h-6 mr-4"/>Invalid Form! </strong>
                <span className="block sm:inline">Some required fields are missing.</span>
              </div>
            }
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-primary-700 text-xl">*</span>
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
                  maxLength={191}
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="type-form" className="input-label">
                  Type <span className="text-primary-700 text-xl">*</span>
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