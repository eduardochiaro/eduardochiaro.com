import React, { useEffect, useRef } from "react";
import SvgGauge from "svg-gauge";
import styles from './Gauge.module.scss'

const defaultOptions = {
  animDuration: 1,
  showValue: false,
  initialValue: 0,
  max: 100,
  valueDialClass: styles.value, 
  dialClass: styles.dial, 
  gaugeClass: styles.gauge
  // Put any other defaults you want. e.g. dialStartAngle, dialEndAngle, radius, etc.
};

const Gauge = props => {
  const gaugeEl = useRef(null);
  const gaugeRef = useRef(null);
  useEffect(() => {
    if (!gaugeRef.current) {
      const options = { ...defaultOptions, ...props,  };
      gaugeRef.current = SvgGauge(gaugeEl.current, options);
      gaugeRef.current.setValue(options.initialValue);
    }
    gaugeRef.current.setValueAnimated(props.value, 1);
  }, [props]);

  const { skill } = props;
  return (
    <div ref={gaugeEl} className={[styles['gauge-container'], 'pb-5', styles[`gauge-${skill.type}`]].join(' ')}>
      <div className={styles.icon}>
      <svg>
        <use href={`${window.location.origin}/images/svg-icons/${skill.logo}`} />
      </svg>
      <p className="text-center">{skill.name}</p>
      </div>
    </div>
  );
};

export default Gauge;