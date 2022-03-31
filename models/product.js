const Sequelize = require('sequelize').Sequelize;

const { sequelize } = require('../utils/db');

exports.Product = sequelize.define('product', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
		noUpdate: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});
