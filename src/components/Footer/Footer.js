import React from 'react';
//import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Footer.module.scss';
import moment from 'moment';

const Footer = () => (
  <section id="footer" className={`${styles.Footer} dark`}>
    <Container>
      <Row>
        <Col md={12} className="text-center">
          &copy; Copyright {moment().year()} | Eduardo Chiaro
        </Col>
      </Row>
    </Container>
  </section>
);

//Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
