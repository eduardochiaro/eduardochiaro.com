import React, { useState } from 'react';
import Image from 'next/image';

const NaturalImage = ({ size = 200, className, alt, ...props }) => {
  const [isReady, setIsReady] = useState(false);
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  const onLoadCallback = ({ naturalWidth, naturalHeight }) => {
    setRatio(naturalWidth / naturalHeight);
    setIsReady(true);
  };

  return (
    <Image
      {...props}
      alt={alt}
      width={size}
      height={size / ratio}
      className={`bg-transparent transition duration-500 ${isReady ? 'scale-100 blur-0' : 'scale-120 blur-2xl'} ${className}`}
      onLoadingComplete={onLoadCallback}
      priority="false"
    />
  );
};

export default NaturalImage;
