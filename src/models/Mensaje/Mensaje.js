import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Tipo from "../Tipo/Tipo.js";

const Mensaje = sequelize.define("Mensaje", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  texto: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_tipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tipo,
      key: "id",
    },
  },
});

export default Mensaje;
