import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './shared/layout/header/header';
import Footer from './shared/layout/footer';
import Home from './modules/home/home';
import AppRoutes from './routers/routes';
import Login from './modules/login/login';
import ErrorPage from './shared/error/error';
import { useAppSelector } from './config/store';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatButton, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Cart } from './entities/cart/Cart';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function App() {


  return (
    <>
      <BrowserRouter>
        <Helmet>
          <title>Electric Store</title>
        </Helmet>
        <ToastContainer position="top-right" autoClose={1500} closeButton={true} limit={3} newestOnTop />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
