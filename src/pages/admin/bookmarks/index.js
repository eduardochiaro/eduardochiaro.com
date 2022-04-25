import { BookmarkIcon, ExclamationIcon, PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useState, createRef } from "react";
import { useSWRConfig } from "swr";
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from "../../../components/admin/Modal";
import AdminWrapper from "../../../components/admin/Wrapper";
import mergeObj from "../../../lib/mergeObj";
import useStaleSWR from "../../../lib/staleSWR";
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
    const openBookmark = mergeObj(bookmarkFormat, bookmark);
    setBookmark(openBookmark);
    setIsOpen(true);
  }

  const closeModal = () => {
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
    setCurrentStatus(null);
    if (response) {
      const $ = cheerio.load(response.data);
  
      const titleText = $('title').text();
      const descriptionText = $('meta[name="description"]').first().attr("content");
  
      bookmark.name = titleText ? titleText : '';
      bookmark.description = descriptionText ? descriptionText : '';
  
      handleChange({ target: { name: 'name', value: bookmark.name } });
      handleChange({ target: { name: 'description', value: bookmark.description } });
    }
  }

  if (session) {
    return (
      <AdminWrapper>
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl"><BookmarkIcon className="inline-flex align-text-bottom h-10 text-isabelline-800 "/> Bookmarks list</h1>
          <div className="flex-none text-right">
            <button className="bg-isabelline-700 hover:bg-isabelline-800 text-white font-bold py-2 px-4 mb-5 rounded" onClick={() => openModal(bookmarkFormat)}>
              <PlusIcon className="inline-flex align-text-bottom h-5 text-white  "/> Add new bookmark
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      Name
                    </th>
                    <th scope="col">
                      Url
                    </th>
                    <th scope="col">
                      Category
                    </th>
                    <th scope="col">
                      Updated
                    </th>
                    <th scope="col" className="relative">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookmarks?.results.map((item) => (
                    <tr key={item.id}>
                      <td><span className="hidden">{item.id}</span></td>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>
                        <span className="w-64 text-ellipsis overflow-hidden inline-block">
                        {item.url} 
                        </span>
                      </td>
                      <td>
                        {item.category.name}
                      </td>
                      <td className="w-44">
                        {moment(item.updatedAt || item.createdAt).from(moment())}
                      </td>
                      <td className="w-44 text-right font-medium">
                        <a href="#" className="text-isabelline-800 dark:text-isabelline-500 hover:underline" onClick={() => openModal(item)}>
                          <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                        </a>
                        <a href="#" className="text-isabelline-800 dark:text-isabelline-500 hover:underline ml-4" onClick={() => openModalDelete(item)}>
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
              <div className="bg-terra-cotta-100 border border-terra-cotta-400 text-terra-cotta-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold"><ExclamationIcon className="inline-flex align-middle h-6 mr-4"/>Invalid Form! </strong>
                <span className="block sm:inline">Some required fields are missing.</span>
              </div>
            }
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="category-form" className="input-label">
                  Category <span className="text-isabelline-700 text-xl">*</span>
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
                  URL <span className="text-isabelline-700 text-xl">*</span>
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
                  <button type="button" onClick={() => fetchUrlData(bookmark)} className="border border-transparent shadow-sm text-sm font-medium rounded-md transition-colors ease-out duration-200 text-isabelline-900 hover:text-isabelline-500 bg-isabelline-700 hover:bg-isabelline-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-isabelline-700 flex-none w-20 ml-4">Fetch</button>
                </div>
              </div>
              { currentStatus &&
                <p className="text-isabelline-800">{currentStatus}</p>
              }
              <div className="col-span-6">
                <label htmlFor="name-form" className="input-label">
                  Title <span className="text-isabelline-700 text-xl">*</span>
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
                  required
                />
              </div>
              <div className="col-span-6">
                <label htmlFor="description-form" className="input-label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description-form"
                  className="mt-1 input-field"
                  rows={5}
                  value={bookmark.description}
                  onChange={handleChange}
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