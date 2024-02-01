// eslint-disable-next-line import/extensions
import {
  crearTipo,
  getAll,
  getAllWithDeleted,
} from "../../services/Tipo/tipoService.js";

const rta = {
  data: null,
  mensaje: [],
};

export const getAllTipos = async (req, res) => {
  try {
    const tipos = await getAll();
    rta.data = tipos;
    rta.mensaje = "Exito al traer los tipos";
    res.status(200).json(rta);
  } catch (error) {
    console.log(error);
    rta.mensaje = `Error al traer los tipos${error.message}`;
    res.status(500).json(rta);
  }
};

export const getAllWithDeletedTipos = async (req, res) => {
  try {
    const tipos = await getAllWithDeleted();
    rta.data = tipos;
    rta.mensaje = "Exito al traer los tipos";
    res.status(200).json(rta);
  } catch (error) {
    console.log(error);
    rta.mensaje = `Error al traer los tipos${error.message}`;

    res.status(500).json(rta);
  }
};
export const createTipo = async (req, res) => {
  try {
    const tipo = await crearTipo(req.body);
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

// export const deleteTipo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const tipos = await getAllWithDeleted();
//     rta.data = tipos;
//     rta.mensaje = "Exito al traer los tipos";
//     res.status(200).json(rta);
//   } catch (error) {
//     console.log(error);
//     rta.mensaje = "Error al traer los tipos";

//     res.status(500).json(rta);
//   }
// };
