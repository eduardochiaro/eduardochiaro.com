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
      <section className={'mt-10 px-4 lg:px-0'}>
        <div className="mx-auto max-w-5xl">
          <h1 className="h-10 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">Palette</h1>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {palette.map((color, key) => (
              <div key={key} className="w-full overflow-hidden rounded drop-shadow-xl">
                <div className={`h-48 w-full ${color.main} p-4 font-header text-2xl text-primary-100`}>{color.name}</div>
                <div className="grid grid-cols-4">
                  {color.scale.map((shade, k) => (
                    <div key={k} className={`h-10 ${shade}`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-10 md:grid-cols-6">
            {secondaryPalette.map((color, key) => (
              <div key={key} className={`h-12 w-12 ${color} m-auto rounded drop-shadow-xl`}></div>
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