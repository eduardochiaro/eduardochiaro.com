import React, { useState } from 'react'
import Image from "next/future/image";

const NaturalImage = ({size = 200, className, ...props}) => {
  const [isReady, setIsReady] = useState(false);
  const [ratio, setRatio] = useState(16/9) // default to 16:9

  const onLoadCallback = ({ naturalWidth, naturalHeight }) => {
    setRatio(naturalWidth / naturalHeight);
    setIsReady(true);
  };

  return (
    <Image
      {...props}
      width={size}
      height={size / ratio}
      className={`bg-transparent transition duration-500 ${isReady ? 'scale-100 blur-0' : 'scale-120 blur-2xl'} ${className}`}
      onLoadingComplete={onLoadCallback}
      priority="false"
    />
  )
}

export default NaturalImage;