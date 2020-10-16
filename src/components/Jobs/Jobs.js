import React from 'react';
//import PropTypes from 'prop-types';
import styles from './Jobs.module.scss';
import JobCard from '../Cards/JobCard/JobCard.lazy';
import CardColumns from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../../data/jobs.json';
import { Container } from 'react-bootstrap';

const Jobs = () => (
  <section id="work" className={`${styles.Jobs} white`}>
    <Container>
      <Row>
        <Col lg={3} className="text-md-right text-lg-center">
          <h3>I've coded for...</h3>
        </Col>
        <Col lg={9}>
          <CardColumns>
          {data.map((job, index) => {
            return <JobCard key={index} title={job.name} image={job.logo} description={job.disclaimer} stylecss={job.style} />
          })}
          </CardColumns>
          </Col>
        </Row>
    </Container>
  </section>
);

//Jobs.propTypes = {};

Jobs.defaultProps = {};

export default Jobs;
