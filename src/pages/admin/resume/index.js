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

const AdminResumeIndex = ({ formRef }) => {
  const { mutate, data: resumes, error } = useStaleSWR('/api/portfolio/resume');
  const { data: session } = useSession();

  const resumeFormat = {
    id: null,
    name: '',
    description: '',
    logo: '',
    startDate: null,
    endDate: null,
    tags: [],
    projects: [],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [resume, setResume] = useState(resumeFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const inputFileRef = useRef(null);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(resume)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(resume)) {
      if (key == 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: resume.id ? 'PUT' : 'POST',
      url: resume.id ? `/api/portfolio/resume/${resume.id}` : '/api/portfolio/resume/create',
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
        const mergedData = mergeObj(resumeFormat, data);
        setResume(mergedData);
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
    const urlDelete = `/api/portfolio/resume/${resume.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    inputFileRef.current.value = '';
    mutate();
    closeDeleteModal();
  };

  const openElement = (resume) => {
    const openResume = { ...resumeFormat, ...resume };
    setResume(openResume);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    inputFileRef.current.value = '';
    setFormError(false);
    setFormSuccess(false);
  };

  const openDeleteModal = (resume) => {
    const openResume = mergeObj(resumeFormat, resume);
    setResume(openResume);
    setIsOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setResume(resumeFormat);
    setIsOpenDelete(false);
  };

  const closeElement = () => {
    setResume(resumeFormat);
    setIsOpen(false);
  };

  const columns = ['name', 'description'];

  const handleChange = (e) => {
    setResume({ ...resume, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const newData = [];
  resumes?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d =
      (item.startDate ? moment(item.startDate).format('YYYY-MM') : 'N/A') + ' - ' + (item.endDate ? moment(item.endDate).format('YYYY-MM') : 'Current');
    obj.image_d = item.logo ? (
      <SVG alt={item.name} className={'object-cover w-16 fill-primary-700 dark:fill-primary-200'} src={`/uploads/${item.logo}`} height={25} />
    ) : null;
    newData.push(obj);
  });

  const title = (
    <h1 className="grow flex items-center gap-2">
      <BriefcaseIcon className="h-6 text-secondary-700 dark:text-secondary-600" />
      <span>Resume list</span>
    </h1>
  );

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List title={title} columns={columns} data={newData} format={resumeFormat} openAction={openElement} editAction={openElement} activeId={resume.id} />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl flex items-center gap-2">
              <BriefcaseIcon className="h-6 text-secondary-700 dark:text-secondary-600" /> {resume.id ? 'Edit resume' : 'Add new resume'}
            </h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm opacity-50 font-semibold hover:underline" onClick={() => closeElement()} role="menuitem" tabIndex="-1">
                close
              </a>
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openDeleteModal(resume)} role="menuitem" tabIndex="-1">
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
                    value={resume.name}
                    onChange={handleChange}
                    maxLength={191}
                    required
                  />
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <label htmlFor="logo-url-form" className="input-label">
                    Logo {!resume.id && <span className="text-secondary-700">*</span>}
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
                  {resume.id > 0 && resume.logo && (
                    <>
                      <label htmlFor="style-form" className="input-label">
                        Current
                      </label>
                      <div className="mt-4 w-32 m-auto relative">
                        <SVG alt={resume.name} className={'w-32 fill-primary-700 dark:fill-primary-200'} src={`/uploads/${resume.logo}`} height={50} />
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
                    value={resume.startDate ? moment(resume.startDate).format('YYYY-MM-DD') : ''}
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
                    value={resume.endDate ? moment(resume.endDate).format('YYYY-MM-DD') : ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="description-form" className="input-label">
                    Description
                  </label>
                  <textarea name="description" id="description-form" rows={6} className="mt-1 input-field" value={resume.description} onChange={handleChange} />
                </div>
                <div className="col-span-6">
                  <label htmlFor="tags-form" className="input-label">
                    Tags {resume.tags.length}
                  </label>
                  <div className="input-field flex items-center gap-2 p-2">
                    {resume.tags?.map((tag) => (
                      <span key={`tag-${tag.id}`} className="text-xs rounded px-2 py-1 bg-secondary-800 text-primary-100">
                        {tag.name}
                      </span>
                    ))}
                    <input type="text" className="bg-transparent border-0 focus:border-0 py-0" placeholder="add new tag..." />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <AdminModal
          title="Delete resume"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete resume &quot;{resume.name}&quot;?</p>
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

export default AdminResumeIndex;
