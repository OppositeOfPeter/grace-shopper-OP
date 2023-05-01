import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import ProductsList from './ProductList';
import SingleProduct from './SingleProduct';
import Reviews from './Reviews'; // not sure if this is needed
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import {
	loginWithToken,
	fetchCart,
	fetchProducts,
	fetchReviews,
} from '../store';
import { Link, Routes, Route } from 'react-router-dom';

const App = () => {
	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loginWithToken());
	}, []);

	useEffect(() => {
		if (auth.id) {
			dispatch(fetchCart());
			dispatch(fetchProducts());
			dispatch(fetchReviews());
		}
	}, [auth]);

	return (
		<div>
			<h1>Acme Shopping</h1>
			{auth.id ? <Home /> : <Login />}

			{!!auth.id && (
				<div>
					<nav>
						<Link to="/">Home</Link>
						<Link to="/cart">Cart</Link>
						<Link to="/profile">Profile</Link>
						<Link to="/products">Products</Link>
					</nav>
					<Routes>
						<Route path="/cart" element={<Cart />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/products" element={<ProductsList />} />
						<Route path="/products/:id" element={<SingleProduct />} />
					</Routes>
				</div>
			)}
			{<ProductsList />}
		</div>
	);
};

export default App;
