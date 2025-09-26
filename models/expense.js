const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");
const Category = require("./category");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNul: false,
    },
    naration: {
      type: DataTypes.STRING,
      allowNul: false,
    },
    catName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Category,
        key: "catName",
      },
    },
  },
  {
    timestamps: true,
    tableName: "Expense",
    freezeTableName: true,
  }
);

Expense.belongsTo(Category, {
  foreignKey: "catName",
  targetKey: "catName",
  onDelete: "CASCADE",
});
Expense.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = Expense;
