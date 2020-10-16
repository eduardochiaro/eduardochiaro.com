import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Header.module.scss';
import data from '../../data/header.json';

const Header = () => (
  <section className={`${styles.Header} grey`}>
    <Container>
      <Row className={[styles.jumbotron]}>
        <Col lg={12}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Header;
