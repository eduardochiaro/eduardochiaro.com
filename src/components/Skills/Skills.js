import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container } from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import { skills } from '../../helpers/api';
import styles from './Skills.module.scss';

class Skills extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  async componentDidMount() {
    try {
      const response = await skills();
      this.setState({ data: response.data.results })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { data } = this.state;
    return (
      <section id="skills" className={`${styles.skills} mt-5`}>
        <Container>
          <Row>
            <Col>
              <h3 className="display-6 pb-4">What I&apos;m <span className="text-primary">good</span> at...</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className="col-lg-4 d-none d-lg-inline">
              <SVG src={`${window.location.origin}/images/bgs/ebooks.svg`} />
            </Col>
            <Col lg={8} xs={12}>
              <div className="d-flex flex-wrap justify-content-between">
                {data.map((skill) => (
                  <div key={skill.name} className={[styles['skill-icon'], styles[`skill-icon-${skill.type}`]].join(' ')}>
                    <div className={[styles.progress, styles[`perc-${skill.percentage}`]].join(' ')}>
                      <span className={styles['progress-left']}>
                          <span className={styles['progress-bar']} />
                      </span>
                      <span className={styles['progress-right']}>
                          <span className={styles['progress-bar']} />
                      </span>
                      <svg>
                        <use href={`${window.location.origin}/images/svg-icons/${skill.logo}`}/>
                      </svg>
                    </div>
                    <p className="text-center mt-2">{skill.name}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

Skills.propTypes = {};

Skills.defaultProps = {};

export default Skills;
