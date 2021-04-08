import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap'
import styles from './Bio.module.scss'

const Bio = () => (
  <section className={`${styles.Bio} white`}>
    <Container>
      <Row>
        <Col>
          <p>
            Hello!
            <br />
            I&apos;m Eduardo, a <FontAwesomeIcon icon={faCoffee} /> coffee driven
            Software Developer based in Washington State.
          </p>
          <p>
            I enjoy writing applications in PHP, Swift, Node.js, Angular and
            Javascript. I also like working on databases, make servers do stuff,
            working on scalability, performance, user experiences and
            desktop/mobile design.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
)

Bio.defaultProps = {}

export default Bio
