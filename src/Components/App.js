import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import ProductsList from './ProductList';
import SingleProduct from './SingleProduct';
import Reviews from './Reviews.js'; // not sure if this is needed
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
		dispatch(fetchProducts());
	}, []);

	useEffect(() => {
		if (auth.id) {
			dispatch(fetchCart());
			dispatch(fetchReviews());
		}
	}, [auth]);

	return (
		<div>
			<h1>Acme Shopping</h1>
			{auth.id ? <Home /> : <Login />}
			{
				<div>
					<nav>
						<Link to="/">Home</Link>
						<Link to="/cart">Cart</Link>
						{!!auth.id && <Link to="/profile">Profile</Link>}
						<Link to="/products">Products</Link>
					</nav>
					<Routes>
						<Route path="/" element={<ProductsList />} />
						<Route path="/cart" element={<Cart />} />
						{!!auth.id && <Route path="/profile" element={<Profile />} />}
						<Route path="/products" element={<ProductsList />} />
						<Route path="/products/:id" element={<SingleProduct />} />
						<Route path="/products/:id/reviews" element={<Reviews />} />
					</Routes>
				</div>
			}
		</div>
	);
};

export default App;
