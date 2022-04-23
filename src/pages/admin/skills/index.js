import { TerminalIcon, ExclamationIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import SVG from 'react-inlinesvg';
import AdminModal from "../../../elements/admin/Modal";
import AdminWrapper from "../../../elements/admin/Wrapper";
import mergeObj from "../../../lib/mergeObj";
import NaturalImage from "../../../elements/NaturalImage";
import useStaleSWR from "../../../lib/staleSWR";
import moment from "moment";

const AdminSkillsIndex = ({ formRef, images }) => {
  const { data: skills, error } = useStaleSWR('/api/portfolio/skills');
  const { data: session } = useSession();

  const { mutate } = useSWRConfig();

  const skillFormat = {
    id: null,
    name: '',
    type: '',
    logo: '',
    percentage: 0
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false); 
  let [skill, setSkill] = useState(skillFormat);
  let [formError, setFormError] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();    
    setFormError(false);
    if (!isFormValid(skill)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(skill)) {
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
        'Content-Type': `application/json`
      }
    }).then(({ data }) => {
      mutate('/api/portfolio/skills');
      closeModal();
    });
  }

  const isFormValid = (form) => {
    if (
      form.name == ''
      || form.type == ''
      || form.percentage <= 0
      || form.percentage == ''
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
    const urlDelete = `/api/portfolio/skills/${skill.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    mutate('/api/portfolio/skills');
    closeModalDelete();
  }
  
  const openModal = (skill) => {
    const openSkill = mergeObj(skillFormat, skill);
    setSkill(openSkill);
    setIsOpen(true);
  }

  const closeModal = () => {
    setSkill(skillFormat);
    setIsOpen(false);
    setFormError(false);
  }
  
  const openModalDelete = (skill) => {
    const openSkill = mergeObj(skillFormat, skill);
    setSkill(openSkill);
    setIsOpenDelete(true);
  }

  const closeModalDelete = () => {
    setSkill(skillFormat);
    setIsOpenDelete(false);
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setSkill({ ...skill, [e.target.name]: e.target.files[0] });
    } else {
      setSkill({ ...skill, [e.target.name]: e.target.value });
    }
  }

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><TerminalIcon className="inline-flex align-text-bottom h-10 text-terra-cotta-500 "/> Skills list</h1>
          <div className="flex-none text-right">
            <button className="bg-terra-cotta-500 hover:bg-terra-cotta-600 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(skillFormat)}>
              <PlusIcon className="inline-flex align-text-bottom h-5 text-white  "/> Add new skill
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        Name
                      </th>
                      <th scope="col" className="textcenter">
                        Logo
                      </th>
                      <th scope="col" className="textcenter">
                        Percentage
                      </th>
                      <th scope="col">
                        Type
                      </th>
                      <th scope="col">
                        Last Updated
                      </th>
                      <th scope="col" className="relative">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills?.results.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.name}</strong>
                        </td>
                        <td className="text-center">
                          <div className="w-32 m-auto relative">
                            <NaturalImage
                              src={`/images/svg-icons/${item.logo}`}
                              size={100}
                              alt={item.name}
                              title={item.name}
                              />
                          </div>
                          <div className="small">{item.logo}</div>
                        </td>
                        <td className="text-center">
                          {item.percentage}%
                        </td>
                        <td>
                          {item.type}
                        </td>
                        <td className="w-44">
                          {moment(item.updatedAt || item.createdAt).from(moment())}
                        </td>
                        <td className="w-44 text-right font-medium">
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900" onClick={() => openModal(item)}>
                            <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                          </a>
                          <a href="#" className="text-green-sheen-600 hover:text-green-sheen-900 ml-4" onClick={() => openModalDelete(item)}>
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
          title={skill.id ? 'Edit skill' : 'Add new skill'}
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
              <div className="bg-terra-cotta-100 border border-terra-cotta-400 text-terra-cotta-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold"><ExclamationIcon className="inline-flex align-middle h-6 mr-4"/>Invalid Form! </strong>
                <span className="block sm:inline">Some required fields are missing.</span>
              </div>
            }
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-terra-cotta-600 text-xl">*</span>
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
                  required
                />
              </div>
              <div className="col-span-5 sm:col-span-2">
                <label htmlFor="logo-url-form" className="input-label">
                  Logo <span className="text-terra-cotta-600 text-xl">*</span>
                </label>
                <select 
                  name="logo" 
                  className="mt-1 input-field"
                  onChange={handleChange}
                  value={skill.logo}
                  required
                  >
                  <option value="">Select logo</option>
                  {images.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 relative">
                <label htmlFor="logo-url-form" className="input-label">
                  Preview
                </label>
                {skill.logo &&
                  <SVG title={skill.name} alt={skill.name} className={`inline-block w-14 fill-zinc-700 dark:fill-zinc-200`} src={`/images/svg-icons/${skill.logo}`} />
                }
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="percentage-form" className="input-label">
                  Percentage <span className="text-terra-cotta-600 text-xl">*</span>
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
                  Type <span className="text-terra-cotta-600 text-xl">*</span>
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
                  required
                />
              </div>
            </div>  
          </form>
        </AdminModal>
        <AdminModal
          title="Delete skill"
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
        >
          <p>Are you sure you want to delete skill &quot;{ skill.name }&quot;?</p>
        </AdminModal>
      </AdminWrapper>
    )
  }
  return null
}

export async function getStaticProps() {
  const dirRelativeToPublicFolder = 'images/svg-icons'
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);

  return {
    props: { formRef: createRef(), images: filenames }, // will be passed to the page component as props
  }
}

export default AdminSkillsIndex;