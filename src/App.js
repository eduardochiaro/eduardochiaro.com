import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.lazy';
import Body from './components/Body/Body.lazy';
import GitHub from './components/GitHub/GitHub.lazy';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Header />
      <Body />
      <GitHub />
    </Container>
  );
}

export default App;
