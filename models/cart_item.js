const Sequelize = require('sequelize').Sequelize;

const { sequelize } = require('../utils/db');

exports.CartItem = sequelize.define('cartItem', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	quantity: Sequelize.INTEGER
})
