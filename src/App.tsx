import React from 'react';
import WebApp from '@twa-dev/sdk'
import './App.css';

function App() {
  WebApp.ready();

  return (
      <div className="App">
          <div>
              <div>
                  <p>User Data:</p>
                  <pre>{WebApp.initData}</pre>
              </div>
          </div>
      </div>
  );
}

export default App;
