"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const NaturalImage = ({ size = 200, className, alt, ...props }: ImageProps & { size: number }) => {
  const [isReady, setIsReady] = useState(false);
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  const onLoadCallback = ({ naturalWidth, naturalHeight }: { naturalWidth: number; naturalHeight: number }) => {
    setRatio(naturalWidth / naturalHeight);
    setIsReady(true);
  };

  return (
    <Image
      {...props}
      alt={alt}
      width={size}
      height={size / ratio}
      className={`bg-transparent transition duration-300 ${isReady ? 'scale-100 blur-0' : 'scale-120 blur-2xl'} ${className}`}
      onLoadingComplete={onLoadCallback}
      priority={false}
    />
  );
};

export default NaturalImage;
