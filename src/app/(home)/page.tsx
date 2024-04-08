import ThemeIcon from '@/components/ThemeIcon';
import SVG from '@/utils/svg';
import moment from 'moment';

export default async function Home() {
  const works = [
    {
      name: 'Verizon',
      logo: 'Verizon_logo.svg',
    },
    {
      name: 'Getty Images',
      logo: 'Getty_Images_logo.svg',
    },
    {
      name: 'HP',
      logo: 'HP_logo.svg',
    },
    {
      name: 'Samsung',
      logo: 'Samsung_logo.svg',
    },
    {
      name: 'Microsoft',
      logo: 'Microsoft_logo.svg',
    },
    {
      name: 'LG',
      logo: 'LG_logo.svg',
    },
  ];

  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="flex flex-col">
        <div className="flex">
          <div className="h-4 w-4 flex-none border-b border-r border-secondary-100 dark:border-secondary-800"></div>
          <div className="h-4 grow border-b border-secondary-100 dark:border-secondary-800"></div>
          <div className="h-4 w-4 flex-none border-b border-l border-secondary-100 dark:border-secondary-800"></div>
        </div>
        <div className="flex">
          <div className="w-4 flex-none border-r border-secondary-100 dark:border-secondary-800"></div>
          <div className="grow p-4">
            <div className="min-w-96 max-w-screen-sm rounded-xl bg-primary-50 p-6 font-mono shadow-lg dark:bg-primary-950">
              <h1 className="font-semibold">
                Eduardo <span className="font-normal">is a software developer.</span>
              </h1>
              <p className="mt-10">
                With {moment().diff('2005-09-01', 'years')} years of experience, Eduardo has been tinkering with Node.js for the last few years, building SaaS
                applications that are scalable and flexible. He's a big believer in using the latest technologies and best practices to stay on the cutting edge
                of development.
              </p>
              <div className="mt-20 flex flex-wrap items-center gap-5 md:justify-between">
                {works.map((job, index) => (
                  <div className={'relative z-10 text-center align-middle'} key={`job-image-${index}`}>
                    <SVG title={job.name} className={'inline w-full fill-secondary-300 dark:fill-secondary-700'} src={`/works/${job.logo}`} height={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-4 flex-none border-l border-secondary-100 dark:border-secondary-800"></div>
        </div>
        <div className="flex">
          <div className="h-4 w-4 flex-none border-r border-t border-secondary-100 dark:border-secondary-800"></div>
          <div className="h-4 grow border-t border-secondary-100 dark:border-secondary-800"></div>
          <div className="h-4 w-4 flex-none border-l border-t border-secondary-100 dark:border-secondary-800"></div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10">
        <ThemeIcon orientation="top left" size="h-6" />
      </div>
    </div>
  );
}
