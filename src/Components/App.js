import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import ProductsList from "./ProductList"; //NR
import Profile from "./Profile";
import Orders from "./Orders";
import Order from "./Order";

import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchOrders } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
      dispatch(fetchOrders());
    }
  }, [auth]);

  return (
    <div>
      <h1>Acme Shopping</h1>
      {auth.id ? <Home /> : <Login />}

      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Orders</Link>
          </nav>
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />
          </Routes>
        </div>
      )}
      {<ProductsList />}
    </div>
  );
};

export default App;
