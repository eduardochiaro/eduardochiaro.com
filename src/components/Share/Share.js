import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Share.module.scss';
import { Container } from 'react-bootstrap';

const Share = () => (
  <section className={`${styles.Bio} grey text-center`} style={{padding: '2rem 0'}}>
    <Container>
      <Row>
        <Col>
          Share Component
        </Col>
      </Row>
    </Container>
  </section>
);


Share.defaultProps = {};

export default Share;
