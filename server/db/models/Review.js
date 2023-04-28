const conn = require('../conn');
const { STRING, TEXT, UUID, UUIDV4 } = conn.Sequelize;

const Review = conn.define('review', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	review: {
		type: TEXT,
		allowNull: false,
	},
	userId: {
		type: UUID,
		allowNull: false,
	},
	productId: {
		type: UUID,
		allowNull: false,
	},
});

module.exports = Review;