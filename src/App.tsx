import React from 'react';
import WebApp from '@twa-dev/sdk'
// @ts-ignore
import logo from './logo.svg';
import './App.css';

function App() {
  WebApp.ready();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
