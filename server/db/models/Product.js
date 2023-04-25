const conn = require('../conn');
const { STRING, UUID, UUIDV4, ENUM, DATEONLY, TEXT } = conn.Sequelize;
// Products = Books
// Do we want a separate folder ./db/models for all the models?

const Product = conn.define('product', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	title: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	author: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	publishedDate: {
		type: DATEONLY,
		allowNull: false,
	},
	genre: {
		type: ENUM('Fiction', 'Nonfiction'),
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	description: {
		type: TEXT,
		allowNull: true,
	},
	imageUrl: {
		type: STRING,
		defaultValue: 'https://www.bookdeal.com/images/no-image.png',
	},
});

module.exports = Product;
