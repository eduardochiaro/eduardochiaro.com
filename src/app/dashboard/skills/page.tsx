import { Metadata } from 'next';
import SVG from '@/utils/svg';
import { Skill } from '@prisma/client';
import prisma from '@/utils/prisma';
import moment from 'moment';
import Button from '@/components/dashboard/Button';
import Link from 'next/link';
import Card from '@/components/frontend/Card';

export const metadata: Metadata = {
  title: 'Admin > Skills | Eduardo Chiaro',
};

export default async function SkillsDashboard() {
  const skills = await pullSkills();

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <Link href={'/dashboard/apps/new'} prefetch={false}>
          <Button className="text-sm">Add Skill</Button>
        </Link>
      </Card>
      {skills.length === 0 ? (
        <div>No skills available.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill: any) => (
            <div key={skill.id} className="border-primary-200 dark:border-primary-700 bg-primary-100 dark:bg-primary-800 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center">
                  <SVG
                    title={skill.name}
                    className="fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200 w-full"
                    src={`/images/svg-icons/${skill.logo}`}
                    height={50}
                  />
                </div>
                <div className="grow">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-primary-500 dark:text-primary-400 text-sm">type: {skill.type}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Link
                    prefetch={false}
                    href={`/dashboard/skills/${skill.id}`}
                    className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </Link>
                  |<button className="cursor-pointer text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </div>
              </div>

              <div className="mt-3">
                <div className="mb-1 flex justify-between text-sm">
                  <span>Proficiency</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="bg-primary-300 dark:bg-primary-700 h-2.5 w-full rounded-full">
                  <div className="bg-accent-600 dark:bg-accent-400 h-2.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>

              <div className="text-primary-500 dark:text-primary-400 mt-3 text-right text-xs">Updated {skill.updated}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const pullSkills = async () => {
  const data = await prisma.skill.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (data) {
    return data.map((skill: Skill) => ({
      ...skill,
      updated: moment(skill.updatedAt || skill.createdAt).fromNow(),
      category: skill.type,
    }));
  }

  return [];
};
