import * as React from 'react';
import GitHubIcon from '@/components/icons/github';
import styles from '@/styles/Projects.module.scss';
import useStaleSWR from '@/utils/staleSWR';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
  const { data } = useStaleSWR('/api/portfolio/apps');

  const projects = [
    {
      name: 'Stream',
      url: '/projects/stream',
      description: 'Unified stream of images and text from different feeds',
    },
    {
      name: 'Terminal',
      url: '/projects/terminal',
      description: 'Fake terminal component with few commands',
    },
    {
      name: 'Timeline',
      url: '/projects/timeline',
      description: 'Example of a timeline component using Tailwind',
    },
  ];

  return (
    <section className={`${styles.apps} px-4 lg:px-0 mt-10`}>
      <div className="max-w-5xl mx-auto flex flex-wrap">
        <div className="basis-full md:basis-3/4 mb-10">
          <h1 className="font-header leading-tight tracking-wide text-2xl lg:text-3xl font-light h-10">Projects</h1>
          <div className="grid grid-cols-1 gap-8 mt-5">
            {data?.results.map((app, index) => (
              <div className={'flex flex-wrap p-4 box-card'} key={`app-${index}`}>
                <div className={'basis-full md:basis-1/3 relative'}>
                  <Image src={`/uploads/${app.image}`} fill sizes="30vw" alt={app.name} className="bg-transparent object-contain" priority="false" />
                </div>
                <div className={'basis-full md:basis-2/3 px-8 py-4'}>
                  <h3 className="text-2xl font-header tracking-wide">{app.name}</h3>
                  <p className="text-normal mt-2">{app.description}</p>
                  <Link
                    href={app.url}
                    target="_blank"
                    rel="noreferrer"
                    className="from-secondary-600 to-secondary-700 bg-gradient-to-r transition text-primary-100 shadow-lg px-4 py-2 text-base rounded-md mt-6 inline-flex items-center gap-4 hover:underline"
                  >
                    <GitHubIcon className="w-6 transition-all duration-500 ease-in-out" />
                    Download from GitHub
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="basis-full md:basis-1/4 md:text-right mb-10">
          <h2 className="font-header leading-tight tracking-wide text-xl font-light h-10 align-bottom flex flex-row-reverse">
            <span className="self-end">Lab</span>
          </h2>
          <ul className="mt-5 pl-0 md:pl-8">
            {projects.map((project, index) => (
              <li key={`project-${index}`} className="text-base mb-8 box-card p-4">
                <Link href={project.url} className="group">
                  <h3 className="group-hover:underline text-lg tracking-wide">{project.name}</h3>
                  <p className="text-sm mt-2 opacity-50">{project.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
