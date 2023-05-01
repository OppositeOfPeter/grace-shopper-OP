// this component will display a single product
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/products"; // for admin use
import { createItem } from "../store/cart";
import Reviews from "./Reviews.js";
import ReviewForm from "./ReviewForm";
import { fetchReviews } from "../store/reviews";
// import { createReview } from '../store/reviews';

// if the user is logged in, display a form to add a review
// if the user is not logged in, display a message that says
// "You must be logged in to add a review", if the user clicks on the message, they are redirected to the login page (useNavigate)
// if the user is not logged in, do not display the form to add a review
// if the user is not logged in, do not show the link to add a review

const SingleProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, reviews } = useSelector((state) => state);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return null;
  }

  /* Find the reviews for this product.

	Filter the reviews to get only the reviews that are for the
	product that we are currently viewing.

	const productReviews = reviews.filter(
		(review) => review.productId === product.id
	);

	Find the review for this product that has been approved.

	const review = reviews.find(
		(review) => review.productId === product.id && review.status === 'APPROVED'
	);

	Fetch the reviews for this product when the component mounts.
	*/

  const createLineItem = async (product) => {
    await dispatch(createItem({ product, quantity: 1 }));
    navigate("/cart");
  };

  console.log("products: ", products);
  console.log("product: ", product);

  return (
    <div>
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.author}</p>
      {/* add a link to 'rating' for adding users own review/rating...if user is logged in */}
      <p>
        Rating:
        {product.rating.reduce((acc, curr) => acc + curr, 0) /
          product.rating.length}{" "}
        ({product.rating.length} reviews)
      </p>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => createLineItem(product)}>Add to Cart</button>
      <br />
      {/* if the user is logged in, display a form to add a review */}
      {/* if the user is not logged in, display a message that says
				"You must be logged in to add a review", if the user clicks on the message, they are redirected to the login page (useNavigate) */}
      {/* if the user is not logged in, do not display the form to add a review */}
      <Reviews />
      {/* <ReviewForm /> */}
    </div>
  );
};

export default SingleProduct;
