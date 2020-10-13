import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
import styles from './GitHubCard.module.scss';
import 'holderjs';
import moment from 'moment';
import { kebab } from 'case';


const getLanguageIcon = (language) => {
  switch (language) {
    case "JavaScript":
      return "js"
    case "Swift":
      return "swift"
    case "TypeScript":
      return "node"
    case "CSS":
      return "css"
    case "CSS3":
      return "css3"
    case "PHP":
      return "php"
    case "HTML":
      return "html"
    case "Shell":
      return "shell"
    default:
      return "blank"
  }
}

const GitHubCard = (props) => (
  <a href={props.link}>
  <Card type={kebab(props.language)} className={[styles.GitHubCard]}>
    <Card.Header className={[styles.GitHubCardHeader, styles["language-" + kebab(props.language)]]}>
      <svg title={props.language} alt={props.language} className={styles.GitHubCardHeaderLogo} aria-hidden="true">
        <use href={'images/svg-icons/' + getLanguageIcon(props.language) + '.svg#icon'}></use>
      </svg>
      {props.language}
    </Card.Header>
    {props.image && <Card.Img style={{ padding: '2em' }} variant="top" width={100} src={window.location.origin + '/images/logos/' + props.image} /> }
    <Card.Body>
      <Card.Title className={styles.CardTitle}>{props.title}</Card.Title>
      <Card.Text className={styles.CardText}>
        {props.description}
      </Card.Text>
    </Card.Body>
    {props.updated 
      && <Card.Footer className={styles.GitHubCardFooter}>
        <small>Last updated {moment(props.updated).from(moment())}</small>
      </Card.Footer>
    }
  </Card>
  </a>
);

GitHubCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  updated: PropTypes.string,
  language: PropTypes.string
};

export default GitHubCard;
