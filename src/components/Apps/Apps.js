import React from 'react'
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import styles from './Apps.module.scss'
import data from '../../data/apps.json'

const Apps = () => (
  <section id="apps" className={`${styles.Apps} dark`}>
    <Container>
      <Row>
        <Col md={12} className="text-center">
          <Carousel controls={false}>
            {data.map((element) => (
                <Carousel.Item
                  key={element.id}
                  className={styles.AppCard}
                  interval={1000}
                >
                  <Row>
                    <Col md={8}>
                      <img
                        className="d-block w-100"
                        src={element.image}
                        alt={element.title}
                      />
                    </Col>
                    <Col md={4}>
                      <div className={styles.cardTitle}>
                        <h3>{element.title}</h3>
                        <p>{element.short}</p>
                      </div>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  </section>
)

// Apps.propTypes = {};

Apps.defaultProps = {}

export default Apps
