import { BriefcaseIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef, useRef } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import mergeObj from '@/utils/mergeObj';
import SVG from 'react-inlinesvg';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid';
import List from '@/components/admin/List';

const AdminJobsIndex = ({ formRef }) => {
  const { mutate, data: jobs, error } = useStaleSWR('/api/portfolio/jobs');
  const { data: session } = useSession();

  const jobFormat = {
    id: null,
    name: '',
    disclaimer: '',
    logo: '',
    startDate: null,
    endDate: null,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [job, setJob] = useState(jobFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const inputFileRef = useRef(null);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(job)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(job)) {
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
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFormError(true);
        setFormSuccess(false);
      })
      .then(({ data }) => {
        inputFileRef.current.value = '';
        mutate();
        const mergedData = mergeObj(jobFormat, data);
        setJob(mergedData);
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
    inputFileRef.current.value = '';
    mutate();
    closeModalDelete();
  };

  const openModal = (job) => {
    const openJob = mergeObj(jobFormat, job);
    setJob(openJob);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    inputFileRef.current.value = '';
    setFormError(false);
    setFormSuccess(false);
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

  const columns = ['name', 'disclaimer'];

  const handleChange = (e) => {
    if (e.target.files) {
      setJob({ ...job, [e.target.name]: e.target.files[0] });
    } else {
      setJob({ ...job, [e.target.name]: e.target.value });
    }
  };

  const newData = [];
  jobs?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.category_d =
      (item.startDate ? moment(item.startDate).format('YYYY-MM') : 'N/A') + ' - ' + (item.endDate ? moment(item.endDate).format('YYYY-MM') : 'Current');
    obj.image_d = <SVG alt={item.name} className={'object-cover w-16 fill-primary-700 dark:fill-primary-200'} src={`/uploads/${item.logo}`} height={25} />;
    obj.size = item.style + 'px';
    obj.description = obj.disclaimer;
    newData.push(obj);
  });

  const title = (
    <h1 className="grow flex items-center gap-2">
      <BriefcaseIcon className="h-6 text-secondary-700 dark:text-secondary-600" />
      <span>Jobs list</span>
    </h1>
  );

  if (session) {
    return (
      <AdminWrapper>
        <div className="h-full py-8 w-full w-1/4">
          <List title={title} columns={columns} data={newData} format={jobFormat} openAction={openModal} editAction={openModal} activeId={job.id} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl flex items-center gap-2">
              <BriefcaseIcon className="h-6 text-secondary-700 dark:text-secondary-600" /> {job.id ? 'Edit job' : 'Add new job'}
            </h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openModalDelete(job)} role="menuitem" tabIndex="-1">
                <TrashIcon className="inline-flex align-text-bottom h-4 mr-1" />
                Delete
              </a>
              <button onClick={onPrimaryButtonClick} type="button" className={'button-success'}>
                Save
              </button>
            </div>
          </div>

          <div className={'mt-8 mb-2'}>
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
              {formSuccess && (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">
                    <CheckIcon className="inline-flex align-middle h-6 mr-4" />
                    Success!{' '}
                  </strong>
                  <span className="block sm:inline">This page was saved.</span>
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
                    ref={inputFileRef}
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
                      <div className="mt-4 w-32 m-auto relative">
                        <SVG alt={job.name} className={'w-32 fill-primary-700 dark:fill-primary-200'} src={`/uploads/${job.logo}`} height={50} />
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
          </div>
        </div>

        <AdminModal
          title="Delete job"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
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
