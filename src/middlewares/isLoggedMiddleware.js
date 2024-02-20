/* eslint-disable import/prefer-default-export */
export const isLogged = (req, res, next) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  if (req.isAuthenticated()) {
    return next();
  }
  rta.mensaje = "No está logueado";
  rta.success = false;
  return res.status(401).json(rta);
};
