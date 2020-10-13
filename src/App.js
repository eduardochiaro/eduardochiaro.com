import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Navigation from './components/Navigation/Navigation.lazy';
import Header from './components/Header/Header.lazy';
import Body from './components/Body/Body.lazy';
import GitHub from './components/GitHub/GitHub.lazy';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid style={{ margin: 0, padding: 0}}>
      <Navigation />
      <Header />
      <Container>
        <Body />
        <GitHub />
      </Container>
    </Container>
  );
}

export default App;
