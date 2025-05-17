'use server';

import { PlusIcon, SearchIcon, Tag, TagIcon } from 'lucide-react';
import Card from '@/components/frontend/Card';
import { Prisma } from '@/utils/prismaClient';
import { addTag, getTags } from '@/actions/resumeTags';
import TagEdit from '@/components/dashboard/TagEdit';
import { redirect } from 'next/navigation';
import { Input } from '@/components/form';

type ResumeTagWithCountJobs = Prisma.ResumeTagGetPayload<{
  include: {
    _count: {
      select: {
        jobs: true;
      };
    };
  };
}>;
async function saveData(formData: FormData) {
  'use server';

  addTag(formData.get('tagName') as string);
  redirect('/dashboard/tags');
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Tag Management</h1>
        <p className="text-gray-600">Organize your content with custom tags</p>
      </header>

      <div className="mb-8 flex flex-wrap gap-6">
        <Card className="min-w-[300px] flex-1">
          <form action={saveData}>
            <h2 className="mb-4 flex items-center text-xl font-semibold">
              <TagIcon className="mr-2 h-5 w-5 text-blue-500" />
              Add New Tag
            </h2>
            <div className="space-y-4">
              <Input label="Tag Name" name="tagName" type="text" value={''} placeholder="Enter tag name" />

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Tag
              </button>
            </div>
          </form>
        </Card>

        <Card className="min-w-[400px] flex-[2]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center text-xl font-semibold">
              <TagIcon className="mr-2 h-5 w-5 text-blue-500" />
              Manage Tags
            </h2>
          </div>

          {tags.length === 0 ? (
            <div className="py-10 text-center text-gray-500">{'No tags found. Add some tags to get started!'}</div>
          ) : (
            <div className="max-h-fit space-y-2 overflow-y-auto pr-2">
              {tags.map((tag: ResumeTagWithCountJobs) => (
                <TagEdit key={tag.id} tag={tag} />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
