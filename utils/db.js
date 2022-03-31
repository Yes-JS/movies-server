const Sequelize = require('sequelize').Sequelize;

exports.sequelize = new Sequelize(
		'learn-node',
		'root',
		'16012020Vlastiq!',
		{
			dialect: 'mysql',
			host: 'localhost'
		}
)
