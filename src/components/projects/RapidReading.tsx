'use client';
import { useEffect, useState } from 'react';
import { SunIcon } from 'lucide-react';

const replacer = (match: any) => {
  const length = match.length < 6 ? match.length + 1 : match.length;
  const slicePoint = Math.floor(length / 2);
  const wordStart = match.slice(0, slicePoint);
  const wordEnd = match.slice(slicePoint);
  return `<span class="font-bold">${wordStart}</span><span>${wordEnd}</span>`;
};

/* 2 paragraphs from shakespear's hamlet */
const simulationText = `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die—to sleep,
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to: 'tis a consummation
Devoutly to be wish'd. To die, to sleep;`;

export default function RapidReading() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const returned = text.replace(/\S+/g, replacer).replace(/(?:\r\n|\r|\n)/g, '<br/>');
    setOutput(returned);
  }, [text]);

  const irt = 50;
  const length = simulationText.length - 1;

  const write = (text: string) => {
    const currentText = text;
    const currentLength = currentText.length;
    const nextChar = simulationText[currentLength];
    const newText = currentText + nextChar;
    setText(newText);

    if (currentLength < length) {
      setTimeout(function () {
        write(newText);
      }, irt);
    }
  };

  const startSimulation = () => {
    setText('');

    setTimeout(function () {
      write('');
    }, irt);
  };
  return (
    <>
      <div className="mt-8">
        <div className="mb-4 rounded-lg bg-blue-100 p-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800" role="alert">
          <span className="font-medium">Info:</span> This project works better on{' '}
          <span className="font-bold">
            <SunIcon className="inline h-4 w-4 align-middle" /> Light mode
          </span>
        </div>
        <div className="mb-4 flex items-center justify-end gap-6">
          <button className="button button-success" onClick={() => startSimulation()}>
            Try Demo!
          </button>
          <button className="button" onClick={() => setText('')}>
            Clear
          </button>
        </div>
        <textarea
          className="border-primary-300 bg-primary-100 text-primary-900 focus:border-secondary-500 focus:ring-secondary-500 mb-8 w-full rounded-md border-2 shadow-sm transition ease-in-out sm:text-sm"
          rows={10}
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
      </div>
      {output && <div className="bg-primary-200 text-primary-900 rounded-md p-4 antialiased" dangerouslySetInnerHTML={{ __html: output }}></div>}
    </>
  );
}
