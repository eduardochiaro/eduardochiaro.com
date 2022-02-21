import { BriefcaseIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import AdminModal, { openModal } from "../../../elements/admin/Modal";
import AdminWrapper from "../../../elements/admin/Wrapper";

const fetcher = (url) => fetch(url).then((res) => res.json())


const AdminJobsIndex = () => {
  const { data: jobs, error } = useSWR('/api/portfolio/works', fetcher);
  const { data: session } = useSession();

  let [isOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
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
                    {jobs?.results.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {job.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Image
                              layout="intrinsic"
                              width={Math.round((70 / 100) * parseInt(job.style))}
                              height={50}
                              alt={job.name}
                              src={`/images/logos/${job.logo}`}
                              title={job.disclaimer}
                              />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.style}px
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.disclaimer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={openModal}>
                            <PencilAltIcon className="inline-flex align-text-bottom h-5 mr-1"/>Edit
                          </a>
                          <a href="#" className="text-indigo-600 hover:text-indigo-900 ml-4">
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
        <AdminModal title="Edit Job" isOpen={isOpen} closeModal={closeModal}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label htmlFor="title-form" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title-form"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </AdminModal>
      </AdminWrapper>
    )
  }
  return null
}

export default AdminJobsIndex;