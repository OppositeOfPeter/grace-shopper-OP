// create a reviews component that will render the reviews for a product
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../store';
import { Link, useNavigate } from 'react-router-dom';

const Reviews = ({ product }) => {
	const { reviews, auth } = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Fetch the list of reviews when the component mounts.
	useEffect(() => {
		dispatch(fetchReviews());
	}, []);

	// only show reviews for the product that is currently being viewed
	const productReviews = reviews.filter(
		(review) => review.productId === product.id
	);

	return (
		<div>
			<br />
			<ul>
				{productReviews.map((review) => {
					if (!review) return null;
					return (
						<li key={review.id}>
							<p>Reviewed by: {auth.username}</p>
							<h4>
								{review.title} ({review.rating})
							</h4>
							<p>{review.date}</p>
							<p>{review.content}</p>
							<p>{review.status}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Reviews;
