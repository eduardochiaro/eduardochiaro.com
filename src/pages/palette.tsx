import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Footer from '@/components/frontend/Footer';

export default function Projects() {
  const palette = [
    {
      name: 'Primary',
      main: 'bg-primary-500',
      scale: ['bg-primary-900', 'bg-primary-700', 'bg-primary-300', 'bg-primary-100'],
    },
    {
      name: 'Secondary',
      main: 'bg-secondary-500',
      scale: ['bg-secondary-900', 'bg-secondary-600', 'bg-secondary-300', 'bg-secondary-100'],
    },
    {
      name: 'Accent',
      main: 'bg-accent-500',
      scale: ['bg-accent-900', 'bg-accent-700', 'bg-accent-300', 'bg-accent-100'],
    },
  ];
  const secondaryPalette = ['bg-blue-500', 'bg-red-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-amber-500'];
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>Projects | Eduardo Chiaro</title>
      </Head>
      <Header />
      <Share />
      <div className="grow">
        <section className={'px-4 lg:px-0 mt-10'}>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light h-10">Palette</h1>
            <div className="grid grid-cols-3 gap-10 mt-10">
              {palette.map((color, key) => (
                <div key={key} className="w-full rounded overflow-hidden drop-shadow">
                  <div className={`w-full h-48 ${color.main} p-4 font-header text-2xl text-primary-100`}>{color.name}</div>
                  <div className="grid grid-cols-4">
                    {color.scale.map((shade, k) => (
                      <div key={k} className={`h-10 ${shade}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-6 gap-10 mt-10">
              {secondaryPalette.map((color, key) => (
                <div key={key} className={`w-12 h-12 ${color} m-auto rounded`}></div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
