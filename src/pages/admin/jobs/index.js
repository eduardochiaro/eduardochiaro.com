import { BriefcaseIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useState, createRef } from "react";
import useSWR, { useSWRConfig } from "swr";
import AdminModal from "../../../elements/admin/Modal";
import AdminWrapper from "../../../elements/admin/Wrapper";

const fetcher = (url) => fetch(url).then((res) => res.json())

const AdminJobsIndex = ({ formRef }) => {
  const { data: jobs, error } = useSWR('/api/portfolio/works', fetcher);
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  let [isOpen, setIsOpen] = useState(false);
  let [job, setJob] = useState({
    id: null,
    name: '',
    disclaimer: '',
    logo: '',
    style: ''
  });

  const onSubmitModal = async (e) => {
    e.preventDefault();    
    let formData = {};

    for (let [key, value] of Object.entries(job)) {
      formData[key] = value;
    }

    await fetch('/api/portfolio/works/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    setJob(job);
    setIsOpen(true);
  }

  const closeModal = () => {
    setJob({});
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
        <h1 className="text-4xl mb-10"><BriefcaseIcon className="inline-flex align-text-bottom h-10 text-terra-cotta-500 "/> Jobs list</h1>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Logo
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Size (width)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Disclaimer
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs?.results.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Image
                              layout="intrinsic"
                              width={Math.round((70 / 100) * parseInt(item.style))}
                              height={50}
                              alt={item.name}
                              src={`/images/logos/${item.logo}`}
                              title={item.disclaimer}
                              />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.style}px
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.disclaimer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900" onClick={() => openModal(item)}>
                            <PencilAltIcon className="inline-flex align-text-bottom h-5 mr-1"/>Edit
                          </a>
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900 ml-4">
                          <TrashIcon className="inline-flex align-text-bottom h-5 mr-1"/>Delete
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
          title="Edit Job" 
          isOpen={isOpen} 
          closeModal={closeModal} 
          showButtons={true}
          onSecondaryButtonClick={closeModal}
          onPrimaryButtonClick={onPrimaryButtonClick}
          >
          <form ref={ formRef } onSubmit={onSubmitModal}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="name"
                  id="name-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 focus:ring-green-sheen-500 focus:border-green-sheen-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={job.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="logo-url-form" className="block text-sm font-medium text-gray-700">
                  Logo Url
                </label>
                <input
                  type="text"
                  name="logo"
                  id="logo-url-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 focus:ring-green-sheen-500 focus:border-green-sheen-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={job.logo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="style-form" className="block text-sm font-medium text-gray-700">
                  Size (width)
                </label>
                <input
                  type="number"
                  name="style"
                  id="style-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 focus:ring-green-sheen-500 focus:border-green-sheen-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={job.style}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="disclaimer-form" className="block text-sm font-medium text-gray-700">
                  Disclaimer
                </label>
                <textarea
                  name="disclaimer"
                  id="disclaimer-form"
                  className="mt-1 focus:ring-green-sheen-500 focus:border-green-sheen-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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