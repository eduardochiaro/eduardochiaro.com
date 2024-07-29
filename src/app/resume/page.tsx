import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import { Fragment, cache } from 'react';
import WireContainer from '@/components/WireContainer';
import { Prisma, ResumeTag, Skill } from '@prisma/client';
import moment from 'moment';
import SVG from '@/utils/svg';
import Link from 'next/link';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import FrontendLayout from '@/components/layouts/Frontend';
import Logo from '@/components/icons/Logo';

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
          <div className="card max-w-screen-xl md:min-w-96">
            <div className="mb-10 flex items-center justify-between">
              <div className="ml-10">
                <h2 className="font-header text-5xl font-semibold">eduardo</h2>
                <h2 className="font-header text-5xl font-semibold">chiaro</h2>
              </div>
              <Logo className="mr-7 w-20" />
            </div>
            <div className="flex flex-col items-start gap-10 md:min-w-96 md:flex-row">
              <div className="md:w-1/3 md:min-w-56 md:text-right">
                <h3 className="mb-4 font-header text-2xl font-semibold">Skills</h3>
                <ul className="flex flex-wrap gap-4 md:flex-col md:gap-1">
                  {skills.map((skill: Skill, index: number) => (
                    <li key={`skill-${index}`} className="flex items-center justify-end gap-2">
                      {skill.name}
                      <SVG
                        title={skill.name}
                        className={'size-6 flex-none fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200'}
                        src={`/images/svg-icons/${skill.logo}`}
                      />
                    </li>
                  ))}
                </ul>
                <h3 className="mb-4 mt-8 font-header text-2xl font-semibold">Links</h3>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link href="https://linkedin.com/in/eduardochiaro" className="group inline-flex items-center justify-end gap-2" title="LinkedIn">
                      LinkedIn
                      <LinkedInIcon className={'size-5 text-secondary-50'} />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/eduardochiaro" className="group inline-flex items-center justify-end gap-2" title="GitHub">
                      GitHub
                      <GitHubIcon className={'size-5 text-secondary-50'} />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mb-10 md:w-3/4">
                <h3 className="mb-4 ml-16 font-header text-2xl font-semibold">Work Experience</h3>
                <div className="flex flex-col">
                  {mappedData.map((job: ResumeExpanded, index: number) => (
                    <div className="group flex" key={`job-${index}`}>
                      <div className="relative mx-2 hidden w-4 flex-none md:mx-4 md:block md:w-8">
                        <div className="z-10 mx-auto h-full w-0.5 bg-secondary-500 group-first:mt-3 group-last:h-2 group-odd:bg-gradient-to-t"></div>
                        <span className="absolute left-1/2 top-1 z-20 h-4 w-4 -translate-x-1/2 transform rounded-full border-2 border-primary-800 bg-primary-200 group-first:top-0 group-first:h-6 group-first:w-6 group-first:bg-emerald-500 group-last:top-0 group-last:h-6 group-last:w-6 group-last:bg-red-500 dark:border-primary-500 dark:group-last:bg-red-700"></span>
                      </div>
                      <div key={`job-${index}`} className="mb-10 flex-1">
                        <h4 className="items-center gap-2 font-semibold md:flex">
                          <>{job.name}</>
                          <span className="px-2 md:px-0">|</span>
                          {job.file && job.file.path ? (
                            <SVG
                              title={job.company}
                              className={'inline-block fill-primary-700 dark:fill-primary-200'}
                              src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.file.path}`}
                              height={20}
                            />
                          ) : (
                            <>{job.company}</>
                          )}
                        </h4>
                        <p className="text-primary-500">
                          {moment(job.startDate).format('MMMM YYYY')} - {job.endDate ? moment(job.endDate).format('MMMM YYYY') : 'Now'}
                        </p>
                        {job.tags?.length > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            {job.tags?.map((tag: ResumeTag) => (
                              <span key={`resume_tag_${tag.id}`} className="rounded bg-secondary-800 px-2 py-1 text-xs text-primary-100">
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                        {job.projects.length > 0 && (
                          <div className="mx-8 mt-4 border-l-2 pl-2">
                            <h5 className="mb-2 text-sm">I did projects for...</h5>
                            <div className="flex items-center gap-8">
                              {job.projects?.map((project: ResumeProjectExpanded, index: number) => (
                                <Fragment key={`project-image-${index}`}>
                                  {(project.file && project.file.path && (
                                    <SVG
                                      key={`resume_project_${project.id}`}
                                      title={project.name}
                                      className="fill-primary-700 dark:fill-primary-200"
                                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/${project.file.path}`}
                                      height={20}
                                    />
                                  )) || (
                                    <h6 key={`resume_project_${project.id}`} className="mb-2 break-words text-xl font-bold">
                                      {project.name}
                                    </h6>
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
      percentage: 'desc',
    },
  });
});
