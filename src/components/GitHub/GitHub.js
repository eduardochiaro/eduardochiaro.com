import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Container } from 'react-bootstrap'
import { github } from '../../helpers/api'
import GitHubCard from '../Elements/GitHubCard/GitHubCard.lazy'
import styles from './GitHub.module.scss'

const token = localStorage.getItem('token');

const GitHub = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      if(token) {
        github().then((response) => {
          if (response && response.data) {
            const cutReposene = response.data.results.filter((element) => !element.archived).slice(0, 6)
            setData( cutReposene );
            setTotal( response.data.results.length );
          }
        });
      }
    } catch (err) {
      console.log(err)
    }
  }, [token]);

  return (
    <section id="github" className={`${styles.github} mt-5`}>
      <Container>
        <Row>
          <Col>
            <h3 className="display-6 pb-4">Latest repositories <span className="badge bg-primary align-text-top">{total} total</span></h3>
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="col-lg-4 d-none d-lg-inline text-center">
            <FontAwesomeIcon icon={faGithub} size="10x" className="mt-5 text-secondary opacity-25" />
          </Col>
          <Col md={8}>
            <Row data-masonry='{"percentPosition": true }'>
                {data.map((repo) => (
                  <GitHubCard
                    key={repo.id}
                    title={repo.name}
                    description={repo.description}
                    updated={repo.updated_at}
                    language={repo.language}
                    link={repo.html_url}
                    id={repo.id}
                    topics={repo.topics}
                  />
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

GitHub.defaultProps = {}

export default GitHub
