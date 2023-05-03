// src/components/Products.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { createItem } from "../store/cart";
import SingleProduct from "./SingleProduct";
import AddProduct from "./AddProduct";

const Products = ({}) => {
  const [product, setProduct] = useState(null);
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (productId) => {
    setProduct(productId);
  };

  // Fetch the list of products when the component mounts.
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
          if (!product) return null;
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`} onClick={handleClick}>
                <img src={product.imageURL} id="cover-image" />
              </Link>
              <Link to={`/products/${product.id}`} onClick={handleClick}>
                <p>
                  Rating: {/* display the average rating for each product */}
                  {product.rating?.reduce((acc, curr) => acc + curr, 0) /
                    product.rating?.length}{" "}
                  ({product.rating?.length} reviews)
                </p>
              </Link>
              <Link to={`/products/${product.id}`} onClick={handleClick}>
                <h4>{product.title}</h4>
              </Link>
              <p>by: {product.author}</p>
              <button onClick={() => createLineItem(product)}>
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
      {product && <SingleProduct productId={product} />}
    </div>
  );
};

export default Products;
