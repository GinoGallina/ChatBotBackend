/* eslint-disable import/prefer-default-export */
export const isNotLogged = (req, res, next) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  // console.log(req.user);
  if (req.isAuthenticated()) {
    rta.mensaje = "Ya está logueado";
    rta.success = false;
    return res.status(401).json(rta);
  }
  return next();
};
