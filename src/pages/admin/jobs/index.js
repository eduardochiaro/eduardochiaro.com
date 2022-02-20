import { BriefcaseIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import Image from "next/image";
import useSWR from "swr";
import AdminWrapper from "../../../elements/admin/Wrapper";

const fetcher = (url) => fetch(url).then((res) => res.json())


const AdminJobsIndex = () => {
  const { data: jobs, error } = useSWR('/api/portfolio/works', fetcher);
  const { data: session } = useSession();
  if (session) {
    return (
      <AdminWrapper>
        <>
          <h1 className="text-4xl mb-10"><BriefcaseIcon className="inline-flex align-bottom h-10 text-terra-cotta-500 "/> Jobs list</h1>
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
                                width={Math.round((130 / 50) * parseInt(job.style))}
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
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </a>
                            <a href="#" className="text-indigo-600 hover:text-indigo-900 ml-4">
                              Delete
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
        </>
      </AdminWrapper>
    )
  }
  return null
}

export default AdminJobsIndex;