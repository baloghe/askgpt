import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App';

import {preSet} from "./logic/preset.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
const myenvvar=process.env.REACT_APP_MY_ENV_VAR;

root.render(
  <React.StrictMode>
	<p>var: {myenvvar}</p>
    <App preSet={preSet} />
  </React.StrictMode>
);
