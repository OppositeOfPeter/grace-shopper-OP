import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom';
import { createItem, fetchProducts } from "../store";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const createLineItem = async (product) => {
    await dispatch(createItem({ product, quantity: 1 }));
    navigate("/cart");
  };

  return (
    <div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {/* <img src={product.imageURL}/> */}
              <h4>{product.title}</h4>
              <p>by: {product.author}</p>
              <button onClick={() => createLineItem(product)}>
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
