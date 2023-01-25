import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef } from 'react';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import mergeObj from '@/utils/mergeObj';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import * as cheerio from 'cheerio';
import List from '@/components/admin/List';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';

const AdminBookmarksIndex = ({ formRef, images }) => {
  const { mutate, data: bookmarks, error } = useStaleSWR('/api/portfolio/bookmarks');
  const { data: categories, error: categoriesError } = useStaleSWR('/api/admin/categories');
  const { data: session } = useSession();
  const [currentStatus, setCurrentStatus] = useState(null);

  const bookmarkFormat = {
    id: null,
    url: '',
    name: '',
    categoryId: 0,
    description: '',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [bookmark, setBookmark] = useState(bookmarkFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmitModal = async (e) => {
    e.preventDefault();
    setFormError(false);
    if (!isFormValid(bookmark)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(bookmark)) {
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
        const mergedData = mergeObj(bookmarkFormat, data);
        setBookmark(mergedData);
        closeModal();
      });
  };

  const isFormValid = (form) => {
    if (form.name == '' || form.categoryId <= 0 || form.title == '') {
      return false;
    }
    return true;
  };

  const onPrimaryButtonClick = () => {
    formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  const onPrimaryButtonClickDelete = async () => {
    const urlDelete = `/api/portfolio/bookmarks/${bookmark.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mutate();
    closeDeleteModal();
  };

  const openElement = (bookmark) => {
    setCurrentStatus(null);
    const openBookmark = mergeObj(bookmarkFormat, bookmark);
    setBookmark(openBookmark);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closeModal = () => {
    setCurrentStatus(null);
    setFormError(false);
    setFormSuccess(true);
  };

  const openDeleteModal = (bookmark) => {
    const openBookmark = mergeObj(bookmarkFormat, bookmark);
    setBookmark(openBookmark);
    setIsOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setBookmark(bookmarkFormat);
    setIsOpenDelete(false);
    setIsOpen(false);
  };

  const closeElement = () => {
    setBookmark(bookmarkFormat);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setBookmark({ ...bookmark, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const fetchUrlData = async (bookmark) => {
    setCurrentStatus('Fetching data...');
    const response = await axios.get(bookmark.url).catch(function (error) {
      // handle error
      console.log(error);
      setCurrentStatus(error.message);
    });
    if (response) {
      setCurrentStatus(null);
      const $ = cheerio.load(response.data);

      const titleText = $('title').first().text();
      const descriptionText =
        $('meta[name="description"]').length > 0
          ? $('meta[name="description"]').first().attr('content')
          : $('meta[property="og:description"]').first().attr('content');

      bookmark.name = titleText ? titleText : '';
      bookmark.description = descriptionText ? descriptionText : '';

      if (bookmark.description.length > 191) {
        const maxLength = 188;
        //trim the string to the maximum length
        var trimmedString = bookmark.description.substr(0, maxLength);
        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
        bookmark.description = trimmedString;
      }

      handleChange({ target: { name: 'name', value: bookmark.name } });
      handleChange({ target: { name: 'description', value: bookmark.description } });
    }
  };

  const columns = ['name', 'url', 'category_d'];

  const newData = [];
  bookmarks?.results.map((item) => {
    const obj = { ...item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d = item.category ? item.category.name : 'N/A';
    newData.push(obj);
  });

  const title = "Bookmarks";
  const single = "bookmark";

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={bookmarkFormat}
            openAction={openElement}
            editAction={openElement}
            activeId={bookmark.id}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2" onClick={() => closeElement()} role="menuitem" tabIndex="-1">
              <ChevronLeftIcon className='h-3'/> bookmarks
            </a>
            <h2 className="text-2xl flex items-center gap-2">
              {bookmark.id ? 'Edit bookmark' : 'Add new bookmark'}
            </h2>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-red-500 font-semibold hover:underline"
                onClick={() => openDeleteModal(bookmark)}
                role="menuitem"
                tabIndex="-1"
              >
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
                  <label htmlFor="category-form" className="input-label">
                    Category <span className="text-secondary-700">*</span>
                  </label>
                  <select name="categoryId" id="category-form" className="mt-1 input-field" onChange={handleChange} value={bookmark.categoryId} required>
                    <option value="">Select category</option>
                    {categories?.results
                      .filter((x) => x.type == 'BOOKMARK')
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-6">
                  <label htmlFor="url-form" className="input-label">
                    URL <span className="text-secondary-700">*</span>
                  </label>
                  <div className="flex gap-4 items-center">
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
                    <button type="button" onClick={() => fetchUrlData(bookmark)} className="button-success">
                      Fetch
                    </button>
                  </div>
                </div>
                {currentStatus && <p className="text-secondary-800 col-span-6">{currentStatus}</p>}
                <div className="col-span-6">
                  <label htmlFor="name-form" className="input-label">
                    Title <span className="text-secondary-700">*</span>
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
                    Description ({bookmark.description.length}/191)
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
          </div>
        </div>

        <AdminModal
          title="Delete bookmark"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
          onPrimaryButtonClick={onPrimaryButtonClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete app &quot;{bookmark.name}&quot;?</p>
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

export default AdminBookmarksIndex;
