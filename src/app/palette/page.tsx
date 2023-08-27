import FrontendLayout from '@/components/layouts/Frontend';
import { Metadata } from 'next';

export default async function Palette() {
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
    <FrontendLayout>
      <section className={'px-4 lg:px-0 mt-10'}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light h-10">Palette</h1>
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {palette.map((color, key) => (
              <div key={key} className="w-full rounded overflow-hidden drop-shadow-xl">
                <div className={`w-full h-48 ${color.main} p-4 font-header text-2xl text-primary-100`}>{color.name}</div>
                <div className="grid grid-cols-4">
                  {color.scale.map((shade, k) => (
                    <div key={k} className={`h-10 ${shade}`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-10 mt-10">
            {secondaryPalette.map((color, key) => (
              <div key={key} className={`w-12 h-12 ${color} m-auto drop-shadow-xl rounded`}></div>
            ))}
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Palette | Eduardo Chiaro',
};
