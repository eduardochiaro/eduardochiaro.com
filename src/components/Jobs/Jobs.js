import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container } from 'react-bootstrap'
import { work } from '../../resources/api'
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
    const { data } = this.state;
    return (
      <section id="work" className={`${styles.Jobs} white`}>
        <Container>
          <Row>
            <Col md={3} className="text-md-right text-lg-center">
              <h3>I&apos;ve coded for...</h3>
            </Col>
            <Col md={9}>
              <CardColumns>
                {data.map((job) => (
                    <JobCard
                      key={job.name}
                      title={job.name}
                      image={job.logo}
                      description={job.disclaimer}
                      stylecss={job.style}
                    />
                  ))}
              </CardColumns>
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
