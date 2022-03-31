const Sequelize = require('sequelize').Sequelize;

const { sequelize } = require('../utils/db');

exports.Cart = sequelize.define('cart', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	}
})
