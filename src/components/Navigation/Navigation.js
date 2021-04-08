import React from 'react'
// import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import Scrollchor from 'react-scrollchor'
import styles from './Navigation.module.scss'

const Navigation = () => (
  <Navbar variant="dark" expand="lg" className={styles.Navigation} sticky="top">
    <Navbar.Brand href="#home" className="m-0 p-0">
      <svg
        title="Eduardo Chiaro"
        alt="Eduardo Chiaro"
        className={styles.logo}
        aria-hidden="true"
      >
        <use href={`${window.location.origin}/images/logo.svg#logo`} />
      </svg>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <NavItem className="active">
          <Scrollchor to="" className="nav-link">
            Home
          </Scrollchor>
        </NavItem>
        <NavItem>
          <Scrollchor to="#work" className="nav-link">
            Work
          </Scrollchor>
        </NavItem>
        <NavItem>
          <Scrollchor to="#apps" className="nav-link">
            Apps
          </Scrollchor>
        </NavItem>
        <NavItem>
          <Scrollchor to="#github" className="nav-link">
            GitHub
          </Scrollchor>
        </NavItem>
        <Nav.Link href="https://blog.eduardochiaro.com/">
          <FontAwesomeIcon icon={faRss} className={styles.rss} /> .dev
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

// Navigation.propTypes = {};

Navigation.defaultProps = {}

export default Navigation
