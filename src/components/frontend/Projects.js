import * as React from 'react';
import GitHubIcon from '../icons/github';
import styles from '../../styles/Projects.module.scss'
import useStaleSWR from '../../utils/staleSWR';
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
      name: 'Terminal', 
      url: '/projects/terminal',
      description: 'Fake terminal component with few commands',
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
            Projects
          </h1>
          <div className="grid grid-cols-1 gap-8 mt-5">
          { data?.results.map((app, index) => (
            <div className={`flex flex-wrap p-8 box-card`} key={`app-${index}`} >
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
                <Link
                  href={app.url}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary-700 transition text-zinc-100 shadow-lg px-4 py-2 text-base rounded-md mt-6 inline-flex items-center gap-4 group hover:underline"
                  >
                    <GitHubIcon className="w-6 group-hover:w-8 group-hover:mr-2 transition-all duration-500 ease-in-out" />
                    Download from GitHub
                  </a>
                </Link>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="basis-full md:basis-1/4 md:text-right mb-10">
          <h2 className="font-header leading-tight text-xl font-light mt-3">
            Lab
          </h2>
          <ul className="mt-5 pl-0 md:pl-8">
            { projects.map((project, index) => (
            <li key={`project-${index}`} className="text-base mb-8 box-card p-4">
              <Link
                href={project.url}
                >
                <a className="group">
                  <h3 className="group-hover:underline text-lg">{project.name}</h3>
                  <p className="text-sm mt-2 opacity-50">{project.description}</p>
                  </a>
              </Link>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}