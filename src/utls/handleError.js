// eslint-disable-next-line import/prefer-default-export
export const hanldeError = (error) => {
  let codigoError;
  let mensaje;
  console.log(error);
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    codigoError = 400;
    const { errors } = error;
    const mensjaeAMostrar = [];
    errors.forEach((ValidationErrorItem) => {
      mensjaeAMostrar.push(ValidationErrorItem.message);
    });
    mensaje = mensjaeAMostrar;
  } else {
    codigoError = 500;
    mensaje = [`Error al crear el tipo, error del Servidor: ${error.message}`];
  }
  return { codigoError, mensaje };
};
