import React from 'react';
import styles from './Header.module.scss';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import data from '../../data/header.json';

const Header = () => (
  <div className={styles.Header}>
    <Jumbotron className={`rounded-0 ${styles.jumbotron}`} >
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
  </div>
);

export default Header;
