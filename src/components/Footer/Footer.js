import React from 'react'
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import SVG from 'react-inlinesvg'
import data from '../../data/header.json'
import styles from './Footer.module.scss'

const Footer = () => (
  <footer id="footer">
    <Container>
      <Row>
        <Col md={12} className="text-center my-4 text-white">
          <FontAwesomeIcon icon={faCopyright} /> Copyright {moment().year()}

          <SVG title={data.title} alt={data.title} className={`${styles.logo} bottom-logo mx-2`} src={`${window.location.origin}/images/logo-n.svg`} />
          {data.title}
        </Col>
      </Row>
    </Container>
  </footer>
)

// Footer.propTypes = {};

Footer.defaultProps = {}

export default Footer
