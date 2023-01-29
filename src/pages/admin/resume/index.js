import { useSession } from 'next-auth/react';
import { useState, createRef, useRef, useEffect } from 'react';
import axios from 'axios';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import mergeObj from '@/utils/mergeObj';
import SVG from 'react-inlinesvg';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';
import pluck from '@/utils/pluck';
import { Input } from "@/components/form";

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
  const inputSearchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      setOpenMenu(false);
      setSearchResults([]);
      if (searchTerm.length >= 3) {
        const res = await fetch(`/api/admin/resume/tags?search=${searchTerm}`);
        const tagSearch = await res.json();
        const currentTags = pluck(resume.tags, 'id');
        const tags = tagSearch.results.length > 0 ? tagSearch.results.filter((x) => !currentTags.includes(x.id)) : [];
        if (tags.length > 0) {
          setOpenMenu(true);
          setSearchResults(tags);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
    closeElement();
  };

  const openElement = (resume) => {
    const openResume = { ...resumeFormat, ...resume };
    setResume(openResume);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    inputFileRef.current.value = '';
    inputSearchRef.current.value = '';
    setFormError(false);
    setFormSuccess(false);
    setOpenMenu(false);
    setSearchResults([]);
  };

  const openDeleteModal = (resume) => {
    const openResume = mergeObj(resumeFormat, resume);
    setResume(openResume);
    setIsOpenDelete(true);
  };

  const closeElement = () => {
    mutate();
    closeModal();
    setResume(resumeFormat);
    setIsOpenDelete(false);
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

  const title = 'Resume';
  const single = 'role';

  const addTag = (tag) => {
    setOpenMenu(false);
    setSearchResults([]);
    inputSearchRef.current.value = '';

    resume.tags.push({ ...tag, new: true });
    setResume({ ...resume });
  };

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={resumeFormat}
            openAction={openElement}
            editAction={openElement}
            activeId={resume.id}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2"
              onClick={() => closeElement()}
              role="menuitem"
              tabIndex="-1"
            >
              <ChevronLeftIcon className="h-3" /> resume
            </a>
            <h2 className="text-2xl flex items-center gap-2">{resume.id ? 'Edit role' : 'Add new role'}</h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openDeleteModal(resume)} role="menuitem" tabIndex="-1">
                <TrashIcon className="inline-flex align-text-bottom h-4 mr-1" />
                Delete
              </a>
              <button onClick={onPrimaryButtonClick} type="button" className={'button-success'}>
                Save
              </button>
            </div>
          </div>
          <div className={'mt-8 mb-2 max-w-5xl mx-auto'}>
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
                  <Input label="Title" name="name" value={resume.name} onChange={handleChange} required={true} />
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
                  <div className="input-field flex flex-wrap items-center gap-2 p-2 relative">
                    {resume.tags?.map((tag) => (
                      <span key={`tag-${tag.id}`} className={`text-xs rounded px-2 py-1 text-primary-100 ${tag.new ? 'bg-emerald-700' : 'bg-secondary-800'}`}>
                        {tag.name}
                      </span>
                    ))}
                    <Menu as="div" className="relative grow inline-block text-left">
                      <input
                        ref={inputSearchRef}
                        type="text"
                        autoComplete="off"
                        className="w-full bg-transparent border-0 py-0 focus:ring-0 min-w-fit"
                        placeholder="add new tag..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {openMenu && (
                        <Menu.Items static className="absolute left-0 top-8 w-56 divide-y divide-primary-500 box-card">
                          {searchResults.map((tag, key) => (
                            <div className="px-1 py-1" key={key}>
                              <Menu.Item>
                                {({ active }) => (
                                  <button className={`flex w-full p-2 ${active && 'bg-blue-500'}`} onClick={() => addTag(tag)}>
                                    {tag.name}
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          ))}
                        </Menu.Items>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="col-span-6">
                  <h3 className="text-lg font-bold border-b border-primary-700 pb-2 mb-5">Projects</h3>
                  { resume.projects.map(project => (
                    <div className="flex items-center gap-4 h-14 px-4">
                      <div className="w-48">
                        <SVG alt={project.name} className={' fill-primary-700 dark:fill-primary-200'} src={`/uploads/${project.logo}`} height={30} />
                      </div>
                      <span>{project.name}</span>
                    </div>
                  )) }
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
