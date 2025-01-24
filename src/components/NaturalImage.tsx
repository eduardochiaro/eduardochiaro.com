'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const NaturalImage = ({ size = 200, sizeType = 'w', className, alt, ...props }: ImageProps & { size?: number; sizeType: 'h' | 'w' }) => {
  const [isReady, setIsReady] = useState(false);
  const [ratio, setRatio] = useState(16 / 9); // default to 16:9

  const onLoadCallback = ({ naturalWidth, naturalHeight }: { naturalWidth: number; naturalHeight: number }) => {
    setRatio(naturalWidth / naturalHeight);
    setIsReady(true);
  };

  const width = sizeType === 'w' ? size : size / ratio;
  const height = sizeType === 'h' ? size : size / ratio;

  return (
    <Image
      {...props}
      alt={alt}
      width={width}
      height={height}
      className={`bg-transparent transition duration-300 ${isReady ? 'scale-100 blur-0' : 'scale-120 blur-2xl'} ${className}`}
      onLoad={(e) => onLoadCallback(e.target as HTMLImageElement)}
      priority={false}
    />
  );
};

export default NaturalImage;
