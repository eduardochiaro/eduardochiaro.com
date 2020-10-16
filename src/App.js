import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Navigation from './components/Navigation/Navigation.lazy';
import Header from './components/Header/Header.lazy';
import Jobs from './components/Jobs/Jobs.lazy';
import Bio from './components/Bio/Bio.lazy';
import Share from './components/Share/Share.lazy';
import Apps from './components/Apps/Apps.lazy';
import GitHub from './components/GitHub/GitHub.lazy';
import Footer from './components/Footer/Footer.lazy';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid style={{ margin: 0, padding: 0}}>
      <Navigation />
      <Header />
      <Bio />
      <Share />
      <Jobs />
      <Apps />
      <GitHub />
      <Footer />
    </Container>
  );
}

export default App;
