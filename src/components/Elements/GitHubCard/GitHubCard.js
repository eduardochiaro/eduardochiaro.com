import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import moment from 'moment'
import { kebab } from 'case'
import 'holderjs'
import styles from './GitHubCard.module.scss'

const getLanguageIcon = (language) => {
  switch (language) {
    case 'JavaScript':
      return 'js'
    case 'Swift':
      return 'swift'
    case 'TypeScript':
      return 'node'
    case 'CSS':
      return 'css'
    case 'CSS3':
      return 'css3'
    case 'PHP':
      return 'php'
    case 'HTML':
      return 'html'
    case 'Shell':
      return 'shell'
    default:
      return 'blank'
  }
}

const GitHubCard = (props) => {
  const { link, language, image, title, description, updated } = props;
  return (
    <a href={link}>
      <Card type={kebab(language)} className={[styles.GitHubCard]}>
        <Card.Header
          className={[styles.header, styles[`language-${kebab(language)}`]]}
        >
          <svg
            title={language}
            alt={language}
            className={styles.logo}
            aria-hidden="true"
          >
            <use
              href={
                `images/svg-icons/${
                getLanguageIcon(language)
                }.svg#icon`
              }
            />
          </svg>
          {language}
        </Card.Header>
        {image && (
          <Card.Img
            style={{ padding: '2em' }}
            variant="top"
            width={100}
            src={`${window.location.origin}/images/logos/${image}`}
          />
        )}
        <Card.Body>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.text}>{description}</Card.Text>
        </Card.Body>
        {updated && (
          <Card.Footer className={styles.footer}>
            <small>Last updated {moment(updated).from(moment())}</small>
          </Card.Footer>
        )}
      </Card>
    </a>
  )
}

GitHubCard.defaultProps = {
  image: '',
  title: '',
  description: '',
  link: '',
  updated: '',
  language: '',
}

GitHubCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  updated: PropTypes.string,
  language: PropTypes.string,
}

export default GitHubCard
