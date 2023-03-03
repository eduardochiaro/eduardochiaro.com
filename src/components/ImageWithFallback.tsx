import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const ImageWithFallback = ({ src, fallbackSrc, alt, ...rest }: ImageProps & { fallbackSrc: string }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
