import React, { useEffect, useRef } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import ProductsList from './ProductList'; //NR
import Profile from './Profile';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchProducts } from '../store';
import { Link, Routes, Route } from 'react-router-dom';


const App = () => {
	
	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();
	const prevAuth = useRef({});
	
	useEffect(() => {
		dispatch(loginWithToken());
	}, []);

	/*useEffect(() => {
		if (auth.id) {
			dispatch(fetchCart());
		}
	}, [auth]);*/
	
    useEffect(()=> {
      if(!prevAuth.current.id && auth.id){
        console.log('logged in');
        dispatch(fetchCart());
      }
      if(prevAuth.current.id && !auth.id){
        console.log('logged out');
      }
    }, [auth]);

  useEffect(()=> {
    prevAuth.current = auth;
  });

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
					</nav>
					<Routes>
						<Route path="/cart" element={<Cart />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</div>
			)}
			{<ProductsList />}
		</div>
	);
};


export default App;
