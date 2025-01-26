import AdminSidebar from '@/components/admin/Sidebar';
import React, { ReactElement } from 'react';

const BackendLayout = ({ children, isPageOpen }: { children: ReactElement | ReactElement[]; isPageOpen: boolean }) => {
  return (
    <div className="bg-primary-100 dark:bg-primary-800 antialiased">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar isPageOpen={isPageOpen} />
        {children}
      </div>
    </div>
  );
};

export default BackendLayout;
