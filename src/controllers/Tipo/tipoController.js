// eslint-disable-next-line import/extensions
import {
  create,
  deleteSoft,
  getAll,
  getAllWithDeleted,
  getOne,
  // eslint-disable-next-line import/extensions
} from "../../services/Tipo/tipoService.js";

export const getAllTipos = async (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
  };
  try {
    const tipos = await getAll();
    rta.data = tipos;
    rta.mensaje = "Exito al traer los tipos";
    res.status(200).json(rta);
  } catch (error) {
    console.log(error);
    rta.data = null;
    rta.mensaje.push(`Error al traer los tipos${error.message}`);
    res.status(500).json(rta);
  }
};

export const getAllWithDeletedTipos = async (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
  };
  try {
    const tipos = await getAllWithDeleted();
    rta.data = tipos;
    rta.mensaje = "Exito al traer los tipos";
    res.status(200).json(rta);
  } catch (error) {
    console.log(error);
    rta.mensaje.push(`Error al traer los tipos ${error.message}`);
    rta.data = null;
    res.status(500).json(rta);
  }
};

export const getOneTipo = async (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
  };
  try {
    const { id } = req.params;
    const tipo = await getOne(id);

    // VER DE CAMBIAR ESTO,NO ME GUSTA
    if (!tipo) {
      rta.mensaje = "Tipo no encontrado";
      res.status(404).json(rta);
    } else {
      rta.data = tipo;
      rta.mensaje = "Exito al traer el tipo";
      res.status(200).json(rta);
    }
  } catch (error) {
    console.log(error);
    rta.data = null;
    rta.mensaje.push(`Error al traer el tipo ${error.message}`);
    res.status(500).json(rta);
  }
};

export const createTipo = async (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
  };
  try {
    const tipo = await create(req.body);
    rta.data = tipo;
    rta.mensaje = "Tipo creado con exito";
    res.status(200).json(rta);
  } catch (error) {
    let codigoError;
    console.log(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      codigoError = 400;
      const { errors } = error;
      errors.forEach((ValidationErrorItem) => {
        rta.mensaje.push(ValidationErrorItem.message);
      });
    } else {
      codigoError = 500;
      rta.mensaje = `Error al crear el tipo, error del Servidor`;
    }
    res.status(codigoError).json(rta);
  }
};

export const deleteTipo = async (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
  };
  try {
    const { id } = req.params;
    rta.data = null;
    const borrado = await deleteSoft(id);
    if (borrado === 0) {
      rta.mensaje = "Tipo no encontrado";
      res.status(404).json(rta);
    } else {
      rta.mensaje = "Exito al traer Borrar el tipo";
      res.status(200).json(rta);
    }
  } catch (error) {
    console.log(error);
    rta.mensaje = "Error interno al borrar el tipo";
    res.status(500).json(rta);
  }
};
