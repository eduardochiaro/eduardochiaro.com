import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import { cache } from 'react';
import WireContainer from '@/components/frontend/WireContainer';
import { Prisma, ResumeTag, Skill } from '@/utils/prismaClient';
import moment from 'moment';
import SVG from '@/utils/svg';
import Link from 'next/link';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import FrontendLayout from '@/components/layouts/Frontend';
import Logo from '@/components/icons/Logo';
import { ChevronRightIcon } from 'lucide-react';
import Card from '@/components/frontend/Card';
import { unstable_ViewTransition as ViewTransition } from 'react';

type ResumeProjectExpanded = Prisma.ResumeProjectGetPayload<{ include: { file: true } }>;
type ResumeExpanded = Prisma.ResumeGetPayload<{ include: { tags: true; projects: { include: { file: true } }; file: true } }> & {
  startYear?: string;
  endYear?: string;
};

export default async function Resume() {
  const resume = await getResume();
  const skills = await getSkills();

  const mappedData = resume
    ? resume.map((job: ResumeExpanded) => {
        return {
          ...job,
          startYear: moment(job.startDate).format('YYYY'),
          endYear: job.endDate ? moment(job.endDate).format('YYYY') : 'Now',
        };
      })
    : [];

  return (
    <FrontendLayout>
      <div className="mx-auto flex max-w-5xl flex-wrap">
        <WireContainer type="large" className="mx-auto w-full">
          <Card className="max-w-screen-xl md:min-w-96">
            <div className="mb-10 flex items-center justify-between">
              <div className="mt-3">
                <h2 className="font-header text-5xl font-semibold">Eduardo Chiaro</h2>
                <h3 className="font-header text-primary-700 dark:text-primary-400 text-3xl">Software Engineer</h3>
              </div>
              <ViewTransition name="logo">
                <Logo className="mr-7 w-20" />
              </ViewTransition>
            </div>
            <div className="flex flex-col items-start gap-10 md:min-w-96 md:flex-row">
              <div className="md:w-1/3 md:min-w-56">
                <h3 className="font-header mb-4 text-2xl font-semibold">Skills</h3>
                <ul className="flex flex-wrap gap-4 md:flex-col md:gap-1">
                  {skills.map((skill: Skill, index: number) => (
                    <li key={`skill-${index}`} className="group flex items-center gap-2 text-sm">
                      <>
                        {skill.name}
                        <span className="hidden">: {skill.percentage}%</span>
                      </>
                      <span className="w-full shrink border-b border-dashed"></span>
                      <SVG
                        title={skill.name}
                        className={'fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200 size-6 flex-none'}
                        src={`/images/svg-icons/${skill.logo}`}
                      />
                      <div className="w-1/2 flex-none">
                        <div className="bg-primary-200 dark:bg-primary-900 h-3 w-full rounded-xs">
                          <div
                            className="bg-primary-700 dark:bg-primary-400 group-hover:bg-accent-500 h-3 rounded-xs transition-colors duration-300"
                            style={{ width: skill.percentage + '%' }}
                          ></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 className="font-header mt-8 mb-4 text-2xl font-semibold">Connections</h3>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link
                      href="https://linkedin.com/in/eduardochiaro"
                      className="group inline-flex w-1/2 items-center justify-between gap-2 pr-2"
                      title="LinkedIn"
                    >
                      LinkedIn
                      <span className="grow border-b border-dashed"></span>
                      <LinkedInIcon className={'text-secondary-700 dark:text-secondary-200 size-4'} />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/eduardochiaro" className="group inline-flex w-1/2 items-center justify-between gap-2 pr-2" title="GitHub">
                      GitHub
                      <span className="grow border-b border-dashed"></span>
                      <GitHubIcon className={'text-secondary-700 dark:text-secondary-200 size-4'} />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-10 md:w-3/4">
                <h3 className="font-header mb-4 ml-16 text-2xl font-semibold">Work Experience</h3>
                <div className="flex flex-col">
                  {mappedData.map((job: ResumeExpanded, index: number) => (
                    <div className="group flex" key={`job-${index}`}>
                      <div className="relative mx-2 hidden w-4 flex-none md:mx-4 md:block md:w-8">
                        <div className="bg-secondary-500 z-10 mx-auto h-full w-0.5 group-first:mt-3 group-last:h-2 group-odd:bg-gradient-to-t"></div>
                        <span className="border-primary-800 bg-primary-200 dark:border-primary-500 absolute top-1 left-1/2 z-20 h-4 w-4 -translate-x-1/2 transform rounded-full border-2 group-first:top-0 group-first:h-6 group-first:w-6 group-first:bg-emerald-500 group-last:top-0 group-last:h-6 group-last:w-6 group-last:bg-red-500 dark:group-last:bg-red-700"></span>
                      </div>
                      <div key={`job-${index}`} className="mb-10 flex-1">
                        <h4 className="items-center gap-2 font-semibold md:flex">
                          <>{job.name}</>
                          <span className="px-2 md:px-0"> | </span>
                          {job.file && job.file.path ? (
                            <>
                              <SVG
                                title={job.company}
                                className={'fill-primary-700 dark:fill-primary-200 inline-block'}
                                src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.file.path}`}
                                height={20}
                              />
                              <span className="hidden">{job.company}</span>
                            </>
                          ) : (
                            <>{job.company}</>
                          )}
                        </h4>
                        <p className="text-primary-700 dark:text-primary-300 text-sm">
                          {moment(job.startDate).format('MMMM YYYY')} - {job.endDate ? moment(job.endDate).format('MMMM YYYY') : 'Now'}
                        </p>
                        {job.tags?.length > 0 && (
                          <ul className="mt-2 flex items-center gap-2">
                            {job.tags?.map((tag: ResumeTag) => (
                              <li key={`resume_tag_${tag.id}`} className="bg-secondary-800 text-primary-100 rounded-sm px-2 py-1 text-xs">
                                {tag.name}
                              </li>
                            ))}
                          </ul>
                        )}
                        {job.projects.length > 0 && (
                          <div className="ml-4">
                            <div className="mt-4 mr-8 flex items-start gap-2">
                              <ChevronRightIcon className="text-secondary-700 dark:text-secondary-200 mt-0.5 size-4" />
                              <p className="mb-2 text-sm">Projects</p>
                            </div>
                            <ul className="flex items-center gap-8">
                              {job.projects?.map((project: ResumeProjectExpanded, index: number) => (
                                <li key={`project-image-${index}`}>
                                  {(project.file && project.file.path && (
                                    <>
                                      <SVG
                                        title={project.name}
                                        className="fill-primary-700 dark:fill-primary-200"
                                        src={`${process.env.NEXT_PUBLIC_CDN_URL}/${project.file.path}`}
                                        height={20}
                                      />
                                      <p className="hidden">{project.name}</p>
                                    </>
                                  )) || <p className="mb-2 text-xl font-bold break-words">{project.name}</p>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </WireContainer>
      </div>
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Resume | Eduardo Chiaro',
};

const getResume = cache(async () => {
  return prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: {
        include: {
          file: true,
        },
      },
      file: true,
    },
  });
});

const getSkills = cache(async () => {
  return prisma.skill.findMany({
    orderBy: {
      name: 'asc',
    },
  });
});
