'use client';

import * as React from 'react';
import GitHubIcon from '@/components/icons/Github';
import styles from '@/styles/Projects.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { App, Prisma } from '@prisma/client';

type AppExpanded = Prisma.AppGetPayload<{ include: { file: true } }>;

type Props = {
  data: AppExpanded[];
};

export default function Projects({ data }: Props) {
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
    <section className={`${styles.apps} mt-10 px-4 lg:px-0`}>
      <div className="mx-auto flex max-w-5xl flex-wrap">
        <div className="mb-10 basis-full md:basis-3/4">
          <h1 className="h-10 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">Projects</h1>
          <div className="mt-5 grid grid-cols-1 gap-8 pl-2">
            {data?.map((app: AppExpanded, index: number) => (
              <div className={'box-card group flex flex-wrap p-4'} key={`app-${index}`}>
                {app.file?.path && (
                  <div className={'relative basis-full md:basis-1/3'}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/${app.file.path}`}
                      fill
                      sizes="30vw"
                      alt={app.name}
                      className="bg-transparent object-contain"
                      priority={false}
                    />
                  </div>
                )}
                <div className={'basis-full px-8 py-4 md:basis-2/3'}>
                  <h3 className="font-header text-2xl tracking-wide transition-colors duration-300 ease-out group-hover:text-secondary-600 dark:group-hover:text-secondary-600">
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

        <div className="mb-10 basis-full md:basis-1/4 md:text-right">
          <h2 className="flex h-10 align-bottom font-header text-xl font-light leading-tight tracking-wide md:flex-row-reverse">
            <span className="self-end">Lab</span>
          </h2>
          <ul className="mt-5 pl-0 pr-2 md:pl-8">
            {projects.map((project, index) => (
              <li key={`project-${index}`} className="box-card mb-8 p-4 text-base">
                <Link href={project.url} className="group">
                  <h3 className="text-lg tracking-wide transition-colors duration-300 ease-out group-hover:text-secondary-600 dark:group-hover:text-secondary-600">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm opacity-50">{project.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
