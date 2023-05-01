import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import products from './products';
import reviews from './reviews';

const reducer = combineReducers({
	auth,
	cart,
	products,
	reviews,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
export * from './products';
export * from './reviews';
