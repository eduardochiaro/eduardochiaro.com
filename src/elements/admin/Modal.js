import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from "react";

const AdminModal = ({ 
  children, 
  title = '', 
  isOpen, 
  closeModal, 
  showButtons = false,
  primaryButtonClass = 'button-success',
  primaryButtonLabel = 'Save',
  secondaryButtonLabel = 'Cancel',
  onPrimaryButtonClick,
  onSecondaryButtonClick,  
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex px-6 pt-6 pb-4 mb-4 bg-gray-100">
                <Dialog.Title as="h3" className="flex-1 text-4xl leading-6 font-medium text-independence-900">
                  {title}
                </Dialog.Title>
                <div className="flex-none">
                  <a onClick={closeModal} className="cursor-pointer"><XIcon className="w-8"/></a>
                </div>
              </div>
              <div className="mt-2 px-6 mb-10">
                {React.Children.map(children, child => {
                    return React.cloneElement(child)   
                })}
              </div>
              {showButtons && (
                <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                  <button 
                    onClick={onSecondaryButtonClick}
                    type="button"
                    className='text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 mr-10'
                  >{secondaryButtonLabel}</button>
                  <button
                    onClick={onPrimaryButtonClick}
                    type="button"
                    className={primaryButtonClass}
                  >
                    {primaryButtonLabel}
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AdminModal;