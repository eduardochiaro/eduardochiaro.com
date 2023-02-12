import * as React from 'react';

const Logo = ({ width = '1024', height = '1024', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
<path d="M106.71 512C106.71 282.206 288.165 95.9207 512 95.9207C735.835 95.9207 917.29 282.206 917.29 512C917.29 741.794 735.835 928.079 512 928.079C288.165 928.079 106.71 741.794 106.71 512Z" fill="none" opacity="1" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="round" strokeWidth="150"/>
  </svg>
);

export default Logo;
