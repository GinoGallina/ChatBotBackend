import { DataTypes } from "sequelize";
// eslint-disable-next-line import/extensions
import sequelize from "../../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El campo "id" no puede ser vacio' },
        notNull: { msg: 'El campo "id" no puede ser nulo' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "El email ya esta registrado " },
      validate: {
        isEmail: { msg: "Email inválido" },
        notNull: { msg: 'El campo "email" no puede ser nulo' },
        notEmpty: { msg: "El email no puede estar vacío" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El campo "password" no puede ser nulo' },
        notEmpty: { msg: "La password no puede estar vacía" },
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

export default User;
