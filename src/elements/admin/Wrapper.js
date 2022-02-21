import AdminSidebar from "./Sidebar";
import React from 'react'

const AdminWrapper = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-12 antialiased bg-gray-50 text-gray-800">
      <AdminSidebar/>
      <div className="h-full col-span-10 pt-4 px-10 bg-isabelline-100">
        {React.Children.map(children, child => {
            return React.cloneElement(child)   
         })}
      </div>
    </div>
  )
}

export default AdminWrapper;