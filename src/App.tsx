import React, {useEffect} from 'react';
import WebApp from '@twa-dev/sdk'
import { MainButton } from '@twa-dev/sdk/react';
// @ts-ignore
import logo from './logo.svg';
import './App.css';

function App() {
  WebApp.ready();

  useEffect(() => {
    console.log(WebApp.initDataUnsafe);
    console.log(WebApp.initData);
  }, []);

  return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
          </header>
          <div>
              {
                  WebApp.initData && (
                      <div>
                          <h3>Init Data</h3>
                          <pre>{JSON.stringify(WebApp.initData, null, 2)}</pre>
                      </div>
                  )
              }
          </div>
          <div>
              {
                  WebApp.initDataUnsafe && (
                      <div>
                          <h3>Init Data</h3>
                          <pre>{JSON.stringify(WebApp.initDataUnsafe, null, 2)}</pre>
                      </div>
                  )
              }
          </div>
          <MainButton text="Submit" onClick={() => alert('submitted')}/>
      </div>
  );
}

export default App;
