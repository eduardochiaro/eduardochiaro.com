import React from 'react'
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import styles from './Footer.module.scss'

const Footer = () => (
  <footer id="footer" className="mt-5 bg-secondary">
    <Container>
      <Row>
        <Col md={12} className="text-center my-4 text-white">
          <FontAwesomeIcon icon={faCopyright}/> Copyright { moment().year() } 
          <svg className={`${styles.logo} mx-2`} aria-hidden="true">
            <use href={`${window.location.origin}/images/logo.svg#logo`} />
          </svg>
          Eduardo Chiaro
        </Col>
      </Row>
    </Container>
  </footer>
)

// Footer.propTypes = {};

Footer.defaultProps = {}

export default Footer
