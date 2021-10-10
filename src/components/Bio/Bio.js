import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import SVG from 'react-inlinesvg'
import styles from './Bio.module.scss'
// import data from '../../data/header.json'

const Bio = () => (
  <section id="bio" className={styles.bio}>
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} xs={12}>
          <h1>
            I&apos;m <span className="text-primary">Eduardo</span>,
          </h1>
          <h2>
            a <FontAwesomeIcon icon={faCoffee} size="xs" className="text-secondary" /> coffee-driven
            Software Developer based in Washington State.
          </h2>
        </Col>
        <Col lg={4} className={`d-none d-lg-inline ${styles['bg-website-image']}`}>
          <SVG src={`${window.location.origin}/images/bgs/integration.svg`} />
        </Col>
      </Row>
    </Container>
  </section>
)

export default Bio
