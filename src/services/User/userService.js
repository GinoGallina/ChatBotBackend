// eslint-disable-next-line import/extensions
import User from "../../models/User/User.js";

export const getAll = async () => {
  const Users = await User.findAll();
  return Users;
};

// export const getOne = async (id) => {
//   const User = await User.findOne({ where: { deleted_at: null, id } });
//   return User;
// };
export const getAllWithDeleted = async () => {
  const Users = await User.findAll({ paranoid: false });
  return Users;
};

export const getOne = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

export const findOneEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export const create = async (UserData) => {
  const newUser = User.create(UserData);
  return newUser;
};

export const deleteSoft = async (UserId) => {
  // Realizar eliminación suave (soft delete) configurando la columna 'deleted_at'
  const borrado = await User.destroy({ where: { id: UserId } });
  return borrado;
};
