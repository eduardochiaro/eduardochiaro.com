import React, { useState } from 'react'
import Image from "next/image";

const NaturalImage = ({alt, size = 200, ...props}) => {
  const [ratio, setRatio] = useState(16/9) // default to 16:9

  return (
    <Image
      {...props}
      // set the dimension (affected by layout)
      alt={props.alt}
      width={size}
      height={size / ratio}
      onLoadingComplete={({ naturalWidth, naturalHeight }) => 
        setRatio(naturalWidth / naturalHeight)
      }
    />
  )
}

export default NaturalImage;