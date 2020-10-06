import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
import styles from './JobCard.module.scss';
import 'holderjs';

const JobCard = (props) => (
  <Card className={styles.JobCard}>
    {props.image && <Card.Img style={{ padding: '2em' }} variant="top" width={100} src={window.location.origin + '/images/logos/' + props.image} /> }
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        {props.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

JobCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  updated: PropTypes.string
};

export default JobCard;
