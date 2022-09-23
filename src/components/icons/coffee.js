import * as React from 'react';

const Coffee = ({ width = '530', height = '530', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <path d="M21.415 444.532c14.277 14.277 31.501 21.416 51.678 21.416h365.451c20.178 0 37.404-7.139 51.675-21.416 14.271-14.27 21.409-31.497 21.409-51.674H0c.004 20.177 7.142 37.404 21.415 51.674zM137.046 356.312h200.995c17.508 0 32.545-6.279 45.111-18.842 12.56-12.563 18.842-27.601 18.842-45.111v-9.134h18.268c30.266 0 56.11-10.704 77.52-32.119 21.408-21.414 32.12-47.251 32.12-77.514 0-30.267-10.712-56.108-32.12-77.519-21.409-21.411-47.254-32.121-77.52-32.121H91.363c-4.947 0-9.229 1.812-12.847 5.424-3.616 3.617-5.424 7.902-5.424 12.85v210.131c0 17.511 6.28 32.548 18.843 45.111 12.563 12.565 27.6 18.844 45.111 18.844zm264.948-237.537h18.274c15.229 0 28.172 5.33 38.828 15.987 10.656 10.66 15.988 23.601 15.988 38.831 0 15.222-5.332 28.166-15.988 38.83-10.656 10.657-23.6 15.988-38.828 15.988h-18.274V118.775z" />
  </svg>
);

export default Coffee;
