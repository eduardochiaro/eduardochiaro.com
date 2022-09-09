import { BookmarkIcon, ExclamationIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import Table from "../../../components/admin/Table";
import mergeObj from "../../../utils/mergeObj";
import useStaleSWR from "../../../utils/staleSWR";
import moment from "moment";
import * as cheerio from 'cheerio';

const AdminBookmarksIndex = ({ formRef, images }) => {
  const { data: bookmarks, error } = useStaleSWR('/api/portfolio/bookmarks');
  const { data: categories, error: categoriesError } = useStaleSWR('/api/admin/categories');
  const { data: session } = useSession();
  const [currentStatus, setCurrentStatus] = useState(null);

  const { mutate } = useSWRConfig();

  const bookmarkFormat = {
    id: null,
    url: '',
    name: '',
    categoryId: 0,
    description: '',
  };

  let [isOpen, setIsOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false); 
  let [bookmark, setBookmark] = useState(bookmarkFormat);
  let [formError, setFormError] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();    
    setFormError(false);
    if (!isFormValid(bookmark)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (let [key, value] of Object.entries(bookmark)) {
      if (key == 'logo') {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }

    //replace with axios
    axios({
      method: bookmark.id ? 'PUT' : 'POST',
      url: bookmark.id ? `/api/portfolio/bookmarks/${bookmark.id}` : '/api/portfolio/bookmarks/create',
      data: formData,
      headers: {
        'Content-Type': `application/json`
      }
    }).then(({ data }) => {
      mutate('/api/portfolio/bookmarks');
      closeModal();
    });
  }

  const isFormValid = (form) => {
    if (
      form.name == ''
      || form.categoryId <= 0
      || form.title == ''
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
    const urlDelete = `/api/portfolio/bookmarks/${bookmark.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    mutate('/api/portfolio/bookmarks');
    closeModalDelete();
  }
  
  const openModal = (bookmark) => {
    setCurrentStatus(null);
    const openBookmark = mergeObj(bookmarkFormat, bookmark);
    setBookmark(openBookmark);
    setIsOpen(true);
  }

  const closeModal = () => {
    setCurrentStatus(null);
    setBookmark(bookmarkFormat);
    setIsOpen(false);
    setFormError(false);
  }
  
  const openModalDelete = (bookmark) => {
    const openBookmark = mergeObj(bookmarkFormat, bookmark);
    setBookmark(openBookmark);
    setIsOpenDelete(true);
  }

  const closeModalDelete = () => {
    setBookmark(bookmarkFormat);
    setIsOpenDelete(false);
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setBookmark({ ...bookmark, [e.target.name]: e.target.files[0] });
    } else {
      setBookmark({ ...bookmark, [e.target.name]: e.target.value });
    }
  }

  const fetchUrlData = async (bookmark) => {
    setCurrentStatus("Fetching data...");
    const response = await axios.get(bookmark.url)
      .catch(function (error) {
        // handle error
        console.log(error);
        setCurrentStatus(error.message);
      });
    if (response) {
      setCurrentStatus(null);
      const $ = cheerio.load(response.data);
  
      const titleText = $('title').text();
      const descriptionText = $('meta[name="description"]').length > 0 ? $('meta[name="description"]').first().attr("content") : $('meta[property="og:description"]').first().attr("content");
      
      bookmark.name = titleText ? titleText : '';
      bookmark.description = descriptionText ? descriptionText : '';
  
      handleChange({ target: { name: 'name', value: bookmark.name } });
      handleChange({ target: { name: 'description', value: bookmark.description } });
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
      name: "Url",
      key: "url",
      searchable: true
    },
    {
      name: "Category",
      key: "category_d",
      searchable: true
    },
    {
      name: "Updated",
      key: "updated",
      classNameTd: "w-44"
    }
  ]

  const newData = [];
  bookmarks?.results.map(item => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).from(moment());
    obj.category_d = item.category ? item.category.name : 'N/A';
    newData.push(obj);
  });

  if (session) {
    return (
      <AdminWrapper>
        <AdminWrapper.Header>
          <h1 className="text-2xl flex items-center gap-2"><BookmarkIcon className="h-6 text-primary-700 dark:text-primary-600"/> Bookmarks list</h1>
        </AdminWrapper.Header>
        <Table 
          columns={columns} 
          data={newData} 
          format={bookmarkFormat} 
          editAction={openModal} 
          deleteAction={openModalDelete} 
          openAction={openModal}
          openActionLabel="Add new bookmark"
           />
        <AdminModal 
          title={bookmark.id ? 'Edit bookmark' : 'Add new bookmark'}
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
                <label htmlFor="category-form" className="input-label">
                  Category <span className="text-primary-700">*</span>
                </label>
                <select 
                  name="categoryId" 
                  id="category-form"
                  className="mt-1 input-field"
                  onChange={handleChange}
                  value={bookmark.categoryId}
                  required
                  >
                  <option value="">Select category</option>
                  {categories?.results.filter(x => x.type == "BOOKMARK").map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label htmlFor="url-form" className="input-label">
                  URL <span className="text-primary-700">*</span>
                </label>
                <div className="flex">
                  <input
                    type="url"
                    name="url"
                    id="url-form"
                    autoComplete="off"
                    data-lpignore="true" 
                    data-form-type="other"
                    className="mt-1 input-field w-5/6"
                    value={bookmark.url}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" onClick={() => fetchUrlData(bookmark)} className="button-success ml-4">Fetch</button>
                </div>
              </div>
              { currentStatus &&
                <p className="text-primary-800">{currentStatus}</p>
              }
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
                  value={bookmark.name}
                  onChange={handleChange}
                  maxLength={191}
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="description-form" className="input-label">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description-form"
                  autoComplete="off"
                  data-lpignore="true" 
                  data-form-type="other"
                  className="mt-1 input-field"
                  value={bookmark.description}
                  onChange={handleChange}
                  maxLength={191}
                />
              </div>
            </div>  
          </form>
        </AdminModal>
        <AdminModal
          title="Delete bookmark"
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          showButtons={true}
          onSecondaryButtonClick={closeModalDelete}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
        >
          <p>Are you sure you want to delete bookmark &quot;{ bookmark.name }&quot;?</p>
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

export default AdminBookmarksIndex;