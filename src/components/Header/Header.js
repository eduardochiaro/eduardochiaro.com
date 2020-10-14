import React from 'react';
import styles from './Header.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../../data/header.json';

const Header = () => (
  <section className={`${styles.Header} grey`}>
    <Row className={[styles.jumbotron]}>
      <Col>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </Col>
    </Row>
  </section>
);

export default Header;
