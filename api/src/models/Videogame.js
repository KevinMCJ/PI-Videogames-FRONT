const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    { timestamps: false }
  );
};
