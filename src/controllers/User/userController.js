/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcryptjs";
import { create } from "../../services/User/userService.js";
import { hanldeError } from "../../utls/handleError.js";
import passport from "../../config/passport.js";

export const register = async (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  try {
    // Generar hash de la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Crear nuevo usuario
    req.body.password = hashedPassword;
    const newUser = await create(req.body);

    rta.data = newUser;
    rta.mensaje.push("Usuario creado exitosamente");
    rta.success = true;

    return res.status(201).json(rta);
  } catch (error) {
    const { mensaje, codigoError } = hanldeError(error);
    rta.mensaje = mensaje;
    rta.status = false;
    rta.data = null;
    return res.status(codigoError).json(rta);
  }
};

//  Ruta de inicio de sesión
// eslint-disable-next-line consistent-return
export const login = async (req, res, next) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  try {
    // eslint-disable-next-line consistent-return
    passport.authenticate("local-login", (err, user, info) => {
      if (err) {
        rta.mensaje = `Error interno, ${err}`;
        rta.success = false;
        return res.status(500).json(rta);
      }
      if (!user) {
        rta.mensaje = info.message;
        rta.success = false;
        return res.status(401).json(rta);
      }
      req.logIn(user, (error) => {
        // console.log(`logged ${req.isAuthenticated()}`);
        if (error) {
          rta.mensaje = `Error interno ${error.message}`;
          rta.success = false;
          return res.status(500).json(rta);
        }
        rta.mensaje = `Logueado correctamente`;
        rta.success = true;
        rta.data = user;
        return res.status(200).json(rta);
        // return res.redirect("/tipos/all");
      });
    })(req, res, next);
  } catch (error) {
    rta.mensaje = "Error interno del servidor al loguearse";
    rta.success = false;
    return res.status(500).json(rta);
  }
};

export const logout = (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  try {
    req.logout(() => {});
    return res.redirect("/");
  } catch (error) {
    rta.mensaje = `Error al desloguearse, ${error.message}`;
    rta.success = false;
    return res.status(500).json(rta);
  }
};
