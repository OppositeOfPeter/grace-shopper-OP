import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/singleProduct';
// import reviews

const SingleProduct = ({ productId }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { products, loading, error } = useSelector((state) => state);

	const product = products.find((product) => product.id === id);

	if (!product) {
		return null;
	}

	useEffect(() => {
		// connect for singleProduct
		dispatch(fetchProduct(productId));
	}, [dispatch, productId]);

	if (loading) {
		return <div>Calm down Homie! It's only gonna take a minute to load...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<img src={product.imageUrl} alt={product.name} />
			<h3>{product.title}</h3>
			<p>{product.author}</p>
			<p>{product.description}</p>
			<p>${product.price}</p>
			<button>Add to Cart</button>
			{/* <Reviews /> */}
		</div>
	);
};

export default SingleProduct;
