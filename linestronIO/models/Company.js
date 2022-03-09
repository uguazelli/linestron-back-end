const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "./database.db" });
const { Room } = require("./Room");
class Company extends Model {}

Company.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		account_expire_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize, // Connection instance
		modelName: "Company", //Model name
	}
);

Room.belongsTo(Company);
Company.hasMany(Room);

module.exports = { Company };
