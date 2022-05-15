import * as React from 'react';
import GitHubIcon from '../icons/github';
import styles from '../../styles/Projects.module.scss'
import useStaleSWR from '../../lib/staleSWR';
import NaturalImage from '../NaturalImage';
import Link from 'next/link';

export default function Projects () {
  const { data } = useStaleSWR('/api/portfolio/apps');

  const projects = [
    {
      name: 'Stream',
      url: '/projects/stream',
      description: 'Unified stream of images and text from different feeds',
    },
    {
      name: 'Timeline', 
      url: '/projects/timeline',
      description: 'Example of a timeline component using Tailwind',
    },
    {
      name: 'Timeline (variation)',
      url: '/projects/timeline-variation',
      description: 'Example of a timeline component using Tailwind, with a style variation',
    }
  ]

  return (
    <section className={`${styles.apps} px-4 lg:px-0 mt-10`}>
      <div className="max-w-5xl mx-auto flex flex-wrap">
        <div className="basis-full md:basis-3/4 mb-10">
          <h1 className="font-header leading-tight text-2xl lg:text-3xl font-light">
            Apps
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-10">
          { data?.results.map((app, index) => (
            <div className={`flex flex-wrap p-4 box-card`} key={`app-${index}`} >
              <div className={`basis-full md:basis-1/3 relative`}>
                <NaturalImage
                  src={`/uploads/${app.image}`}
                  size={1329}
                  alt={app.title}
                  title={app.title}
                  className="rounded bg-transparent"
                />
              </div>
              <div className={`basis-full md:basis-2/3 px-8`}>
                <h3 className="text-2xl font-header">{app.name}</h3>
                <p className="text-normal mt-2">{app.description}</p>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-700 transition text-zinc-100 hover:text-primary-600 shadow-lg border border-zinc-300 px-4 py-2 text-base rounded-md mt-8 inline-block"
                >
                  <GitHubIcon className="inline-block align-text-top w-5 mr-2" />
                  Download from GitHub
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="basis-full md:basis-1/4 md:text-right mb-10">
          <h2 className="font-header leading-tight text-2xl lg:text-3xl font-light">
            Projects
          </h2>
          <ul className="mt-10 pl-0 md:pl-4 list-inside list-disc">
            { projects.map((project, index) => (
            <li key={`project-${index}`} className="text-base mb-5">
              <Link
                href={project.url}
                >
                <a className="hover:underline text-2xl">{project.name}</a>
              </Link>
              <p className="text-sm opacity-50">{project.description}</p>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}