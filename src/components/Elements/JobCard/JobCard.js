import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import 'holderjs'
import styles from './JobCard.module.scss'

function CardImage(props) {
  const { image, title, description, stylecss } = props;
  if (image) {
    if (description) {
      return (
        <OverlayTrigger overlay={<Tooltip>{description}</Tooltip>}>
          <img
            style={stylecss}
            className="card-img-top"
            alt={title}
            src={`${window.location.origin}/images/logos/${image}`}
          />
        </OverlayTrigger>
      )
    }
      return (
        <img
          style={stylecss}
          className="card-img-top"
          alt={title}
          src={`${window.location.origin}/images/logos/${image}`}
        />
      )

  }
  return null
}

const JobCard = (props) => {
  const { image, title, description, stylecss } = props;
  return (
    <Card className={[styles.JobCard, 'border-0']}>
      <CardImage
        image={image}
        stylecss={stylecss}
        description={description}
        title={title}
      />
      {description && (
        <span className="d-none d-sm-block text-right">*</span>
      )}
      <Card.Body className="d-sm-none">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
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
  stylecss: PropTypes.shape,
}

export default JobCard
