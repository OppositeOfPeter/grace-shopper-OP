const conn = require('./conn');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');
// Importing products data from ProductData.js...NR
const products = require('./ProductData');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const syncAndSeed = async () => {
	await conn.sync({ force: true });
	const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
		User.create({ username: 'moe', password: '123' }),
		User.create({ username: 'lucy', password: '123' }),
		User.create({ username: 'larry', password: '123' }),
		// Remove following 3 lines (products) after group approval...NR
		// Product.create({ name: 'foo' }),
		// Product.create({ name: 'bar' }),
		// Product.create({ name: 'bazz' }),
		User.create({ username: 'ethyl', password: '123' }),
	]);
	// Mapping over the products var, imported from ./db/ProductData.js for seeding...NR
	await Promise.all(products.map((product) => Product.create(product)));

	// const cart = await ethyl.getCart();
	// await ethyl.addToCart({ product: bazz, quantity: 3 });
	// await ethyl.addToCart({ product: foo, quantity: 2 });
	// return {
	// 	users: {
	// 		moe,
	// 		lucy,
	// 		larry,
	// 	},
	// 	products: {
	// 		foo,
	// 		bar,
	// 		bazz,
	// 	},
	// };
};

module.exports = {
	syncAndSeed,
	User,
	Product,
};
