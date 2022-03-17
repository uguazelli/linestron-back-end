const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "./database.db" });

class User extends Model {}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize, // Connection instance
		modelName: "User", //Model name
	}
);

module.exports = { User };
