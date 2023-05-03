const conn = require('../conn');
const { STRING, TEXT, UUID, UUIDV4, ENUM } = conn.Sequelize;

const Review = conn.define('review', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	title: {
		type: STRING,
		allowNull: false,
	},
	content: {
		type: TEXT,
		allowNull: true,
	},
	rating: {
		type: ENUM('1', '2', '3', '4', '5'),
		allownull: false,
	},
	userId: {
		type: UUID,
		allowNull: false,
	},
	productId: {
		type: UUID,
		allowNull: false,
	},
	date: {
		type: STRING,
		allowNull: false,
	},
	status: {
		type: ENUM('APPROVED', 'PENDING', 'DENIED'),
		allowNull: false,
		defaultValue: 'PENDING',
	},
});

module.exports = Review;
