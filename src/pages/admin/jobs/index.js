import { BriefcaseIcon, ExclamationIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import TableLayout from "../../../components/admin/TableLayout";
import mergeObj from "../../../lib/mergeObj";
import SVG from 'react-inlinesvg';
import useStaleSWR from "../../../lib/staleSWR";
import moment from "moment";

const AdminJobsIndex = ({ formRef }) => {
  const { data: jobs, error } = useStaleSWR('/api/portfolio/works');
  const { data: session } = useSession();
  
  const { mutate } = useSWRConfig();

  const jobFormat = {
    id: null,
    name: '',
    disclaimer: '',
    logo: '',
    style: 0
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false); 
  let [job, setJob] = useState(jobFormat);
  let [formError, setFormError] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();    
    setFormError(false);
    if (!isFormValid(job)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(job)) {
      if (key == 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: job.id ? 'PUT' : 'POST',
      url: job.id ? `/api/portfolio/works/${job.id}` : '/api/portfolio/works/create',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      }
    }).then(({ data }) => {
      mutate('/api/portfolio/works');
      closeModal();
    });
  }

  const isFormValid = (form) => {
    if (
      form.name == ''
      || form.style <= 0
      || form.style == ''
      || (!form.id && !form.logo)
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
    const urlDelete = `/api/portfolio/works/${job.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    mutate('/api/portfolio/works');
    closeModalDelete();
  }
  
  const openModal = (job) => {
    const openJob = mergeObj(jobFormat, job);
    setJob(openJob);
    setIsOpen(true);
  }

  const closeModal = () => {
    setJob(jobFormat);
    setIsOpen(false);
    setFormError(false);
  }
  
  const openModalDelete = (job) => {
    const openJob = mergeObj(jobFormat, job);
    setJob(openJob);
    setIsOpenDelete(true);
  }

  const closeModalDelete = () => {
    setJob(jobFormat);
    setIsOpenDelete(false);
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setJob({ ...job, [e.target.name]: e.target.files[0] });
    } else {
      setJob({ ...job, [e.target.name]: e.target.value });
    }
  }

  const columns = [
    {
      name: "Name",
      key: "name",
      classNameTd: "font-bold"
    },
    {
      name: "Logo",
      key: "logo_d",
      className: "textcenter",
      classNameTd: "text-center"
    },
    {
      name: "Size (width)",
      key: "size",
      className: "textcenter",
      classNameTd: "text-center"
    },
    {
      name: "Disclaimer",
      key: "disclaimer"
    },
    {
      name: "Updated",
      key: "updated",
      classNameTd: "w-44"
    }
  ]

  const newData = [];
  jobs?.results.map(item => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.description_d = (
      <p className="w-64 text-ellipsis overflow-hidden">
        {item.description}
      </p>
    )
    obj.logo_d = (
      <>
        <div className="w-32 m-auto relative">
          <SVG title={item.name} alt={item.name} className={`inline w-auto fill-zinc-700 dark:fill-zinc-200`} src={`/uploads/${item.logo}`} height={25} />
        </div>
        <div className="small">{item.logo}</div>
      </>
    );
    obj.size = item.style + 'px';
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><BriefcaseIcon className="inline-flex align-text-bottom h-10 text-primary-700 dark:text-primary-600"/> Jobs list</h1>
          <div className="flex-none text-right">
            <button className="transition flex items-center bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(jobFormat)}>
              <PlusIcon className="h-5 mr-2 text-white "/>  Add new job
            </button>
          </div>
        </div>
        <TableLayout columns={columns} data={newData} editAction={openModal} deleteAction={openModalDelete} />
        <AdminModal 
          title={job.id ? 'Edit job' : 'Add new job'}
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
                  value={job.name}
                  onChange={handleChange}
                  maxLength={191}
                  required
                />
              </div>
              <div className="col-span-5 sm:col-span-4">
                <label htmlFor="logo-url-form" className="input-label">
                  Logo { !job.id &&
                   <span className="text-primary-700 text-xl">*</span>
                  }
                </label>
                <input
                  type="file"
                  name="logo"
                  id="logo-url-form"
                  className="mt-1 block w-full text-sm text-zinc-900 dark:text-zinc-100
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary-700 file:text-zinc-100
                        hover:file:bg-primary-800
                  "
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                { job.id > 0 && job.logo &&
                  <>
                  <label htmlFor="style-form" className="input-label">
                    Current
                  </label>
                  <div className="mt-4">
                    <SVG title={job.name} alt={job.name} className={`inline w-auto fill-zinc-700 dark:fill-zinc-200`} src={`/uploads/${job.logo}`} height={25} />
                  </div>
                  </>
                }
              </div>
              <div className="col-span-6 sm:col-span-1">
                <label htmlFor="style-form" className="input-label">
                  Size (width) <span className="text-primary-700 text-xl">*</span>
                </label>
                <input
                  type="number"
                  name="style"
                  id="style-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={job.style}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="disclaimer-form" className="input-label">
                  Disclaimer
                </label>
                <textarea
                  name="disclaimer"
                  id="disclaimer-form"
                  className="mt-1 input-field"
                  value={job.disclaimer}
                  onChange={handleChange}
                  maxLength={191}
                />
              </div>
            </div>  
          </form>
        </AdminModal>
        <AdminModal
          title="Delete job"
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
        >
          <p>Are you sure you want to delete job &quot;{ job.name }&quot;?</p>
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

export default AdminJobsIndex;