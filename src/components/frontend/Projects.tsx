import * as React from 'react';
import GitHubIcon from '@/components/icons/Github';
import styles from '@/styles/Projects.module.scss';
import useStaleSWR from '@/utils/staleSWR';
import Link from 'next/link';
import Image from 'next/image';
import { App } from '@prisma/client';

export default function Projects() {
  const { data } = useStaleSWR('/api/portfolio/apps');

  const projects = [
    {
      name: 'Stream',
      url: '/projects/stream',
      description: 'Unified content stream from different feeds',
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
          <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light h-10">Projects</h1>
          <div className="grid grid-cols-1 gap-8 mt-5 pl-2">
            {data?.results.map((app: App, index: number) => (
              <div className={'flex flex-wrap p-4 box-card group'} key={`app-${index}`}>
                <div className={'basis-full md:basis-1/3 relative'}>
                  <Image src={`/uploads/${app.image}`} fill sizes="30vw" alt={app.name} className="bg-transparent object-contain" priority={false} />
                </div>
                <div className={'basis-full md:basis-2/3 px-8 py-4'}>
                  <h3 className="text-2xl font-header tracking-wide transition-colors ease-out duration-300 group-hover:text-secondary-600 dark:group-hover:text-secondary-600">
                    {app.name}
                  </h3>
                  <p className="text-normal mt-2">{app.description}</p>
                  <Link href={app.url || '#'} target="_blank" rel="noreferrer" className="download-button mt-6 inline-flex items-center gap-4">
                    <GitHubIcon className="w-6" />
                    Download from GitHub
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="basis-full md:basis-1/4 md:text-right mb-10">
          <h2 className="font-header leading-tight tracking-wide text-xl font-light h-10 align-bottom flex md:flex-row-reverse">
            <span className="self-end">Lab</span>
          </h2>
          <ul className="mt-5 pl-0 md:pl-8 pr-2">
            {projects.map((project, index) => (
              <li key={`project-${index}`} className="text-base mb-8 box-card p-4">
                <Link href={project.url} className="group">
                  <h3 className="group-hover:text-secondary-600 dark:group-hover:text-secondary-600 transition-colors ease-out duration-300 text-lg tracking-wide">
                    {project.name}
                  </h3>
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
