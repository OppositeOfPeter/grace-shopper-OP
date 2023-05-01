import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from './products';
import reviews from './reviews';
<<<<<<< HEAD
import orders from './orders';
=======
>>>>>>> 3fb988ce594e03d133857df89499d56983c8f8ae

const reducer = combineReducers({
	auth,
	cart,
	products,
	reviews,
<<<<<<< HEAD
	orders
=======
>>>>>>> 3fb988ce594e03d133857df89499d56983c8f8ae
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './products';
<<<<<<< HEAD
export * from './orders';
=======
>>>>>>> 3fb988ce594e03d133857df89499d56983c8f8ae
export * from './reviews';
