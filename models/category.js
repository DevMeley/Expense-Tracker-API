const { DataTypes, Model } = require("sequelize");
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

Category.associate = (models) => {
  Category.hasMany(models.Expense);
  Category.belongsTo(User);
};

module.exports = Category;
