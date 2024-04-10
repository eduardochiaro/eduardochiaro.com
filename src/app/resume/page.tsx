import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import ResumeComponent from '@/components/frontend/Resume';
import getMenuLinks from '@/utils/getMenuLinks';
import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import styles from '@/styles/Resume.module.scss';
import { Fragment, cache } from 'react';
import WireContainer from '@/components/WireContainer';
import { Prisma, ResumeTag, Skill } from '@prisma/client';
import moment from 'moment';
import SVG from '@/utils/svg';
import Link from 'next/link';
import LinkedInIcon from '@/components/icons/Linkedin';
import LinkedIn from '../../components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';

type ResumeProjectExpanded = Prisma.ResumeProjectGetPayload<{ include: { file: true } }>;
type ResumeExpanded = Prisma.ResumeGetPayload<{ include: { tags: true; projects: { include: { file: true } }; file: true } }> & {
  startYear?: string;
  endYear?: string;
};

export default async function Resume() {
  const resume = await getResume();
  const skills = await getSkills();
  const menuLinks = await getMenuLinks();

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
    <div className="flex min-h-screen flex-col justify-between">
      <Header data={menuLinks} />
      <WireContainer type="large" className="mx-auto">
        <div className="min-w-96 max-w-screen-lg rounded-xl bg-primary-50 p-6 font-mono shadow-lg dark:bg-primary-950">
          <div className="mb-10">
            <h2 className="font-header text-5xl font-semibold">eduardo</h2>
            <h2 className="font-header text-5xl font-semibold">chiaro</h2>
          </div>
          <div className="flex min-w-96 items-start gap-10">
            <div className="w-1/4 min-w-56 text-right">
              <h3 className="mb-4 font-header text-2xl font-semibold">Skills</h3>
              <ul className="flex flex-col gap-1">
                {skills.map((skill: Skill, index: number) => (
                  <li key={`skill-${index}`} className="flex items-center justify-end gap-2">
                    {skill.name}
                    <SVG
                      title={skill.name}
                      className={'size-8 flex-none fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200'}
                      src={`/images/svg-icons/${skill.logo}`}
                    />
                  </li>
                ))}
              </ul>
              <h3 className="mb-4 mt-8 font-header text-2xl font-semibold">Links</h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link href="https://linkedin.com/in/eduardochiaro" className="group inline-flex items-center justify-end gap-2" title="LinkedIn">
                    LinkedIn
                    <div className="rounded-full bg-secondary-700 p-0.5">
                      <LinkedInIcon className={'size-4 text-secondary-50'} />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com/in/eduardochiaro" className="group inline-flex items-center justify-end gap-2" title="LinkedIn">
                    GitHub
                    <div className="rounded-full bg-secondary-700 p-0.5">
                      <GitHubIcon className={'size-4 text-secondary-50'} />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-10 w-3/4">
              <h3 className="mb-4 font-header text-2xl font-semibold">Work Experience</h3>
              <div className="flex flex-col gap-10">
                {mappedData.map((job: ResumeExpanded, index: number) => (
                  <div key={`job-${index}`} className="">
                    <h4 className="flex items-center gap-2 font-semibold">
                      <>{job.name}</>
                      <span>|</span>
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
                      <div className="mt-2 flex items-center gap-4">
                        {job.tags?.map((tag: ResumeTag) => (
                          <span key={`resume_tag_${tag.id}`} className="rounded bg-secondary-800 px-2 py-1 text-xs text-primary-100">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {job.projects.length > 0 && (
                      <>
                        <h5 className="text-md my-2 ">Projects</h5>
                        <div className="flex items-center gap-8">
                          {job.projects?.map((project: ResumeProjectExpanded, index: number) => (
                            <Fragment key={`project-image-${index}`}>
                              {(project.file && project.file.path && (
                                <SVG
                                  key={`resume_project_${project.id}`}
                                  title={project.name}
                                  className="fill-primary-700 dark:fill-primary-200"
                                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/${project.file.path}`}
                                  height={15}
                                />
                              )) || (
                                <h6 key={`resume_project_${project.id}`} className="mb-2 break-words text-xl font-bold">
                                  {project.name}
                                </h6>
                              )}
                            </Fragment>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WireContainer>
      <Footer />
    </div>
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
