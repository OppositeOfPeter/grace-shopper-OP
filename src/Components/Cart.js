import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, fetchCart, logout } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lineItems = cart.lineItems;

  // const createLineItem = async (ev) => {
  //   ev.preventDefault();
  //   await dispatch(createItem({ quantity, productId }));
  //   navigate("/cart");
  // };

  const deleteLineItem = async (lineItem) => {
    const product = lineItem.product;
    const newQuantity = lineItem.quantity - 1;
    // const _cart = cart.lineItems.filter((_lineItem) => {
    //   console.log(lineItem);
    //   console.log(_lineItem);
    //   if (_lineItem.id !== lineItem.id) {
    //     return _lineItem;
    //   }
    //   return (_lineItem.quantity = _lineItem.quantity - 1);
    // });
    dispatch(deleteItem({ product, quantity: newQuantity }));
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
              <button onClick={(ev) => deleteLineItem(lineItem)}>-1</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
