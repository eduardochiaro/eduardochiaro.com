import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Share.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Container } from 'react-bootstrap';

const Share = () => (
  <section className={`${styles.Share} grey text-center`} style={{padding: '0'}}>
    <Container>
      <Row>
        <Col>
          <ul className={styles.icons}>
            <li><a href="https://twitter.com/eduardochiaro"><FontAwesomeIcon icon={faTwitter} size="3x" className={styles.icon} /></a></li>
            <li><a href="https://linkedin.com/in/eduardochiaro"><FontAwesomeIcon icon={faLinkedinIn} size="3x" className={styles.icon} /></a></li>
            <li><a href="https://github.com/eduardochiaro"><FontAwesomeIcon icon={faGithub} size="3x" className={styles.icon} /></a></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </section>
);


Share.defaultProps = {};

export default Share;
