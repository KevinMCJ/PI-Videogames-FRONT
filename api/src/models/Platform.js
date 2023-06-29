const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Platform",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
