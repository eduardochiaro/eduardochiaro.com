'use client';
import React, { useEffect, useState } from 'react';
import classNames from './classNames';
import NaturalImage from '@/components/NaturalImage';

type Props = {
  src: string;
  title?: string | null;
  sizeType?: 'h' | 'w';
  className?: string;
  size?: number;
};

const SvgInline = (props: Props) => {
  const [svg, setSvg] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    fetch(props.src)
      .then((res) => res.text())
      .then(setSvg)
      .catch(setIsErrored)
      .then(() => setIsLoaded(true));
  }, [props.src]);

  return (
    <>
      {isLoaded && !isErrored && (
        <NaturalImage
          alt={props.title || ''}
          size={props.size || 300}
          sizeType={props.sizeType || 'w'}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
          className={classNames(props.className)}
        />
      )}
    </>
  );
};

export default SvgInline;
