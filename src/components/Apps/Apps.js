import React from 'react';
//import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Apps.module.scss';
import data from '../../data/apps.json';

const Apps = () => (
  <section id="apps" className={`${styles.Apps} dark`}>
    <Container>
      <Row>
        <Col xs={12} className="text-center">
          <Carousel controls={false}>
          {data.map((element, index) => {
            return (
              <Carousel.Item key={index} className={styles.AppCard} interval={1000}>
                <Row>
                  <Col xs={8}>
                  <img
                    className="d-block w-100"
                    src={element.image}
                    alt={element.title}
                  />
                  </Col>
                  <Col xs={4}>
                    <div className="pt-4">
                      <h3>{element.title}</h3>
                      <p>{element.short}</p>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            )
          })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  </section>
);

//Apps.propTypes = {};

Apps.defaultProps = {};

export default Apps;
