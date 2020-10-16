import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import styles from './JobCard.module.scss';
import 'holderjs';

function CardImage(props) {
  if (props.image) {
    if (props.description) {
      return ( 
        <OverlayTrigger
          overlay={
            <Tooltip>
              {props.description}
            </Tooltip>
          }
        >
          <img style={props.stylecss} className="card-img-top" alt={props.title} src={window.location.origin + '/images/logos/' + props.image} />
        </OverlayTrigger>
      );
    } else {
      return <img style={props.stylecss} className="card-img-top" alt={props.title} src={window.location.origin + '/images/logos/' + props.image} />;
    }
  }
  return null;
}

const JobCard = (props) => (
  <Card className={[styles.JobCard, 'border-0']}>
    <CardImage image={props.image} stylecss={props.stylecss} description={props.description} title={props.title} />
    {props.description && <span className="d-block text-right font">*</span>}
    <Card.Body className="d-sm-none">
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
  updated: PropTypes.string,
  stylecss: PropTypes.object
};

export default JobCard;
