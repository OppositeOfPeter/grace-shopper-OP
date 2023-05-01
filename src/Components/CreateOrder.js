import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartToOrder } from "../store";
import { useNavigate } from "react-router-dom";



const CreateOrder = () => {
    
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  console.log(cart);
	
  const createOrderFromCart = async()=> {
    await dispatch(cartToOrder());
  };


  return (
      <div>
        <button onClick={() => createOrderFromCart(cart)}>
          Create Order
        </button>
      </div>
  );
};

export default CreateOrder;