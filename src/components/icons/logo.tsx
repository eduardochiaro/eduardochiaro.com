import React, { FunctionComponent } from 'react';

type SVGProps = React.SVGProps<SVGSVGElement> & React.ImgHTMLAttributes<HTMLImageElement>

const Logo: FunctionComponent<SVGProps> = ({ width = '1000', height = '1000', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <defs>
      <linearGradient gradientTransform="matrix(1 0 0 1 0 0)" gradientUnits="userSpaceOnUse" id="LinearGradient" x1="131.236" x2="435.809" y1="572.333" y2="876.907">
        <stop offset="0" stopColor="#000000" stopOpacity="0.3"/>
        <stop offset="0" stopColor="#000000" stopOpacity="0.3"/>
        <stop offset="0.35" stopColor="#000000" stopOpacity="0"/>
        <stop offset="0.691667" stopColor="#000000" stopOpacity="0"/>
        <stop offset="1" stopColor="#000000" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient gradientTransform="matrix(1 0 0 1 440.206 -439.974)" gradientUnits="userSpaceOnUse" id="LinearGradient_2" x1="131.236" x2="435.809" y1="572.333" y2="876.907">
        <stop offset="0" stopColor="#000000" stopOpacity="0.3"/>
        <stop offset="0.279167" stopColor="#000000" stopOpacity="0"/>
        <stop offset="1" stopColor="#000000" stopOpacity="0"/>
        <stop offset="1" stopColor="#000000" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <g className="accent">
    <path d="M640.062 60.2188C541.359 60.172 357.69 133.038 432.805 133.55C453.837 133.693 659.875 360.031 659.875 360.031L799.844 220C799.844 220 659.87 60.2281 640.062 60.2188ZM147.348 446.407C151.66 446.486 59.998 560.014 59.9375 640.156C59.923 659.322 341.561 940.222 360.25 940.219C503.216 940.193 536.082 830.145 527.327 830.153C510.657 830.168 123.079 445.959 147.348 446.407Z" fill="currentColor" fillRule="nonzero" opacity="1" stroke="none"/>
    </g>
    <path d="M163.018 463.23C182.43 463.542 59.923 551.977 59.923 640.141C59.923 660.47 340.987 940.222 360.236 940.222C502.538 940.222 548.657 830.245 525.853 829.902C511.707 829.69 137.894 462.826 163.018 463.23Z" fill="url(#LinearGradient)" fillRule="nonzero" opacity="1" stroke="none"/>
    <path d="M640.401 60.2281C590.449 60.2281 387.467 158.11 462.558 159.81C479.518 160.194 659.87 360.038 659.87 360.038L799.846 220.008C799.846 220.008 659.87 60.2281 640.401 60.2281Z" fill="url(#LinearGradient_2)" fillRule="nonzero" opacity="1" stroke="none"/>
    <path d="M361.281 60.2188C319.736 60.2281 59.923 341.399 59.9375 360.031C59.9786 412.921 59.9702 729.699 59.9375 640.156C59.923 600.468 598.654 60.2281 641.094 60.2188C677.816 60.2106 431.022 60.203 361.281 60.2188ZM940.312 360.031L799.844 500.188L940.312 640.156L940.312 360.031ZM659.875 640.156C659.875 640.156 401.506 940.222 360.25 940.219C300.599 940.214 550.322 940.203 640.062 940.219C659.87 940.222 799.844 779.938 799.844 779.938L659.875 640.156Z" fill="currentColor" fillRule="nonzero" opacity="1" stroke="none"/>

  </svg>
);

export default Logo;
