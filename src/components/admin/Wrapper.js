import AdminSidebar from "./Sidebar";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import { LogoutIcon } from "@heroicons/react/outline";
import ThemeIcon from "../ThemeIcon";
import React from "react";

const AdminWrapper = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen grid grid-cols-12 antialiased bg-zinc-50 dark:bg-zinc-800">
      <AdminSidebar/>
      <div className="h-full col-span-10">
        <div className="flex items-center justify-end h-14 pr-10 bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
          <div className="h-7 w-7 inline-block mr-5 align-middle">
            <Image
              src={session.user.image}
              className="rounded-full border border-zinc-400 dark:border-zinc-600"
              width={200}
              height={200}
              alt={`Logged as ${session.user.name}`}
              title={`Logged as ${session.user.name}`}
            />
          </div>
          <div className="inline-block mr-4">
            <a onClick={() => signOut()} title="logout" className="cursor-pointer focus:outline-none">
              <LogoutIcon className="inline-flex h-5" />
            </a>
          </div>
          <ThemeIcon />
        </div>
        <div className="pt-4 pb-10 px-10">
        {React.Children.map(children, child => {
            return React.cloneElement(child)   
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminWrapper;