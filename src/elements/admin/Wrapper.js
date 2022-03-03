import AdminSidebar from "./Sidebar";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { LogoutIcon } from "@heroicons/react/outline";

const AdminWrapper = ({ children }) => {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen grid grid-cols-12 antialiased bg-gray-50 text-gray-800">
      <AdminSidebar/>
      <div className="h-full col-span-10 bg-isabelline-100">
        <div className="flex items-center justify-end h-14 pr-10 border-b bg-green-sheen-100">
          <div className="h-7 w-7 inline-block mr-5 align-middle">
          <Image
            src={session.user.image}
            className="rounded-full"
            width={200}
            height={200}
            alt={`Logged as ${session.user.name}`}
            title={`Logged as ${session.user.name}`}
          />
          </div>
          <div className="inline-block">
            <a onClick={() => signOut()} title="logout" className="cursor-pointer focus:outline-none text-gray-500 hover:text-gray-900">
              <LogoutIcon className="inline-flex w-7" />
            </a>
          </div>
        </div>
        <div className="pt-4 px-10">
        {React.Children.map(children, child => {
            return React.cloneElement(child)   
         })}
        </div>
      </div>
    </div>
  )
}

export default AdminWrapper;