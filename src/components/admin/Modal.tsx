'use client';

import React, { ReactElement } from 'react';
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
}: {
  children: ReactElement;
  title?: string;
  isOpen: boolean;
  closeModal: () => void;
  showButtons?: boolean;
  fullSize?: boolean;
  primaryButtonClass?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}) => {
  return (
    <Dialog open={isOpen} as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
      <div className="fixed inset-0 bg-primary-400 bg-opacity-50 backdrop-blur-sm backdrop-filter" />
      <Dialog.Panel className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className={`inline-block w-full ${
            fullSize ? 'max-w-4xl' : 'max-w-xl'
          } my-8 transform overflow-hidden rounded-2xl bg-primary-50 text-left align-middle text-primary-900 shadow-xl dark:bg-primary-800 dark:text-primary-100`}
        >
          <div className="mb-4 flex bg-primary-100 px-6 pb-4 pt-6 dark:bg-primary-900">
            <Dialog.Title as="h3" className="flex-1 text-4xl font-medium leading-6 ">
              {title}
            </Dialog.Title>
            <div className="flex-none">
              <a onClick={closeModal} className="cursor-pointer">
                <XMarkIcon className="w-8" />
              </a>
            </div>
          </div>
          <div className="mb-10 mt-2 px-6 ">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child);
            })}
          </div>
          {showButtons && (
            <div className="bg-primary-100 px-4 py-3 text-right sm:px-6 dark:bg-primary-900">
              <button onClick={onSecondaryButtonClick} type="button" className=" mr-10 focus:underline focus:outline-none">
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
