import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { apps } from '../../helpers/api'
import styles from './Apps.module.scss'

const Apps = ({ token }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    try {
      if (token) {
        apps(token).then((response) => {
          if (response && response.data) {
            setData(response.data.results)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [token])

  return (
    <section id="apps" className={`${styles.apps} mt-5`}>
      <Container className="py-5">
        <Carousel>
          {data.map((element) => (
            <Carousel.Item key={element.id} className={styles.AppCard} interval={10000}>
              <Row>
                <Col md={8}>
                  <img
                    className="d-block w-100 ms-md-4 mx-auto"
                    src={element.image}
                    alt={element.title}
                  />
                </Col>
                <Col md={4} className="text-white text-center pt-md-5 pe-md-5">
                  <h3>{element.title}</h3>
                  <p>{element.short}</p>
                  <p>
                    <a
                      href={element.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-lg btn-secondary mt-5 border"
                    >
                      <FontAwesomeIcon icon={faGithub} size="1x" className="me-2" />
                      Download from GitHub
                    </a>
                  </p>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

// Apps.propTypes = {};

Apps.defaultProps = {}

export default Apps
