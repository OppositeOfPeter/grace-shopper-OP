import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, fetchCart, logout, updateCart } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lineItems = cart.lineItems;

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const deleteLineItem = async (lineItem) => {
    const product = lineItem.product;
    dispatch(updateCart({ product, quantityToRemove: 1 }));
    navigate("/cart");
  };

  return (
    <div>
      <h1>Cart</h1>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <ul>
        {lineItems.map((lineItem) => {
          return lineItem ? (
            <li key={lineItem.id}>
              {lineItem.product.title} - {lineItem.quantity}
              <button onClick={() => deleteLineItem(lineItem)}>
                {" "}
                remove 1 from cart
              </button>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default Cart;
