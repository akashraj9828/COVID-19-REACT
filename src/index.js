import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from '@sentry/browser';

if(process.env.NODE_ENV==="production"){
  Sentry.init({dsn: "https://b3bdda1ebf8345c6a999e0b822d1d18b@o380288.ingest.sentry.io/5227858"});
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
