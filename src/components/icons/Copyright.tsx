import * as React from 'react';

const Copyright = ({ width = '250', height = '250', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <g>
      <path d="M124.998 0.018C56.0778 0.018 0 56.0734 0 125.018C0 193.935 56.0778 250.018 124.998 250.018C193.926 250.018 250 193.935 250 125.018C250 56.0734 193.926 0.018 124.998 0.018ZM124.998 222.169C71.4261 222.169 27.8474 178.588 27.8474 125.018C27.8474 71.426 71.4261 27.8457 124.998 27.8457C178.575 27.8457 222.154 71.4266 222.154 125.018C222.153 178.588 178.575 222.169 124.998 222.169Z" />
      <path d="M166.026 147.662C158.041 161.366 143.192 169.867 127.277 169.867C102.561 169.867 82.4285 149.737 82.4285 125.018C82.4285 100.279 102.561 80.1426 127.277 80.1426C143.193 80.1426 158.041 88.6748 166.026 102.351L167.058 104.139L197.183 104.139L195.375 99.2883C190.133 85.3993 180.935 73.5903 168.759 65.1615C156.552 56.711 142.214 52.2278 127.277 52.2278C87.15 52.2278 54.5178 84.8911 54.5178 125.018C54.5178 165.148 87.15 197.781 127.277 197.781C142.214 197.781 156.551 193.313 168.759 184.849C180.935 176.418 190.133 164.614 195.375 150.725L197.183 145.871L167.058 145.871L166.026 147.662Z" />
    </g>
  </svg>
);

export default Copyright;