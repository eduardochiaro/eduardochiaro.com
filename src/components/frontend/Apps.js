import * as React from 'react';
import GitHubIcon from '../icons/github';
import styles from '../../styles/Apps.module.scss'
import useStaleSWR from '../../lib/staleSWR';
import NaturalImage from '../NaturalImage';

export default function Apps () {
  const { data, error } = useStaleSWR('/api/portfolio/apps');

  if (data && data.results) {
    return (
      <section className={`${styles.apps} px-8 lg:px-0 my-10`}>
        <span className="anchor" name="projects"/>
        <div className="max-w-5xl mx-auto relative">
          <h3 className="font-header leading-tight text-2xl lg:text-3xl pr-4 font-light mb-2">
            Projects
          </h3>
          { data?.results.map((app, index) => (
            <div className={`flex flex-wrap mt-5 rounded-lg shadow-xl bg-zinc-200 dark:bg-zinc-700 p-5`} key={`apps-${index}`} >
              <div className={`basis-full md:basis-1/4 relative`}>
                <NaturalImage
                  src={`/uploads/${app.image}`}
                  size={1329}
                  alt={app.title}
                  title={app.title}
                  className="rounded"
                />
              </div>
              <div className={`basis-full md:basis-3/4 px-8`}>
                <h3 className="text-2xl font-header">{app.name}</h3>
                <p className="text-normal mt-2">{app.description}</p>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-700 transition text-primary-500 hover:text-primary-600 shadow-lg border border-gray-300 px-4 py-2 text-base rounded-md mt-8 inline-block"
                >
                  <GitHubIcon className="inline-block align-text-top w-5 mr-2" />
                  Download from GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return (<></>);
  }
}