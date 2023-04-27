import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, logout, updateCart } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lineItems = cart.lineItems;

  // needs testing
  // const createLineItem = async (ev) => {
  //   ev.preventDefault();
  //   await dispatch(createItem({ quantity, productId }));
  //   navigate("/cart");
  // };

  const deleteLineItem = async (lineItem) => {
    const product = lineItem.product;
    const newQuantity = lineItem.quantity - 1;
    dispatch(updateCart({ product, quantity: newQuantity }));
    navigate("/cart");
  };

  return (
    <div>
      <h1>Cart</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <ul>
        {lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              {lineItem.product.name} - {lineItem.quantity}
              <button onClick={(ev) => deleteLineItem(lineItem)}>x</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
