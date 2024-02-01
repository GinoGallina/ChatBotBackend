// eslint-disable-next-line import/extensions
import Tipo from "../../models/Tipo/Tipo.js";

export const getAll = async () => {
  const tipos = await Tipo.findAll({ where: { deleted_at: null } });
  return tipos;
};

export const getAllWithDeleted = async () => {
  const tipos = await Tipo.findAll();
  return tipos;
};

export const crearTipo = async (tipoData) => {
  const newTipo = Tipo.create(tipoData);
  return newTipo;
};

export const eliminarTipo = async (tipoId) => {
  // Realizar eliminación suave (soft delete) configurando la columna 'deleted_at'
  await Tipo.destroy({ where: { id: tipoId } });
};
