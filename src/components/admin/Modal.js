import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';

const AdminModal = ({
  children,
  title = '',
  isOpen,
  closeModal,
  showButtons = false,
  fullSize = true,
  primaryButtonClass = 'button-success',
  primaryButtonLabel = 'Save',
  secondaryButtonLabel = 'Cancel',
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}) => {
  return (
    <Dialog open={isOpen} as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
      <div className="fixed inset-0 bg-zinc-400 bg-opacity-50 backdrop-filter backdrop-blur-sm" />
      <Dialog.Panel className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className={`inline-block w-full ${
            fullSize ? 'max-w-4xl' : 'max-w-xl'
          } my-8 overflow-hidden text-left align-middle transform bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xl rounded-2xl`}
        >
          <div className="flex px-6 pt-6 pb-4 mb-4 bg-zinc-100 dark:bg-zinc-900">
            <Dialog.Title as="h3" className="flex-1 text-4xl leading-6 font-medium ">
              {title}
            </Dialog.Title>
            <div className="flex-none">
              <a onClick={closeModal} className="cursor-pointer">
                <XMarkIcon className="w-8" />
              </a>
            </div>
          </div>
          <div className="mt-2 px-6 mb-10 ">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child);
            })}
          </div>
          {showButtons && (
            <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 text-right sm:px-6">
              <button onClick={onSecondaryButtonClick} type="button" className=" focus:outline-none focus:underline mr-10">
                {secondaryButtonLabel}
              </button>
              <button onClick={onPrimaryButtonClick} type="button" className={primaryButtonClass}>
                {primaryButtonLabel}
              </button>
            </div>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AdminModal;
