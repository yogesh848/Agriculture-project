import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { Products } from "./Pages/Products";
import { Cart } from "./Pages/Cart";
import  Payment  from "./Pages/Payment";
import { Orders } from "./Pages/Orders";

import { About } from "./Pages/About";

// Debug: Log imports
console.log("Payment component:", Payment);
console.log("Orders component:", Orders);

function App() {
  console.log("App component rendering");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
       
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
