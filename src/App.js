import React, { Component, Fragment, useState } from 'react'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes, useHistory} from "react-router-dom";

import MainPage from "./pages/MainPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import ProductMngPage from "./pages/ProductMngPage";
import SignupPage from './pages/SignupPage';
import Header from './components/Header';

const App = () => {

  const [productList, setProductList] = useState([]);  // 상품 리스트
  const [productDetail, setProductDetail] = useState({});  // 상품 상세

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/category/:categoryId" element={<ListPage productList={productList} setProductList={setProductList}/>}/>
        <Route path="/detail/:id" element={<DetailPage productList={productList} productDetail={productDetail} setProductDetail={setProductDetail}/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/productMng" element={<ProductMngPage productList={productList} setProductList={setProductList}/>}/>
      </Routes>
    </Fragment>
  )
}

export default App;