import { BriefcaseIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useState, createRef } from "react";
import useSWR, { useSWRConfig } from "swr";
import AdminModal from "../../../elements/admin/Modal";
import AdminWrapper from "../../../elements/admin/Wrapper";
import mergeObj from "../../../lib/mergeObj";

const fetcher = (url) => fetch(url).then((res) => res.json())

const AdminJobsIndex = ({ formRef }) => {
  const { data: jobs, error } = useSWR('/api/portfolio/works', fetcher);
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
  let [job, setJob] = useState(jobFormat);

  const onSubmitModal = async (e) => {
    e.preventDefault();    
    let formData = {};

    for (let [key, value] of Object.entries(job)) {
      formData[key] = value;
    }

    const saveJob = mergeObj(jobFormat, formData);

    const urlSave = saveJob.id ? `/api/portfolio/works/${saveJob.id}` : '/api/portfolio/works/create';

    await fetch(urlSave, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    mutate('/api/portfolio/works');
    closeModal();
  }

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    )
  }
  
  const openModal = (job) => {
    const openJob = mergeObj(jobFormat, job);
    setJob(openJob);
    setIsOpen(true);
  }

  const closeModal = () => {
    setJob(jobFormat);
    setIsOpen(false);
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setJob({ ...job, [e.target.name]: e.target.files[0] });
    } else {
      setJob({ ...job, [e.target.name]: e.target.value });
    }
  }

  if (session) {
    return (
      <AdminWrapper>
        <h1 className="text-4xl mb-5"><BriefcaseIcon className="inline-flex align-text-bottom h-10 text-terra-cotta-500 "/> Jobs list</h1>
        <div className="text-right">
          <button className="bg-terra-cotta-500 hover:bg-terra-cotta-600 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(jobFormat)}>
            <PlusIcon className="inline-flex align-text-bottom h-5 text-white  "/> Add new job
          </button>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="textcenter"
                      >
                        Logo
                      </th>
                      <th
                        scope="col"
                        className="textcenter"
                      >
                        Size (width)
                      </th>
                      <th
                        scope="col"
                      >
                        Disclaimer
                      </th>
                      <th scope="col" className="relative">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs?.results.map((item) => (
                      <tr key={item.id}>
                        <td>
                            {item.name}
                        </td>
                        <td className="text-center">
                            <Image
                              layout="intrinsic"
                              width={Math.round((70 / 100) * parseInt(item.style))}
                              height={50}
                              alt={item.name}
                              src={`/images/logos/${item.logo}`}
                              title={item.disclaimer}
                              />
                        </td>
                        <td className="text-center">
                          {item.style}px
                        </td>
                        <td>
                          {item.disclaimer}
                        </td>
                        <td className="text-right font-medium">
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900" onClick={() => openModal(item)}>
                            <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                          </a>
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900 ml-4">
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
          title={job.id ? 'Edit job' : 'Add new job'}
          isOpen={isOpen} 
          closeModal={closeModal} 
          showButtons={true}
          onSecondaryButtonClick={closeModal}
          onPrimaryButtonClick={onPrimaryButtonClick}
          >
          <form ref={ formRef } onSubmit={onSubmitModal}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title
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
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="logo-url-form" className="input-label">
                  Logo Url
                </label>
                <input
                  type="text"
                  name="logo"
                  id="logo-url-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={job.logo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="style-form" className="input-label">
                  Size (width)
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
                />
              </div>
            </div>  
          </form>
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