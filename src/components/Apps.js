import * as React from 'react';
import GitHubIcon from '../elements/icons/github';
import styles from '../styles/Apps.module.scss'
import useStaleSWR from '../lib/staleSWR';
import NaturalImage from '../elements/NaturalImage';

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
            <div className={`flex flex-wrap mt-5`} key={`apps-${index}`} >
              {index > 0 && <span className="w-full border-t border-isabelline-600 mb-6 mt-2 dark:border-isabelline-800 border-dashed shrink mr-5"></span>}
              <div className={`basis-full md:basis-1/4 relative align-middle`}>
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
                <p className="text-normal mt-4">{app.description}</p>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-700 transition text-isabelline-500 hover:text-isabelline-700 shadow-lg border border-gray-300 px-4 py-2 text-base rounded-md mt-8 inline-block"
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