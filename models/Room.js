const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "./database.db" });
class Room extends Model {}

Room.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		unique_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		prefix: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		sufix: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize, // Connection instance
		modelName: "Room", //Model name
	}
);

module.exports = { Room };
