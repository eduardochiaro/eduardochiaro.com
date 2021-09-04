import React, { Component } from 'react'
import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Container } from 'react-bootstrap'
import { github } from '../../resources/api'
import GitHubCard from '../Elements/GitHubCard/GitHubCard.lazy'
import styles from './GitHub.module.scss'

class GitHub extends Component {
  constructor() {
    super()
    this.state = { data: [], total: 0 }
  }

  async componentDidMount() {
    try {
      const response = await github()
      console.log(response.data)
      const cutReposene = response.data.results.filter((data) => !data.archived).slice(0, 6)
      this.setState({ data: cutReposene, total: response.data.length })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { total, data } = this.state;
    return (
      <section id="github" className={`${styles.GitHub} white`}>
        <Container>
          <Row>
            <Col md={3} className="text-center d-sx-none">
              <FontAwesomeIcon
                icon={faGithub}
                size="10x"
                className={styles.GitHubIcon}
              />
            </Col>
            <Col md={9}>
              <h3>
                Latest repositories
                <span className="badge badge-info align-text-top">
                  {total} total
                </span>
              </h3>
              <div>
                <CardColumns>
                  {data.map((repo) => (
                      <GitHubCard
                        key={repo.name}
                        title={repo.name}
                        description={repo.description}
                        updated={repo.updated_at}
                        language={repo.language}
                        link={repo.html_url}
                        id={repo.id}
                      />
                    ))}
                </CardColumns>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

GitHub.defaultProps = {}

export default GitHub
