import React, { FunctionComponent } from 'react';

type SVGProps = {
  width: string;
  height: string;
};

const Spinner: FunctionComponent<SVGProps> = ({ width = '20', height = '20', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <path d="M10,3.5 C6.41015,3.5 3.5,6.41015 3.5,10 C3.5,10.4142 3.16421,10.75 2.75,10.75 C2.33579,10.75 2,10.4142 2,10 C2,5.58172 5.58172,2 10,2 C14.4183,2 18,5.58172 18,10 C18,14.4183 14.4183,18 10,18 C9.58579,18 9.25,17.6642 9.25,17.25 C9.25,16.8358 9.58579,16.5 10,16.5 C13.5899,16.5 16.5,13.5899 16.5,10 C16.5,6.41015 13.5899,3.5 10,3.5 Z"></path>
  </svg>
);

export default Spinner;
