import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, logout, deleteItem, createItem, createOrder } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lineItems = cart.lineItems;

  const deleteLineItem = async (lineItem) => {
    const product = lineItem.product;
    dispatch(deleteItem({ product, quantityToRemove: 1 }));
    navigate("/cart");
  };

  const createLineItem = async (lineItem) => {
    const product = lineItem.product;
    await dispatch(createItem({ product, quantity: 1 }));
    navigate("/cart");
  };


  return (
    <div>
      <h1>Cart</h1>
      {/* I think we can remove this line below */}
      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
      <ul>
        {lineItems.map((lineItem) => {
          return lineItem ? (
            <li key={lineItem.id}>
              {lineItem.product.title} - {lineItem.quantity}
              <button onClick={() => deleteLineItem(lineItem)}>
                remove 1 from cart
              </button>
              <button onClick={() => createLineItem(lineItem)}>
                add 1 to cart
              </button>
            </li>
          ) : (
            ""
          );
        })}
      </ul>
      <div>
        <button onClick={() => createOrderFromCart(cart)}>
          Create Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
