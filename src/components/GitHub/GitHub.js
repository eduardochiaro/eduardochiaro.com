import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Container } from 'react-bootstrap'
import { github } from '../../helpers/api'
import GitHubCard from '../Elements/GitHubCard/GitHubCard.lazy'
import styles from './GitHub.module.scss'

const GitHub = ({ token }) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    try {
      if (token) {
        github(token).then((response) => {
          if (response && response.data) {
            const cutReposene = response.data.results
              .filter((element) => !element.archived)
              .slice(0, 7)
            setData(cutReposene)
            setTotal(response.data.results.length)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }, [token])

  return (
    <section id="github" className={`${styles.github} mt-5 pb-5`}>
      <Container>
        <Row>
          <Col>
            <h3 className="display-6 pb-4">
              Latest repositories{' '}
              <span className="badge bg-primary align-text-top">{total} total</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row>
              <Col sm={4} xl={3} className="d-none d-lg-inline text-center">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="10x"
                  className="mt-5 text-secondary opacity-25"
                />
              </Col>
              {data && data.length > 0
                ? data.map((repo) => (
                    <GitHubCard
                      key={repo.id}
                      title={repo.name}
                      description={repo.description}
                      updated={repo.updated_at}
                      language={repo.language || 'Code'}
                      link={repo.html_url}
                      id={repo.id}
                      topics={repo.topics}
                      placeholder={false}
                    />
                  ))
                : [
                    ...Array(7)
                      .fill()
                      .map((_, idx) => 0 + idx),
                  ].map((x) => (
                    <GitHubCard
                      key={x}
                      title=""
                      description=""
                      updated=""
                      language=""
                      link=""
                      id={1}
                      topics={[]}
                      placeholder
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
