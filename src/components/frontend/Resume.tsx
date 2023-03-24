import useStaleSWR from '@/utils/staleSWR';
import SVG from 'react-inlinesvg';
import moment from 'moment';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { Prisma, Resume, ResumeTag } from '@prisma/client';

type JobWithExtra = Prisma.ResumeGetPayload<{
  include: {
    tags: true;
    projects: true;
  };
}> & {
  startYear: string;
  ednYear: string;
};

export default function ResumeComponent() {
  const { data } = useStaleSWR('/api/portfolio/resume');
  const mappedData =
    data && data.results
      ? data.results.map((job: Resume) => {
          return {
            ...job,
            startYear: moment(job.startDate).format('YYYY'),
            endYear: job.endDate ? moment(job.endDate).format('YYYY') : 'Now',
          };
        })
      : [];
  return (
    <section className={'px-4 lg:px-0 mt-10'}>
      <div className="max-w-5xl mx-auto">
        <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light h-10">Resume</h1>
        <div className="mt-5 mx-auto">
          {mappedData.map((job: JobWithExtra, index: number) => (
            <div className="group" key={`job-image-${index}`}>
              <div className="hidden group-first:md:flex">
                <div className="flex-1"></div>
                <div className="flex-none w-4 md:w-8 relative mx-2 md:mx-4 h-10">
                  <div className="mx-auto w-0.5 h-full bg-secondary-500 z-10"></div>
                  <span className="hidden group-first:block absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full ring-2 ring-primary-100 dark:ring-primary-800 z-20 bg-emerald-500 w-5 h-5"></span>
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="hidden group-first:md:block flex-none w-full relative font-mono text-xl md:text-2xl text-center my-4">Today</div>
              <div className="flex">
                <div className="hidden md:block flex-1 md:w-36 font-mono text-right group-odd:hidden"></div>
                <div className="hidden md:block flex-none w-4 md:w-8 relative mx-2 md:mx-4 group-odd:hidden">
                  <div className="mx-auto w-0.5 h-full bg-secondary-500 z-10"></div>
                </div>
                <div className="flex-1 group-last:pb-0">
                  <div className="relative box-card p-4 my-2 md:my-5">
                    <h3 className="text-3xl font-header break-words mb-2">{job.name}</h3>
                    {job.image ? (
                      <SVG title={job.company} className={'fill-primary-700 dark:fill-primary-200 mb-4'} src={`/uploads/${job.image}`} height={20} />
                    ) : (
                      <h4 className="text-xl font-header break-words mb-4">{job.company}</h4>
                    )}
                    <div className={'text-sm md:text-normal flex items-center gap-2 whitespace-nowrap'}>
                      <span>
                        {!job.endDate && 'Since '}
                        {moment(job.startDate).format('MMMM YYYY')}
                      </span>
                      {job.endDate && <ChevronDoubleRightIcon className="h-5" />}
                      <span>{job.endDate && moment(job.endDate).format('MMMM YYYY')}</span>
                    </div>
                    {job.description && <div className="text-sm text-primary-700 dark:text-primary-200 mt-4">{job.description}</div>}
                    {job.tags?.length > 0 && (
                      <div className="flex items-center gap-4 mt-6">
                        {job.tags?.map((tag: ResumeTag) => (
                          <span key={`resume_tag_${tag.id}`} className="text-xs rounded px-2 py-1 bg-secondary-800 text-primary-100">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {job.projects.length > 0 && (
                      <>
                        <h5 className="mt-6 mb-2 text-lg">Projects</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {job.projects?.map((project) => (
                            <SVG
                              key={`resume_project_${project.id}`}
                              title={project.name}
                              className="fill-primary-700 dark:fill-primary-200 mx-auto"
                              src={`/uploads/${project.logo}`}
                              height={25}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="hidden md:block flex-none w-4 md:w-8 relative mx-2 md:mx-4 group-even:hidden">
                  <div className="mx-auto w-0.5 h-full bg-secondary-500 z-10"></div>
                </div>
                <div className="hidden md:block flex-1 md:w-36 font-mono text-right group-even:hidden"></div>
              </div>
              <div className="hidden md:block flex-none w-full relative font-mono text-xl md:text-2xl text-center my-4">{job.startYear}</div>
              <div className="hidden group-last:md:flex">
                <div className="flex-1"></div>
                <div className="flex-none w-4 md:w-8 relative mx-2 md:mx-4 h-10">
                  <div className="mx-auto w-0.5 h-full bg-secondary-500 z-10"></div>
                  <span className="hidden group-last:block absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-full ring-2 ring-primary-200 dark:ring-primary-900 z-20 bg-red-500 w-5 h-5"></span>
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
