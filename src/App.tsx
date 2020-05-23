import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import ParagrafoExemplo from './screens/Home/style';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <Home />
        <ParagrafoExemplo />
      </header>
    </div>
  );
}

export default App;
