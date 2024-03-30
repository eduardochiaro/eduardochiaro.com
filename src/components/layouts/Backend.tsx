import AdminSidebar from '@/components/admin/Sidebar';
import React, { ReactElement } from 'react';

const BackendLayout = ({ children, isPageOpen }: { children: ReactElement | ReactElement[]; isPageOpen: boolean }) => {
  return (
    <div className="h-full w-full bg-primary-100 antialiased dark:bg-primary-800">
      <div className="flex w-full flex-grow">
        <AdminSidebar isPageOpen={isPageOpen} />
        {children}
      </div>
    </div>
  );
};

export default BackendLayout;
