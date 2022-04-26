import AdminSidebar from "./Sidebar";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes";
import { LogoutIcon } from "@heroicons/react/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const AdminWrapper = ({ children }) => {
  const { data: session } = useSession();
  const [inUseTheme, setInUseTheme] = useState("dark");
  const { systemTheme , theme, setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme ;
    setInUseTheme(currentTheme);
  }, [theme, systemTheme])
  return (
    <div className="min-h-screen grid grid-cols-12 antialiased bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-600">
      <AdminSidebar/>
      <div className="h-full col-span-10">
        <div className="flex items-center justify-end h-14 pr-10 border-b">
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
            <a onClick={() => signOut()} title="logout" className="cursor-pointer focus:outline-none text-gray-500 hover:text-zinc-900">
              <LogoutIcon className="inline-flex w-7" />
            </a>
            { inUseTheme === "dark" ? 
              <SunIcon className="w-5 h-5 text-zinc-900 inline-block mx-4 border rounded-full bg-primary-500 " role="button" onClick={() => setTheme('light')} />
              :
              <MoonIcon className="w-5 h-5 text-primary-500 inline-block mx-4 border rounded-full bg-zinc-900" role="button" onClick={() => setTheme('dark')} />
            }
          </div>
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