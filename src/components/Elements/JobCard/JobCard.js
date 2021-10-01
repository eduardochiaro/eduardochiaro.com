import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Placeholder from 'react-bootstrap/Placeholder'
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

const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark"
];

const JobCard = (props) => {
  const { image, title, description, stylecss, placeholder } = props
  const bodyStyle = description ? '' : 'd-none'
  const color = colors[Math.floor(Math.random()*colors.length)];
  if (placeholder) {
    return (
      <Card className={[styles.JobCard, 'bg-transparent mx-md-4 mx-2 border-0']}>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={6} bg={color} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} bg={color} /> <Placeholder bg={color} xs={4} /> <Placeholder bg={color} xs={4} />{' '}
        <Placeholder xs={6} bg={color} /> <Placeholder bg={color} xs={8} />
      </Placeholder>
      </Card>
    )
  }
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
  placeholder: false
}

JobCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  stylecss: PropTypes.objectOf(PropTypes.any),
  placeholder: PropTypes.bool,
}

export default JobCard
