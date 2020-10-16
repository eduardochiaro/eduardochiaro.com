import React, { Component } from 'react';
import styles from './GitHub.module.scss';
import GitHubCard from '../Cards/GitHubCard/GitHubCard.lazy';
import CardColumns from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import findUserRepos from '../../resources/github';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Container } from 'react-bootstrap';

class GitHub extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    try {
      const response = await findUserRepos(`eduardochiaro`);
      const cutReposene = response.data.slice(0,6);
      this.setState({ data: cutReposene, total: response.data.length });
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <section id="github" className={`${styles.GitHub} white`}>
        <Container>
          <Row>
            <Col lg={3} className="text-center d-sx-none">
              <FontAwesomeIcon icon={faGithub} size="10x" className={styles.GitHubIcon} />
            </Col>
            <Col lg={9}>
              <h3>Latest repositories<span className="badge badge-info align-text-top">{this.state.total} total</span></h3>
              <div>
                <CardColumns>
                {this.state.data.map((repo, index) => {
                  return <GitHubCard key={index} title={repo.name} description={repo.description} updated={repo.updated_at} language={repo.language} link={repo.html_url} />
                })}
                </CardColumns>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

GitHub.defaultProps = {};

export default GitHub;
