import React, { useEffect, useRef } from 'react'
import SvgGauge from 'svg-gauge'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import styles from './Gauge.module.scss'

const defaultOptions = {
  animDuration: 1,
  showValue: false,
  initialValue: 0,
  max: 100,
  valueDialClass: styles.value,
  dialClass: styles.dial,
  gaugeClass: styles.gauge,
  // Put any other defaults you want. e.g. dialStartAngle, dialEndAngle, radius, etc.
}

const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark"
];

const Gauge = (props) => {
  const gaugeEl = useRef(null)
  const gaugeRef = useRef(null)
  useEffect(() => {
    const { placeholder } = props
    if (!placeholder) {
      if (!gaugeRef.current) {
        const options = { ...defaultOptions, ...props }
        gaugeRef.current = SvgGauge(gaugeEl.current, options)
        gaugeRef.current.setValue(options.initialValue)
      }
      gaugeRef.current.setValueAnimated(props.value, 1)
    }
    
  }, [props])

  const { skill, placeholder } = props
  const color = colors[Math.floor(Math.random()*colors.length)];

  if (placeholder) {
    return (
      <div
        className={[styles['gauge-container'], 'pb-5', styles[`gauge-${skill.type}`]].join(' ')}
        animation="glow"
      >
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} bg={color} className={styles.placeholder} />
        </Placeholder>
      </div>
    )
  }
  return (
    <div
      ref={gaugeEl}
      className={[styles['gauge-container'], 'pb-5', styles[`gauge-${skill.type}`]].join(' ')}
    >
      <div className={styles.icon}>
        <svg>
          <use href={`${window.location.origin}/images/svg-icons/${skill.logo}`} />
        </svg>
        <p className="text-center">{skill.name}</p>
      </div>
    </div>
  )
}

export default Gauge
