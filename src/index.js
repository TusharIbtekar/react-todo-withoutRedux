import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './app/store';

axios.interceptors.response.use(
  response => {
    console.log(response);
    response.data.openApi = 'Weather api interceptor test';
    return response;
  },
  error => {
    console.log(error);
  }
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
