const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "Notification",
    freezeTableName: true,
  }
);

Notification.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Notification, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Notification;
