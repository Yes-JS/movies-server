const Sequelize = require('sequelize').Sequelize;

const { sequelize } = require('../utils/db');

exports.User = sequelize.define('user', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
		noUpdate: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	role: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});
