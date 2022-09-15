import React, { Component, Fragment } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import MainPage from "./pages/MainPage";
import CategoryPage from "./pages/CategoryPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';
import CartPage from "./pages/CartPage";
import ProductMngPage from "./pages/ProductMngPage";
import Header from './components/Header';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/category/:id" element={<CategoryPage/>}/>
        <Route path="/detail/:id" element={<DetailPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/productMng" element={<ProductMngPage/>}/>
      </Routes>
    </Fragment>
  )
}

export default App;