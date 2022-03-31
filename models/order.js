const Sequelize = require('sequelize').Sequelize;

const { sequelize } = require('../utils/db');

exports.Order = sequelize.define('order', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
})
