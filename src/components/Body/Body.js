import React from 'react';
//import PropTypes from 'prop-types';
import styles from './Body.module.scss';
import JobCard from '../Cards/JobCard/JobCard.lazy';
import CardColumns from 'react-bootstrap/CardColumns';
import data from '../../data/jobs.json';

const Body = () => (
  <div className={styles.Body}>
    Jobs
    <CardColumns>
    {data.map((job, index) => {
      return <JobCard key={index} title={job.name} image={job.logo} description={job.disclaimer} />
    })}
    </CardColumns>
  </div>
);

//Body.propTypes = {};

Body.defaultProps = {};

export default Body;
