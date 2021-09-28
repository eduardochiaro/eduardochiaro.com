import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container } from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import Gauge from '../Elements/Gauge/Gauge.lazy'
import { skills } from '../../helpers/api'
import styles from './Skills.module.scss'

const Skills = ({ token }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      if (token) {
        skills(token).then((response) => {
          if (response && response.data) {
            setData(response.data.results)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [token])

  return (
    <section id="skills" className={`${styles.skills} mt-5`}>
      <Container>
        <Row>
          <Col>
            <h3 className="display-6 pb-4">
              What I&apos;m <span className="text-primary">good</span> at...
            </h3>
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="col-lg-4 d-none d-lg-inline">
            <SVG src={`${window.location.origin}/images/bgs/ebooks.svg`} />
          </Col>
          <Col lg={8} xs={12}>
            <div className="d-flex flex-wrap justify-content-between">
              {data.map((skill) => (
                <Gauge
                  key={`g-${skill.name}`}
                  value={skill.percentage}
                  skill={skill}
                  // any other options you want
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

Skills.propTypes = {}

Skills.defaultProps = {}

export default Skills
