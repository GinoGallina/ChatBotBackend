import { DataTypes } from "sequelize";
// eslint-disable-next-line import/extensions
import sequelize from "../../config/db.js";

const Tipo = sequelize.define(
  "Tipo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "La descripcion debe ser única " },
      validate: {
        notNull: { msg: 'El campo "descripcion" no puede ser nulo' },
        notEmpty: { msg: "La descripción no puede estar vacía" },
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

export default Tipo;
