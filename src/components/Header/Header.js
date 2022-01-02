import React from 'react'
// import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
// import { Scrollchor, easeOutQuad } from 'react-scrollchor'
import SVG from 'react-inlinesvg'
import data from '../../data/header.json'
import styles from './Header.module.scss'

const Header = () => (
  <header className="sticky-lg-top">
    <Navbar variant="light" expand="lg" className={`pt-3 px-md-5 ${styles.nav}`}>
      <Container fluid>
        <Navbar.Brand href="#root" className={styles.logo}>
          <SVG title={data.title} alt={data.title} className="main-logo" src={`${window.location.origin}/images/logo-n.svg`} />
        </Navbar.Brand>
        <div className="d-lg-inline d-none">
          <Navbar>
            <Nav className="me-auto mb-2 mb-lg-0">
              <NavItem>
                <a href="#root" className="nav-link px-4 active">
                  <strong>Home</strong>
                </a>
              </NavItem>
              <NavItem>
                <a href="#skills-anchor" className="nav-link px-4">
                  <strong>Skills</strong>
                </a>
              </NavItem>
              <NavItem>
                <a href="#apps-anchor" className="nav-link px-4">
                  <strong>Apps</strong>
                </a>
              </NavItem>
              <NavItem>
                <a href="#github-anchor" className="nav-link px-4">
                  <strong>GitHub</strong>
                </a>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
        <div className={`d-flex ${styles.bloglink}`}>
          <a href="https://blog.eduardochiaro.com" className="text-decoration-none">
            <strong>
              <FontAwesomeIcon icon={faRss} className="text-primary me-2" />
              .dev
            </strong>
          </a>
        </div>
      </Container>
    </Navbar>
  </header>
)

// Header.propTypes = {};

Header.defaultProps = {}

export default Header
