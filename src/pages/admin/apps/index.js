import { ChipIcon, ExclamationIcon, ExternalLinkIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import TableLayout from "../../../components/admin/tableLayout";
import mergeObj from "../../../lib/mergeObj";
import NaturalImage from "../../../components/NaturalImage";
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
    description: '',
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

  const columns = [
    {
      name: "Name",
      key: "name",
      classNameTd: "font-bold"
    },
    {
      name: "Image",
      key: "image",
      className: "textcenter",
      classNameTd: "text-center"
    },
    {
      name: "Description",
      key: "description_d"
    },
    {
      name: "GitHub URL",
      key: "github_url"
    },
    {
      name: "Updated",
      key: "updated",
      classNameTd: "w-44"
    }
  ]
  
  const newData = [];
  apps?.results.map(item => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.description_d = (
      <p className="w-64 text-ellipsis overflow-hidden">
        {item.description}
      </p>
    )
    obj.image = (
      <>
        <div className="w-32 m-auto relative">
          <NaturalImage
            src={`/uploads/${item.image}`}
            alt={item.name}
            title={item.name}
            />
        </div>
        <div className="small">{item.image}</div>
      </>
    );
    obj.github_url = (
      <>
        <span className="w-64 text-ellipsis overflow-hidden inline-block">
          {item.url} 
        </span>
        <Link
          href={item.url}
        >
          <a target="_blank" rel="noreferrer"><ExternalLinkIcon className="h-4 inline-block align-top ml-2"/></a>
        </Link>
      </>
    )
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><ChipIcon className="inline-flex align-text-bottom h-10 text-primary-800 "/> Apps list</h1>
          <div className="flex-none text-right">
            <button type="button" className="bg-primary-700 hover:bg-primary-800 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(appFormat)}>
              <PlusIcon className="inline-flex align-text-bottom h-5 text-white  "/> Add new app
            </button>
          </div>
        </div>
        <TableLayout columns={columns} data={newData} editAction={openModal} deleteAction={openModalDelete} />
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
                  value={app.name}
                  onChange={handleChange}
                  maxLength={191}
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="image-url-form" className="input-label">
                  Image { !app.id &&
                   <span className="text-primary-700 text-xl">*</span>
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
                        file:bg-zinc-200 file:text-zinc-700
                        hover:file:bg-zinc-300
                  "
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="url-form" className="input-label">
                  GitHub URL <span className="text-primary-700 text-xl">*</span>
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
                  Description
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