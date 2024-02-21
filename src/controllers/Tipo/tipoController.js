/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import {
  create,
  deleteSoft,
  getAll,
  getAllWithDeleted,
  getOne,
} from "../../services/Tipo/tipoService.js";
import { hanldeError } from "../../utls/handleError.js";

export const getAllTipos = async (req, res) => {
  console.log(req.cookies);
  console.log(req.isAuthenticated());
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  try {
    const tipos = await getAll();
    rta.data = tipos;
    rta.mensaje = ["Exito al traer los tipos"];
    rta.success = true;

    // throw new Error("error frozado");
    res.status(200).json(rta);
  } catch (error) {
    console.log(error);
    rta.success = false;
    rta.data = null;
    rta.mensaje = [`Error al traer los tipos: ${error.message}`];
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
    rta.mensaje = ["Exito al traer los tipos"];
    rta.success = true;

    res.status(200).json(rta);
  } catch (error) {
    rta.success = false;

    console.log(error);
    rta.mensaje = [`Error al traer los tipos ${error.message}`];
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
      rta.mensaje = ["Tipo no encontrado"];
      rta.success = false;

      res.status(404).json(rta);
    } else {
      rta.data = tipo;
      rta.mensaje = ["Exito al traer el tipo"];
      rta.success = true;

      res.status(200).json(rta);
    }
  } catch (error) {
    rta.success = false;

    console.log(error);
    rta.data = null;
    rta.mensaje = [`Error al traer el tipo ${error.message}`];
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
    rta.mensaje = ["Tipo creado con exito"];
    res.status(200).json(rta);
  } catch (error) {
    const { mensaje, codigoError } = hanldeError(error);
    rta.success = false;
    rta.mensaje = mensaje;
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
      rta.success = false;
      res.status(404).json(rta);
    } else {
      rta.data = id;
      rta.mensaje = "Exito al borrar el tipo";
      rta.success = true;
      res.status(200).json(rta);
    }
  } catch (error) {
    console.log(error);
    rta.mensaje = "Error interno al borrar el tipo";
    res.status(500).json(rta);
    rta.success = false;
  }
};
