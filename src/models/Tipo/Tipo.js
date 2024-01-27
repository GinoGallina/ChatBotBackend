import { DataType, DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Tipo = sequelize.define("Tipo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Tipo;
