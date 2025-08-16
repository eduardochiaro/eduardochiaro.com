'use client';
import { deleteTag, updateTag } from '@/actions/resumeTags';
import { Prisma } from '@/utils/prismaClient';
import { redirect } from 'next/navigation';
import React from 'react';

type ResumeTagWithCountJobs = Prisma.ResumeTagGetPayload<{
  include: {
    _count: {
      select: {
        jobs: true;
      };
    };
  };
}>;

export default function TagEdit({ tag }: { tag: ResumeTagWithCountJobs }) {
  const [editingTag, setEditingTag] = React.useState<ResumeTagWithCountJobs | null>(null);

  const handleUpdateTag = async () => {
    if (editingTag) {
      updateTag(editingTag.id, editingTag.name).then(() => {
        setEditingTag(null);
        redirect('/dashboard/tags');
      });
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      // Call your delete function here
      await deleteTag(tagId);
      redirect('/dashboard/tags');
    }
  };

  return (
    <div
      key={tag.id}
      className="group bg-primary-200 hover:bg-primary-100 dark:bg-primary-700 dark:hover:bg-primary-600 flex items-center justify-between rounded-lg p-3"
    >
      {editingTag?.id === tag.id ? (
        <div className="flex flex-1 items-center space-x-4">
          <input
            type="text"
            value={editingTag.name}
            onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
            className="flex-1 rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button onClick={handleUpdateTag} className="cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
            Save
          </button>
          <button
            onClick={() => setEditingTag(null)}
            className="text-primary-500 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <span className="font-medium">{tag.name}</span>
            <span className="bg-primary-300 text-primary-700 ml-2 rounded-full px-2 py-0.5 text-xs">
              {tag._count.jobs} {tag._count.jobs === 1 ? 'job' : 'jobs'}
            </span>
          </div>
          <div className="flex gap-2 space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setEditingTag(tag)}
              className="text-primary-500 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTag(tag.id)}
              className="cursor-pointer text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
