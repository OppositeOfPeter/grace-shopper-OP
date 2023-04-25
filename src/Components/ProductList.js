import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchProducts } from '../store';

const Products = () => {
	const { products } = useSelector((state) => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<div>
			<ul>
				{products.map((product) => {
					return (
						<li key={product.id}>
							{/* <img src={product.imageURL}/> */}
							<h4>{product.title}</h4>
							<p>by: {product.author}</p>
							<button>Add to Cart</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Products;
