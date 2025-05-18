'use client';

import SVG from 'react-inlinesvg';
import moment from 'moment';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { Resume, ResumeProject, ResumeTag } from '@prisma/client';

export default function ResumeComponent({ data }: { data: any[] }) {
  const mappedData = data
    ? data.map((job: Resume) => {
        return {
          ...job,
          startYear: moment(job.startDate).format('YYYY'),
          endYear: job.endDate ? moment(job.endDate).format('YYYY') : 'Now',
        };
      })
    : [];
  return (
    <section className={'mt-10 px-4 lg:px-0'}>
      <div className="mx-auto max-w-5xl">
        <h1 className="h-10 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">Resume</h1>
        <div className="mx-auto mt-5">
          {mappedData.map((job: any, index: number) => (
            <div className="group" key={`job-image-${index}`}>
              <div className="hidden group-first:md:flex">
                <div className="flex-1"></div>
                <div className="relative mx-2 h-10 w-4 flex-none md:mx-4 md:w-8">
                  <div className="z-10 mx-auto h-full w-0.5 bg-secondary-500"></div>
                  <span className="absolute left-1/2 top-0 z-20 hidden h-5 w-5 -translate-x-1/2 transform rounded-full bg-emerald-500 ring-2 ring-primary-100 group-first:block dark:ring-primary-800"></span>
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="relative my-4 hidden w-full flex-none text-center font-mono text-xl md:text-2xl group-first:md:block">Today</div>
              <div className="flex">
                <div className="hidden flex-1 text-right font-mono group-odd:hidden md:block md:w-36"></div>
                <div className="relative mx-2 hidden w-4 flex-none group-odd:hidden md:mx-4 md:block md:w-8">
                  <div className="z-10 mx-auto h-full w-0.5 bg-secondary-500"></div>
                  <span className="absolute left-1/2 top-12 z-20 h-3 w-3 -translate-x-1/2 transform rounded-full bg-blue-500 ring-2 ring-primary-100 dark:ring-primary-800"></span>
                </div>
                <div className="flex-1 group-last:pb-0">
                  <div className="relative my-2 p-4 md:my-4 md:group-odd:text-right">
                    <h3 className="mb-2 break-words font-header text-3xl">{job.name}</h3>
                    {job.image ? (
                      <SVG
                        title={job.company}
                        className={'mb-4 inline-block fill-primary-700 dark:fill-primary-200'}
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.image}`}
                        height={20}
                      />
                    ) : (
                      <h4 className="mb-4 break-words font-header text-xl font-bold">{job.company}</h4>
                    )}
                    <div className={'md:text-normal flex items-center gap-2 whitespace-nowrap text-sm md:group-odd:justify-end'}>
                      <span>
                        {!job.endDate && 'Since '}
                        {moment(job.startDate).format('MMMM YYYY')}
                      </span>
                      {job.endDate && <ChevronDoubleRightIcon className="h-5" />}
                      <span>{job.endDate && moment(job.endDate).format('MMMM YYYY')}</span>
                    </div>
                    {job.tags?.length > 0 && (
                      <div className="mt-6 flex items-center gap-4 md:group-odd:justify-end">
                        {job.tags?.map((tag: ResumeTag) => (
                          <span key={`resume_tag_${tag.id}`} className="rounded bg-secondary-800 px-2 py-1 text-xs text-primary-100">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {job.projects.length > 0 && (
                      <>
                        <h5 className="mb-2 mt-6 font-header text-lg">Projects</h5>
                        <div className="flex items-center gap-8 group-odd:justify-end">
                          {job.projects?.map((project: ResumeProject) => (
                            <SVG
                              key={`resume_project_${project.id}`}
                              title={project.name}
                              className="fill-primary-700 dark:fill-primary-200"
                              src={`${process.env.NEXT_PUBLIC_CDN_URL}/${project.image}`}
                              height={25}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="relative mx-2 hidden w-4 flex-none group-even:hidden md:mx-4 md:block md:w-8">
                  <div className="z-10 mx-auto h-full w-0.5 bg-secondary-500"></div>
                  <span className="absolute left-1/2 top-12 z-20 h-3 w-3 -translate-x-1/2 transform rounded-full bg-blue-500 ring-2 ring-primary-100 dark:ring-primary-800"></span>
                </div>
                <div className="hidden flex-1 text-right font-mono group-even:hidden md:block md:w-36"></div>
              </div>
              <div className="relative my-4 hidden w-full flex-none text-center font-mono text-xl md:block md:text-2xl">{job.startYear}</div>
              <div className="hidden group-last:md:flex">
                <div className="flex-1"></div>
                <div className="relative mx-2 h-10 w-4 flex-none md:mx-4 md:w-8">
                  <div className="z-10 mx-auto h-full w-0.5 bg-secondary-500"></div>
                  <span className="absolute bottom-0 left-1/2 z-20 hidden h-5 w-5 -translate-x-1/2 transform rounded-full bg-red-500 ring-2 ring-primary-200 group-last:block dark:ring-primary-900"></span>
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
