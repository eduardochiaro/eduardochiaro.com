import React from 'react'
// import PropTypes from 'prop-types';
// import styles from './Gauge.module.scss';

function Gauge(props) {
  const { percent, radius } = props

  const strokeWidth = radius * 0.2
  const innerRadius = radius - strokeWidth / 2
  const circumference = innerRadius * 2 * Math.PI
  const arc = circumference * (270 / 360)
  const dashArray = `${arc} ${circumference}`
  const transform = `rotate(135, ${radius}, ${radius})`
  const percentNormalized = Math.min(Math.max(percent, 0), 100)
  const offset = arc - (percentNormalized / 100) * arc

  return (
    <svg height={radius * 2} width={radius * 2}>
      ‍
      <circle
        className="gauge_base"
        cx={radius}
        cy={radius}
        fill="transparent"
        r={innerRadius}
        stroke="gray"
        strokeDasharray={dashArray}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform={transform}
      />
      <circle
        className="gauge_percent"
        cx={radius}
        cy={radius}
        fill="transparent"
        r={innerRadius}
        stroke="blue"
        strokeDasharray={dashArray}
        strokeDashoffset={offset}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={{
          transition: 'stroke-dashoffset 0.3s',
        }}
        transform={transform}
      />
      ‍
    </svg>
  )
}

// Gauge.propTypes = {};

Gauge.defaultProps = {}

export default Gauge
