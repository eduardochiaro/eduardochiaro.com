import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState, createRef, useReducer } from 'react';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import AdminModal from '@/components/admin/Modal';
import AdminWrapper from '@/components/admin/Wrapper';
import useStaleSWR from '@/utils/staleSWR';
import moment from 'moment';
import List from '@/components/admin/List';
import { CheckIcon, ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Input, Select } from '@/components/form';
import { findInvalidElement, isFormValid } from '@/utils/formValidation';

function reducer(prev, next) {
  return { ...prev, ...next };
}

const tagFormat = {
  id: null,
  name: '',
};

const AdminTagsIndex = ({ formRef, images }) => {
  const { mutate, data: tags, error } = useStaleSWR('/api/admin/tags');
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [tag, updateTag] = useReducer(reducer, tagFormat);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError(false);

    if (!isFormValid(tag, ['name', 'type'])) {
      const listOfInvalidInputs = findInvalidElement(tag, ['name', 'type']);
      console.log(listOfInvalidInputs);
      setFormError(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(tag)) {
      formData.append(key, value);
    }

    //replace with axios
    axios({
      method: tag.id ? 'PUT' : 'POST',
      url: tag.id ? `/api/admin/tags/${tag.id}` : '/api/admin/tags/create',
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        reset();
        setFormError(true);
      })
      .then(({ data }) => {
        mutate();
        reset();
        updateTag(data);
        setFormSuccess(true);
      });
  };

  const onClickDelete = async () => {
    const urlDelete = `/api/admin/tags/${tag.id}`;
    await axios({
      url: urlDelete,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    mutate();
    closePage();
  };

  const reset = () => {
    setFormError(false);
    setFormSuccess(false);
  };

  const openElement = (tag) => {
    updateTag(tag);
    setIsOpen(true);
    setFormSuccess(false);
  };

  const closePage = () => {
    reset();
    setIsOpenDelete(false);
    setIsOpen(false);
  };

  const openDeleteModal = (tag) => {
    updateTag(tag);
    setIsOpenDelete(true);
  };

  const handleChange = (e) => {
    updateTag({ [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
  };

  const columns = ['name', 'type'];

  const newData = [];
  tags?.results.map((item) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.description = `used in ${item.jobs?.length} job(s)`;
    newData.push(obj);
  });

  const title = 'Tags';
  const single = 'tag';

  if (session) {
    return (
      <AdminWrapper isPageOpen={isOpen}>
        <div className={`h-full ${isOpen ? 'hidden' : 'grow'}`}>
          <List
            title={title}
            single={single}
            columns={columns}
            data={newData}
            format={tagFormat}
            openAction={openElement}
            editAction={openElement}
            activeId={tag.id}
          />
        </div>
        <div className={`bg-primary-50 dark:bg-primary-900 grow py-8 px-6 min-h-screen ${isOpen ? '' : 'hidden'}`}>
          <div className="flex items-center gap-8 justify-between">
            <a
              href="#"
              className="text-sm opacity-70 font-semibold hover:underline flex items-center gap-2"
              onClick={() => closePage()}
              role="menuitem"
              tabIndex="-1"
            >
              <ChevronLeftIcon className="h-3" /> tags
            </a>
            <h2 className="text-2xl flex items-center gap-2">{tag.id ? 'Edit tag' : 'Add new tag'}</h2>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-sm text-red-500 font-semibold hover:underline"
                onClick={() => openDeleteModal(tag)}
                role="menuitem"
                tabIndex="-1"
              >
                <TrashIcon className="inline-flex align-text-bottom h-4 mr-1" />
                Delete
              </a>
              <button onClick={onSubmit} type="button" className={'button-success'}>
                Save
              </button>
            </div>
          </div>

          <div className={'mt-8 mb-2 max-w-5xl mx-auto'}>
            <form ref={formRef} acceptCharset="UTF-8" method="POST" encType="multipart/form-data" onSubmit={onSubmit}>
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
                  <Input label="Title" name="name" value={tag.name} onChange={handleChange} required={true} />
                </div>
              </div>
            </form>
          </div>
        </div>

        <AdminModal
          title="Delete tag"
          isOpen={isOpenDelete}
          closeModal={() => setIsOpenDelete(false)}
          showButtons={true}
          onSecondaryButtonClick={() => setIsOpenDelete(false)}
          onPrimaryButtonClick={onClickDelete}
          primaryButtonLabel="Delete"
          primaryButtonClass="button-danger"
          fullSize={false}
        >
          <p>Are you sure you want to delete tag &quot;{tag.name}&quot;?</p>
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

export default AdminTagsIndex;
