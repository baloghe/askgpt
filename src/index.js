import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App';

import {preSet} from "./logic/preset.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App preSet={preSet} />
  </React.StrictMode>
);
