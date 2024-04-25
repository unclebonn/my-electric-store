import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import getStore from './config/store';
import { Provider, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = getStore()
const cookie = new Cookies()

const onRequestSuccess = (config: any) => {
  const token = cookie.get("jwt-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
// Thêm interceptor cho các yêu cầu trước khi gửi
axios.interceptors.request.use(onRequestSuccess);

root.render(
  <Provider store={store}>
    <App />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
