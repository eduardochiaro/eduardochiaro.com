import * as React from 'react';

const Menu = ({ width = '24', height = '24', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} {...props}>
    <path d="M4 5L20 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M4 12L8 12M20 12L11 12M8 12L9.5 14L11 12M8 12L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

export default Menu;
