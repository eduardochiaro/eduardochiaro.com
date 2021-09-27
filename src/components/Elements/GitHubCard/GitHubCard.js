import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
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

const Image = ({ src, alt, fallback }) => {
  const [error, setError] = React.useState(false)

  const onError = () => {
    setError(true)
  }

  return error ? (
    <img
      className={`card-img-top ${styles['card-img-top']} ${styles['fallback-img']}`}
      src={fallback}
      alt={alt}
    />
  ) : (
    <img
      className={`card-img-top  ${styles['card-img-top']}`}
      src={src}
      alt={alt}
      onError={onError}
    />
  )
}

const GitHubCard = (props) => {
  const { link, language, title, description, updated, id, topics } = props

  const image = `${window.location.origin}/images/github/${id}.png`
  const fallbackImage = `${window.location.origin}/images/svg-icons/github.svg`

  return (
    <div className={`col-sm-6 col-lg-4 mb-4 ${styles['card-cont']}`}>
      <a href={link} id={id} className="text-decoration-none text-secondary">
        <Card type={kebab(language)} className={[styles.GitHubCard]}>
          <Card.Header
            className={[styles[`card-header`], styles[`language-${kebab(language)}`]].join(' ')}
          >
            <svg title={language} alt={language} className={styles.logo} aria-hidden="true">
              <use href={`images/svg-icons/${getLanguageIcon(language)}.svg#icon`} />
            </svg>
            {language}
          </Card.Header>
          <Image src={image} alt={title} fallback={fallbackImage} />
          <Card.Body>
            <Card.Title className={styles.title}>{title}</Card.Title>
            <Card.Text className={styles.text}>{description}</Card.Text>
            {topics.map((topic) => (
              <Badge className="bg-primary me-1" key={topic}>
                {topic}
              </Badge>
            ))}
          </Card.Body>
          {updated && (
            <Card.Footer className={styles.footer}>
              <small>Last updated {moment(updated).from(moment())}</small>
            </Card.Footer>
          )}
        </Card>
      </a>
    </div>
  )
}

GitHubCard.defaultProps = {
  id: '',
  title: '',
  description: '',
  link: '',
  updated: '',
  language: '',
  topics: [],
}

GitHubCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  updated: PropTypes.string,
  language: PropTypes.string,
  topics: PropTypes.arrayOf(PropTypes.string),
}

export default GitHubCard
