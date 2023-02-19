import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import SVG from 'react-inlinesvg';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';

const AdminSkillsIndex = ({ formRef, images }) => {
  const { mutate, data: skills, error } = useStaleSWR('/api/portfolio/skills');
  const { data: session } = useSession();

  const skillFormat = {
    id: null,
    name: '',
    type: '',
    logo: '',
    percentage: 0,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [skill, setSkill] = useState(skillFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(skill)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(skill)) {
      if (key == 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: skill.id ? 'PUT' : 'POST',
      url: skill.id ? `/api/portfolio/skills/${skill.id}` : '/api/portfolio/skills/create',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        setFormError(true);
        setFormSuccess(false);
      })
      .then(({ data }) => {
        mutate();
        const mergedData = mergeObj(skillFormat, data);
        setSkill(mergedData);
        closeModal();
      });
  };

  const isFormValid = (form) => {
    if (form.name == '' || form.type == '' || form.percentage <= 0 || form.percentage == '' || (!form.id && !form.logo)) {
      return false;
    }
    return true;
  };

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/portfolio/skills/${skill.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mutate();
    closeElement();
  };

  const openElement = (skill) => {
    const openSkill = mergeObj(skillFormat, skill);
    setSkill(openSkill);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    setFormError(false);
    setFormSuccess(true);
  };

  const openDeleteModal = (skill) => {
    const openSkill = mergeObj(skillFormat, skill);
    setSkill(openSkill);
    setIsOpenDelete(true);
  };

  const closeElement = () => {
    mutate();
    closeModal();
    setSkill(skillFormat);
    setIsOpenDelete(false);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const columns = ['name', 'description', 'category_d'];

  const newData = [];
  skills?.results.map((item) => {
    const obj = { ...item };
    obj.category_d = obj.type;
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <SVG alt={item.name} className={'w-full fill-primary-700 dark:fill-primary-200'} src={`/images/svg-icons/${item.logo}`} height={50} />
    );
    obj.description = item.percentage + '%';
    newData.push(obj);
  });

  const title = 'Skills';
  const single = 'skill';

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={skillFormat}
            openAction={openElement}
            editAction={openElement}
            activeId={skill.id}
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
              <ChevronLeftIcon className="h-3" /> skills
            </a>
            <h2 className="text-2xl flex items-center gap-2">{skill.id ? 'Edit skill' : 'Add new skill'}</h2>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-red-500 font-semibold hover:underline" onClick={() => openDeleteModal(skill)} role="menuitem" tabIndex="-1">
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
                  <label htmlFor="name-form" className="input-label">
                    Title <span className="text-secondary-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name-form"
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                    className="mt-1 input-field"
                    value={skill.name}
                    onChange={handleChange}
                    maxLength={191}
                    required
                  />
                </div>
                <div className="col-span-5 sm:col-span-2">
                  <label htmlFor="logo-type-form" className="input-label">
                    Logo <span className="text-secondary-600">*</span>
                  </label>
                  <select name="logo" id="logo-type-form" className="mt-1 input-field" onChange={handleChange} value={skill.logo} required>
                    <option value="">Select logo</option>
                    {images.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1 relative">
                  <label htmlFor="logo-url-form" className="input-label">
                    Preview
                  </label>
                  {skill.logo && (
                    <SVG alt={skill.name} className={'inline-block w-14 fill-primary-700 dark:fill-primary-200'} src={`/images/svg-icons/${skill.logo}`} />
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="percentage-form" className="input-label">
                    Percentage <span className="text-secondary-600">*</span>
                  </label>
                  <input
                    type="range"
                    name="percentage"
                    id="percentage-form"
                    min="0"
                    max="100"
                    step="5"
                    className="mt-1 range-field"
                    value={skill.percentage}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm">(selected: {skill.percentage}%)</p>
                </div>
                <div className="col-span-6">
                  <label htmlFor="type-form" className="input-label">
                    Type <span className="text-secondary-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type-form"
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                    className="mt-1 input-field"
                    value={skill.type}
                    onChange={handleChange}
                    maxLength={191}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <AdminModal
          title="Delete skill"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete skill &quot;{skill.name}&quot;?</p>
        </AdminModal>
      </AdminWrapper>
    );
  }
  return null;
};

export async function getStaticProps() {
  const dirRelativeToPublicFolder = 'images/svg-icons';
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);

  return {
    props: { formRef: createRef(), images: filenames }, // will be passed to the page component as props
  };
}

export default AdminSkillsIndex;
