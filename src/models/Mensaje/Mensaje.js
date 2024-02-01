import { DataTypes } from "sequelize";
// eslint-disable-next-line import/extensions
import sequelize from "../../config/db.js";
// eslint-disable-next-line import/extensions
import Tipo from "../Tipo/Tipo.js";

const Mensaje = sequelize.define(
  "Mensaje",
  {
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
      validate: {
        notEmpty: true,
      },
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tipo,
        key: "id",
      },
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    paranoid: true, // Habilita el Soft Delete
    createdAt: "created_at",
    deletedAt: "deleted_at",
    updatedAt: "updated_at",
  },
);

Mensaje.belongsTo(Tipo, {
  foreignKey: "id_tipo",
  as: "tipo",
  onDelete: "CASCADE",
});

export default Mensaje;
