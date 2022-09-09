import { TerminalIcon, ExclamationIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import SVG from 'react-inlinesvg';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import Table from "../../../components/admin/Table";
import mergeObj from "../../../utils/mergeObj";
import NaturalImage from "../../../components/NaturalImage";
import useStaleSWR from "../../../utils/staleSWR";
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

  const columns = [
    {
      name: "Name",
      key: "name",
      searchable: true,
      classNameTd: "font-bold"
    },
    {
      name: "Logo",
      key: "logo_d",
      className: "textcenter w-10",
      classNameTd: "text-center"
    },
    {
      name: "Percentage",
      key: "percentage_d",
      searchable: true,
      className: "textcenter",
      classNameTd: "text-center"
    },
    {
      name: "Type",
      key: "type",
      searchable: true
    },
    {
      name: "Updated",
      key: "updated",
      classNameTd: "w-44"
    }
  ]

  const newData = [];
  skills?.results.map(item => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.logo_d = (
      <>
        <div className="w-32 m-auto relative">
          <SVG title={item.name} alt={item.name} className={`inline w-auto fill-zinc-700 dark:fill-zinc-200`} src={`/images/svg-icons/${item.logo}`} height={50} />
        </div>
        <div className="small">{item.logo}</div>
      </>
    );
    obj.percentage_d = item.percentage + '%';
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper>
        <AdminWrapper.Header>
          <h1 className="text-2xl flex items-center gap-2"><TerminalIcon className="h-6 text-primary-700 dark:text-primary-600"/> Skills list</h1>
        </AdminWrapper.Header>
        <Table 
          columns={columns} 
          data={newData} 
          format={skillFormat} 
          editAction={openModal} 
          deleteAction={openModalDelete} 
          openAction={openModal}
          openActionLabel="Add new skill"
           />
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
              <div className="bg-accent-100 border border-accent-400 text-accent-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold"><ExclamationIcon className="inline-flex align-middle h-6 mr-4"/>Invalid Form! </strong>
                <span className="block sm:inline">Some required fields are missing.</span>
              </div>
            }
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-primary-700">*</span>
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
                  Logo <span className="text-primary-700">*</span>
                </label>
                <select 
                  name="logo" 
                  id="logo-type-form"
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
                  Percentage <span className="text-primary-700">*</span>
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
                  Type <span className="text-primary-700">*</span>
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