// eslint-disable-next-line import/extensions
import Tipo from "../../models/Tipo/Tipo.js";

export const getAll = async () => {
  const tipos = await Tipo.findAll();
  return tipos;
};

// export const getOne = async (id) => {
//   const tipo = await Tipo.findOne({ where: { deleted_at: null, id } });
//   return tipo;
// };
export const getAllWithDeleted = async () => {
  const tipos = await Tipo.findAll({ paranoid: false });
  return tipos;
};

export const getOne = async (id) => {
  const tipo = await Tipo.findByPk(id);
  return tipo;
};

export const create = async (tipoData) => {
  const newTipo = Tipo.create(tipoData);
  return newTipo;
};

export const deleteSoft = async (tipoId) => {
  // Realizar eliminación suave (soft delete) configurando la columna 'deleted_at'
  const borrado = await Tipo.destroy({ where: { id: tipoId } });
  return borrado;
};
