import React, { useEffect, useRef } from 'react'
import SvgGauge from 'svg-gauge'
import SVG from 'react-inlinesvg'
import styles from '../styles/Gauge.module.scss'

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

const Gauge = (props) => {
  const gaugeEl = useRef(null)
  const gaugeRef = useRef(null)
  useEffect(() => {
    const { value } = props;
    if (!gaugeRef.current) {
      const options = { ...defaultOptions, ...props }
      gaugeRef.current = SvgGauge(gaugeEl.current, options)
      gaugeRef.current.setValue(options.initialValue)
    }
    gaugeRef.current.setValueAnimated(value, 1)
  }, [props])

  const { skill } = props;

  return (
    <div
      ref={gaugeEl}
      className={[styles['gauge-container'], 'mx-auto transition-all duration-500 ease-out hover:md:scale-110', styles[`gauge-${skill.type}`]].join(' ')}
    >
      <div className={styles.icon}>
        <SVG src={`${window.location.origin}/images/svg-icons/${skill.logo}`} />
        <p className="text-center -mt-4 font-header font-bold">{skill.name}</p>
      </div>
    </div>
  )
}

export default Gauge