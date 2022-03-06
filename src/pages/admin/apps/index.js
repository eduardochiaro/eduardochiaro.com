import { ChipIcon, ExclamationIcon, ExternalLinkIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import AdminModal from "../../../elements/admin/Modal";
import AdminWrapper from "../../../elements/admin/Wrapper";
import mergeObj from "../../../lib/mergeObj";
import NaturalImage from "../../../elements/NaturalImage";
import useStaleSWR from "../../../lib/staleSWR";
import moment from "moment";
import Link from "next/link";

const AdminAppsIndex = ({ formRef }) => {
  const { data: apps, error } = useStaleSWR('/api/portfolio/apps');
  const { data: session } = useSession();
  
  const { mutate } = useSWRConfig();

  const appFormat = {
    id: null,
    name: '',
    short: '',
    image: '',
    url: ''
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
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    }).then(({ data }) => {
      mutate('/api/portfolio/apps');
      closeModal();
    });
  }

  const isFormValid = (form) => {
    if (
      form.name == ''
      || form.url == ''
      || (!form.id && !form.image)
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
    const urlDelete = `/api/portfolio/apps/${app.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    mutate('/api/portfolio/apps');
    closeModalDelete();
  }
  
  const openModal = (app) => {
    const openApp = mergeObj(appFormat, app);
    setApp(openApp);
    setIsOpen(true);
  }

  const closeModal = () => {
    setApp(appFormat);
    setIsOpen(false);
    setFormError(false);
  }
  
  const openModalDelete = (app) => {
    const openApp = mergeObj(appFormat, app);
    setApp(openApp);
    setIsOpenDelete(true);
  }

  const closeModalDelete = () => {
    setApp(appFormat);
    setIsOpenDelete(false);
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setApp({ ...app, [e.target.name]: e.target.files[0] });
    } else {
      setApp({ ...app, [e.target.name]: e.target.value });
    }
  }

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><ChipIcon className="inline-flex align-text-bottom h-10 text-terra-cotta-500 "/> Apps list</h1>
          <div className="flex-none text-right">
            <button className="bg-terra-cotta-500 hover:bg-terra-cotta-600 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(appFormat)}>
              <PlusIcon className="inline-flex align-text-bottom h-5 text-white  "/> Add new app
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        Name
                      </th>
                      <th scope="col" className="textcenter">
                        Image
                      </th>
                      <th scope="col">
                        Short
                      </th>
                      <th scope="col">
                        GitHub URL
                      </th>
                      <th scope="col">
                        Last Updated
                      </th>
                      <th scope="col" className="relative">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps?.results.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.name}</strong>
                        </td>
                        <td className="text-center">
                          <div className="w-32 m-auto relative">
                            <NaturalImage
                              src={`/uploads/${item.image}`}
                              alt={item.name}
                              title={item.name}
                              />
                          </div>
                          <div className="small">{item.image}</div>
                        </td>
                        <td>
                          <p className="w-64 text-ellipsis overflow-hidden">
                            {item.short}
                          </p>
                        </td>
                        <td>
                          {item.url} 
                          <Link
                            href={item.url}
                          >
                          <a target="_blank" rel="noreferrer"><ExternalLinkIcon className="h-4 inline-block align-text-bottom ml-2"/></a>
                          </Link>
                        </td>
                        <td className="w-44">
                          {moment(item.updatedAt || item.createdAt).from(moment())}
                        </td>
                        <td className="w-44 text-right font-medium">
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900" onClick={() => openModal(item)}>
                            <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                          </a>
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900 ml-4" onClick={() => openModalDelete(item)}>
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
        </div>
        <AdminModal 
          title={app.id ? 'Edit app' : 'Add new app'}
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
                  Title <span className="text-terra-cotta-600 text-xl">*</span>
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
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="image-url-form" className="input-label">
                  Image { !app.id &&
                   <span className="text-terra-cotta-600 text-xl">*</span>
                  }
                </label>
                <input
                  type="file"
                  name="image"
                  id="image-url-form"
                  className="mt-1 block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-independence-200 file:text-independence-700
                        hover:file:bg-independence-300
                  "
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="url-form" className="input-label">
                  GitHub URL <span className="text-terra-cotta-600 text-xl">*</span>
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
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="short-form" className="input-label">
                  Short text
                </label>
                <textarea
                  name="short"
                  id="short-form"
                  className="mt-1 input-field"
                  rows={5}
                  value={app.short}
                  onChange={handleChange}
                />
              </div>
            </div>  
          </form>
        </AdminModal>
        <AdminModal
          title="Delete app"
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
        >
          <p>Are you sure you want to delete app &quot;{ app.name }&quot;?</p>
        </AdminModal>
      </AdminWrapper>
    )
  }
  return null
}

export async function getStaticProps() {
  return {
    props: { formRef: createRef() }, // will be passed to the page component as props
  }
}

export default AdminAppsIndex;