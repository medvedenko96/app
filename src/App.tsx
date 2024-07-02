import React, {useEffect} from 'react';
import WebApp from '@twa-dev/sdk'
import useTelegramDataValidation from "./Hooks/useTelegramDataValidation";

import './App.css';


const BOT_TOKEN = '7401426416:AAHdLBTASLAp9y-kV7JGFK6a_y8F8PpAMC0';

function App() {
  WebApp.ready();

  useEffect(() => {
    console.log(WebApp.initData);
  }, []);

 const [ isValid, isRecent, userData ] = useTelegramDataValidation(WebApp.initData, BOT_TOKEN)

  return (
      <div className="App">
          <div>
              {isValid ? (
                  <div>
                      <p>Data is valid!</p>
                      {isRecent ? <p>Data is recent!</p> : <p>Data is outdated.</p>}
                      <p>User Data:</p>
                      <pre>{JSON.stringify(userData, null, 2)}</pre>
                  </div>
              ) : (
                  <p>Data validation failed.</p>
              )}
          </div>
      </div>
  );
}

export default App;
