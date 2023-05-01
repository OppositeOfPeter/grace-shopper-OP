// src/components/Products.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { createItem } from '../store/cart';

const Products = () => {
	const { products, cart } = useSelector((state) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Fetch the list of products when the component mounts.
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const createLineItem = async (product) => {
		await dispatch(createItem({ product, quantity: 1 }));
		navigate('/cart');
	};

// I want to use this in the return statement below...but product.rating is undefined
	
	// const productRating = product.rating?.reduce((acc, curr) => acc + curr, 0) /
	// 	product.rating?.length;
	// const productRatingLength = product.rating?.length;
	// const productRatingDisplay = productRating ? (
	// 	<p>
	// 		Rating: {productRating} ({productRatingLength} reviews)
	// 	</p>
	// 	) : null;
		
	return (
		<div>
			<ul>
				{products.map((product) => {
					if (!product) return null;
					return (
						<li key={product.id}>
							<Link to={`/products/${product.id}`}>
								<img src={product.imageURL} />
							</Link>
							<Link to={`/products/${product.id}`}>
								{/* display the average rating for each product */}
								<p>
									Rating:
									{product.rating?.reduce((acc, curr) => acc + curr, 0) /
										product.rating?.length}{' '}
									({product.rating?.length} reviews)
								</p>
							</Link>
							<Link to={`/products/${product.id}`}>
								<h4>{product.title}</h4>
							</Link>
							<p>by: {product.author}</p>
							<button onClick={() => createLineItem(product)}>Add to Cart</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Products;
