import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
import styles from './GitHubCard.module.scss';
import 'holderjs';
import moment from 'moment';

const GitHubCard = (props) => (
  <Card className={styles.GitHubCard}>
    {props.image && <Card.Img style={{ padding: '2em' }} variant="top" width={100} src={window.location.origin + '/images/logos/' + props.image} /> }
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        {props.description}
      </Card.Text>
    </Card.Body>
    {props.updated 
      && <Card.Footer>
        <small className="text-muted">Last updated {moment(props.updated).from(moment())}</small>
      </Card.Footer>
    }
  </Card>
);

GitHubCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  updated: PropTypes.string
};

export default GitHubCard;
