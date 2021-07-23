import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #f1e4de;
  }
`;
// node v14.16.1

ReactDOM.render(
  <Provider store = {store} >
    <Global/>
    <App />
  </Provider>,
  document.getElementById('root')
);
