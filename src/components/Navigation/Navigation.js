import React from 'react';
//import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <Navbar variant="dark" expand="lg" className={styles.Navigation} sticky="top">
    <Navbar.Brand href="#home">
      <svg title="Eduardo Chiaro" alt="Eduardo Chiaro" className={styles.NavigationLogo} aria-hidden="true">
        <use href={window.location.origin + '/images/logo.svg#logo'}></use>
      </svg>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
      <Nav.Link href="#work">Work</Nav.Link>
      <Nav.Link href="#apps">Apps</Nav.Link>
      <Nav.Link href="#github">GitHub</Nav.Link>
      <Nav.Link href="https://blog.eduardochiaro.com/">.dev</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

//Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
