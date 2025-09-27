const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Budget = sequelize.define(
  "Budget",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    limit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Budget",
    freezeTableName: true,
  }
);

// Explicit foreign key
Budget.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(Budget, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Budget;
