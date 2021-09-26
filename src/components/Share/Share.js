import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Container, Nav } from 'react-bootstrap'
import styles from './Share.module.scss'

const Share = () => (
  <section className={`${styles.Share} mt-5 bg-success text-white`}>
    <Container>
      <Row>
        <Col>
          <Nav
            className={`nav justify-content-evenly justify-content-lg-center py-4 ${styles['social-icons']}`}
          >
            <Nav.Item>
              <Nav.Link
                href="https://twitter.com/eduardochiaro"
                className="text-white px-md-5 px-3"
              >
                <FontAwesomeIcon icon={faTwitter} size="3x" />
                <div className="d-none">Twitter</div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="https://linkedin.com/in/eduardochiaro"
                className="text-white px-md-5 px-3"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="3x" />
                <div className="d-none">LinkedIn</div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="https://github.com/eduardochiaro" className="text-white px-md-5 px-3">
                <FontAwesomeIcon icon={faGithub} size="3x" />
                <div className="d-none">GitHub</div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  </section>
)

Share.defaultProps = {}

export default Share
