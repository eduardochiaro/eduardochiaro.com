import { useEffect, useState } from 'react';

/*
{
	interval: 80,
	frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
}
*/

const SquareSpinner = () => {
  const interval = 80;
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const [display, setDisplay] = useState(frames[0]);

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplay(frames[i]);
      i++;
      if (i === frames.length) {
        i = 0;
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return <div className="square-spinner">{display}</div>;
};

export default SquareSpinner;
