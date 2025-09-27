const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    catName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "Category",
    freezeTableName: true,
  }
);

Category.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Category, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Category;
