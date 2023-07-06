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
        unique: {
          args: true,
          msg: "A game with this name already exists. Please choose a different name."
        },
        validate: {
          is: {
            args: /^[a-zA-Z0-9\s]+$/,
            msg: "The name must not contain special characters",
          },
          len: { args: [1, 30], msg: "Name must not exceed 30 characters." },
        },
      },
      description: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        validate: {
          len: {
            args: [10, 2000],
            msg: "Description must be between 10 and 2000 characters long",
          },
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Image must be a valid URL beginning with http:// or https://",
          },
        },
      },
      released: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: { msg: "Date must be in YYYYY-MM-DD format." },
        },
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isNumeric: { msg: "The rating must be numeric." },
          min: { args: [1], msg: "Minimum rating is 1." },
          max: { args: [5], msg: "Maximum rating is 5." },
        },
      },
    },
    { timestamps: false }
  );
};
