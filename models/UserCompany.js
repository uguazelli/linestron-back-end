const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "./database.db" });
const { User } = require("./User");
const { Company } = require("./Company");

class UserCompany extends Model {}

UserCompany.init(
	{
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize, // Connection instance
		modelName: "UserCompany", //Model name
	}
);
User.belongsToMany(Company, { through: UserCompany });
Company.belongsToMany(User, { through: UserCompany });

module.exports = { UserCompany };
