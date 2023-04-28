import React from "react";
import { useSelector } from "react-redux";

const Order = () => {
  const { order } = useSelector((state) => state);
  return (
    <div>
      <h1>Orders</h1>
      <ul>{}</ul>
    </div>
  );
};

export default Order;
