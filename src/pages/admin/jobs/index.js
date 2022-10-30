import { BriefcaseIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import Table from '@/components/admin/Table';
import mergeObj from '@/utils/mergeObj';
import SVG from 'react-inlinesvg';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';

const AdminJobsIndex = ({ formRef }) => {
  const { data: jobs, error } = useStaleSWR('/api/portfolio/jobs');
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const jobFormat = {
    id: null,
    name: '',
    disclaimer: '',
    logo: '',
    startDate: null,
    endDate: null,
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
      url: job.id ? `/api/portfolio/jobs/${job.id}` : '/api/portfolio/jobs/create',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    }).then(({ data }) => {
      mutate('/api/portfolio/jobs');
      closeModal();
    });
  };

  const isFormValid = (form) => {
    if (form.name == '' || form.style <= 0 || form.style == '' || (!form.id && !form.logo)) {
      return false;
    }
    return true;
  };

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/portfolio/jobs/${job.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mutate('/api/portfolio/jobs');
    closeModalDelete();
  };

  const openModal = (job) => {
    const openJob = mergeObj(jobFormat, job);
    setJob(openJob);
    setIsOpen(true);
  };

  const closeModal = () => {
    setJob(jobFormat);
    setIsOpen(false);
    setFormError(false);
  };

  const openModalDelete = (job) => {
    const openJob = mergeObj(jobFormat, job);
    setJob(openJob);
    setIsOpenDelete(true);
  };

  const closeModalDelete = () => {
    setJob(jobFormat);
    setIsOpenDelete(false);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setJob({ ...job, [e.target.name]: e.target.files[0] });
    } else {
      setJob({ ...job, [e.target.name]: e.target.value });
    }
  };

  const columns = [
    {
      name: 'Name',
      key: 'name',
      searchable: true,
      classNameTd: 'font-bold',
    },
    {
      name: 'Logo',
      key: 'logo_d',
      className: 'textcenter',
      classNameTd: 'text-center',
    },
    {
      name: 'When',
      key: 'when_d',
      searchable: false,
    },
    {
      name: 'Disclaimer',
      key: 'disclaimer',
      searchable: true,
    },
    {
      name: 'Updated',
      key: 'updated',
      classNameTd: 'w-44',
    },
  ];

  const newData = [];
  jobs?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.when_d =
      (item.startDate ? moment(item.startDate).format('YYYY-MM') : 'N/A') + ' - ' + (item.endDate ? moment(item.endDate).format('YYYY-MM') : 'Current');
    obj.description_d = <p className="w-64 text-ellipsis overflow-hidden">{item.description}</p>;
    obj.logo_d = (
      <>
        <div className="w-32 m-auto relative">
          <SVG alt={item.name} className={'inline w-auto fill-primary-700 dark:fill-primary-200'} src={`/uploads/${item.logo}`} height={25} />
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
        <AdminWrapper.Header>
          <h1 className="text-2xl flex items-center gap-2">
            <BriefcaseIcon className="h-6 text-secondary-700 dark:text-secondary-600" /> Jobs list
          </h1>
        </AdminWrapper.Header>
        <Table
          columns={columns}
          data={newData}
          format={jobFormat}
          editAction={openModal}
          deleteAction={openModalDelete}
          openAction={openModal}
          openActionLabel="Add new job"
        />
        <AdminModal
          title={job.id ? 'Edit job' : 'Add new job'}
          isOpen={isOpen}
          closeModal={closeModal}
          showButtons={true}
          onSecondaryButtonClick={closeModal}
          onPrimaryButtonClick={onPrimaryButtonClick}
        >
          <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={onSubmitModal}>
            {formError && (
              <div className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">
                  <ExclamationTriangleIcon className="inline-flex align-middle h-6 mr-4" />
                  Invalid Form!{' '}
                </strong>
                <span className="block sm:inline">Some required fields are missing.</span>
              </div>
            )}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-secondary-700 align-super">*</span>
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
                  Logo {!job.id && <span className="text-secondary-700">*</span>}
                </label>
                <input
                  type="file"
                  name="logo"
                  id="logo-url-form"
                  className="input-field
                  mt-1
                  py-1.5 px-2
                  focus:outline-none
                  "
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2">
                {job.id > 0 && job.logo && (
                  <>
                    <label htmlFor="style-form" className="input-label">
                      Current
                    </label>
                    <div className="mt-4">
                      <SVG alt={job.name} className={'inline w-auto fill-primary-700 dark:fill-primary-200'} src={`/uploads/${job.logo}`} height={25} />
                    </div>
                  </>
                )}
              </div>
              <div className="col-span-3">
                <label htmlFor="startDate-form" className="input-label">
                  Start date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate-form"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={job.startDate ? moment(job.startDate).format('YYYY-MM-DD') : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="endDate-form" className="input-label">
                  End date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate-form"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={job.endDate ? moment(job.endDate).format('YYYY-MM-DD') : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="disclaimer-form" className="input-label">
                  Disclaimer
                </label>
                <textarea name="disclaimer" id="disclaimer-form" className="mt-1 input-field" value={job.disclaimer} onChange={handleChange} maxLength={191} />
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
          fullSize={false}
        >
          <p>Are you sure you want to delete job &quot;{job.name}&quot;?</p>
        </AdminModal>
      </AdminWrapper>
    );
  }
  return null;
};

export async function getStaticProps() {
  return {
    props: { formRef: createRef() }, // will be passed to the page component as props
  };
}

export default AdminJobsIndex;
