import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SelectProduct from "./components/SelectProduct.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Home from "./components/Home.jsx";
import Orders from "./components/Orders.jsx";
import SelectOrder from "./components/SelectOrder.jsx";

export default function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Body />} />
          <Route path="/products/:productId" element={<SelectProduct />} />
          <Route path="orders/:orderId" element={<SelectOrder />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    </Router>
  );
}
