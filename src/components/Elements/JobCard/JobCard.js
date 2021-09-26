import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import 'holderjs'
import styles from './JobCard.module.scss'

function CardImage(props) {
  const { image, title, description, stylecss } = props
  if (image) {
    if (description) {
      return (
        <OverlayTrigger overlay={<Tooltip>{description}</Tooltip>}>
          <img
            style={stylecss}
            className={`${styles['card-img']} card-img`}
            alt={title}
            src={`${window.location.origin}/images/logos/${image}`}
          />
        </OverlayTrigger>
      )
    }
    return (
      <img
        style={stylecss}
        className={`${styles['card-img']} card-img`}
        alt={title}
        src={`${window.location.origin}/images/logos/${image}`}
      />
    )
  }
  return null
}

const JobCard = (props) => {
  const { image, title, description, stylecss } = props
  const bodyStyle = description ? '' : 'd-none'
  return (
    <Card className={[styles.JobCard, 'bg-transparent mx-md-4 mx-2 border-0']}>
      <CardImage image={image} stylecss={stylecss} description={description} title={title} />
      <Card.Body className={bodyStyle}>
        <Card.Title className="d-none">{title}</Card.Title>
        <Card.Text className="d-md-none d-block">{description}</Card.Text>
      </Card.Body>
      {description && (
        <Card.Footer className={`${styles['card-footer']} d-md-block d-none`}>
          <FontAwesomeIcon icon={faStarOfLife} className="text-primary" />
        </Card.Footer>
      )}
    </Card>
  )
}

JobCard.defaultProps = {
  image: '',
  title: '',
  description: '',
  stylecss: {},
}

JobCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  stylecss: PropTypes.objectOf(PropTypes.any),
}

export default JobCard
