'use client';

import Link from 'next/link';
import React from 'react';

export type TableRowProps = {
  trClasses: string;
  tdClasses: string;
  rowData: any;
  useCheckboxes: boolean;
  checkbox: React.ReactElement;
};

export default function ActionColumn({ editUrl, deleteUrl }: { editUrl: string; deleteUrl: string }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Link prefetch={false} href={editUrl} className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        Edit
      </Link>
      |
      <Link prefetch={false} href={deleteUrl} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
        Delete
      </Link>
    </div>
  );
}
