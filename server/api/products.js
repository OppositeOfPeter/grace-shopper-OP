const express = require('express');
const app = express.Router();
const { Product } = require('../db');

module.exports = app;

// (api/products)
app.get('/', async (req, res, next) => {
	try {
		res.send(await Product.findAll());
	} catch (ex) {
		next(ex);
	}
});
