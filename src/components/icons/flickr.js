import * as React from 'react'

const Flickr = ({width='512', height='512', ...props}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
    <path d="M120.924,135.075C54.247,135.075,0,189.323,0,256s54.247,120.925,120.924,120.925
			c66.678,0,120.925-54.247,120.925-120.925S187.601,135.075,120.924,135.075z M120.924,356.526
			c-55.43,0-100.525-45.096-100.525-100.526c0-55.431,45.096-100.525,100.525-100.525c55.431,0,100.526,45.095,100.526,100.525
			C221.45,311.431,176.353,356.526,120.924,356.526z"/>
    <path d="M391.076,135.075c-66.678,0-120.925,54.247-120.925,120.925s54.246,120.925,120.925,120.925
      C457.753,376.925,512,322.677,512,256S457.755,135.075,391.076,135.075z M391.076,356.527
      c-55.431,0-100.526-45.096-100.526-100.526c0-55.431,45.096-100.526,100.526-100.526c55.43,0,100.525,45.095,100.525,100.525
      S446.507,356.527,391.076,356.527z"/>
    <path d="M120.924,171.792c-2.53,0-5.087,0.114-7.602,0.339c-5.61,0.503-9.751,5.458-9.25,11.068
      c0.475,5.301,4.925,9.29,10.147,9.29c0.304,0,0.611-0.013,0.92-0.041c1.912-0.171,3.858-0.258,5.784-0.258
      c5.633,0,10.199-4.566,10.199-10.199S126.557,171.792,120.924,171.792z"/>
    <path d="M89.12,188.381c-3.076-4.719-9.394-6.051-14.114-2.977C51.031,201.026,36.717,227.418,36.717,256
			c0,5.633,4.566,10.199,10.199,10.199c5.633,0,10.199-4.566,10.199-10.199c0-21.66,10.851-41.663,29.027-53.505
			C90.862,199.42,92.195,193.101,89.12,188.381z"/>
  </svg>
)

export default Flickr
