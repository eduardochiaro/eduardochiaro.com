import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container } from 'react-bootstrap'
import { work } from '../../helpers/api'
import JobCard from '../Elements/JobCard/JobCard.lazy'
import styles from './Jobs.module.scss'

class Jobs extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  async componentDidMount() {
    try {
      const response = await work()
      this.setState({ data: response.data.results })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { data } = this.state
    return (
      <section id="work" className={`${styles.jobs} mt-5`}>
        <Container>
          <Row>
            <Col xl={2} md={4} xs={12} className="align-self-center">
              <h3 className="display-6 border-end border-3 border-success">
                I&apos;ve <span className="text-primary">coded</span> for...
              </h3>
            </Col>
            <Col xl={10} md={8} xs={12}>
              <div className="d-flex flex-wrap justify-content-between">
                {data.map((job) => (
                  <JobCard
                    key={job.name}
                    title={job.name}
                    image={job.logo}
                    description={job.disclaimer}
                    stylecss={job.style}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

// Jobs.propTypes = {};

Jobs.defaultProps = {}

export default Jobs
