// src/components/Products.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../store/cart";
import SingleProduct from "./SingleProduct";
import SearchBar from "./SearchBar";

const Products = ({}) => {
  const [product, setProduct] = useState(null);
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleClick = (productId) => {
    setProduct(productId);
  };

  // Fetch the list of products when the component mounts.
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const createLineItem = async (product) => {

    //await dispatch(createItem({ product, quantity: 1 }));

    await dispatch(addToCart(product));

    navigate("/cart");
  };

  //for the searchbar
  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div>
        <h2>Book Search</h2>
        <p>Search by Title</p>
        <SearchBar
          data={products.map((product) => product.title)}
          onSearch={handleSearch}
        />
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <ul>
          {products.map((product) => {
            if (!product) return null;
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id}`} onClick={handleClick}>
                  <img src={product.imageUrl} id="cover-image" />
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
    </div>
  );
};

export default Products;
