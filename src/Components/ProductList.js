import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
							<Link to={`/products/${product.id}`}>
								<img src={product.imageURL} />
							</Link>
							<Link to={`/products/${product.id}`}>
								<h4>{product.title}</h4>
							</Link>
							<p>by: {product.author}</p>
							<p>${product.price}</p>
							<button>Add to Cart</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Products;
