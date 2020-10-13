import React, { Component } from 'react';
import styles from './GitHub.module.scss';
import GitHubCard from '../Cards/GitHubCard/GitHubCard.lazy';
import CardColumns from 'react-bootstrap/CardColumns';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import findUserRepos from '../../resources/github';

class GitHub extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    try {
      const response = await findUserRepos(`eduardochiaro`);
      const cutReposene = response.data.slice(0,6);
      this.setState({ data: cutReposene });
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Row>
        <Col xs={3}>
            GitHub Component
        </Col>
        <Col>
          <div className={styles.GitHub}>
            <CardColumns>
            {this.state.data.map((repo, index) => {
              return <GitHubCard key={index} title={repo.name} description={repo.description} updated={repo.updated_at} language={repo.language} link={repo.html_url} />
            })}
            </CardColumns>
          </div>
        </Col>
      </Row>
    );
  }
}

GitHub.defaultProps = {};

export default GitHub;
