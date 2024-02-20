/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { create, findOneEmail } from "../../services/User/userService.js";
import { hanldeError } from "../../utls/handleError.js";

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
export const login = async (req, res, next) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  try {
    // eslint-disable-next-line consistent-return
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        rta.mensaje = `Error interno, ${err}`;
        rta.success = false;
        return res.status(500).json(rta);
      }
      if (!user) {
        rta.mensaje = info;
        rta.success = false;
        return res.status(401).json(rta);
      }
      req.logIn(user, (error) => {
        if (error) {
          rta.mensaje = `Error interno ${error.message}`;
          rta.success = false;
          return res.status(500).json(rta);
        }
        rta.mensaje = `Logueado correctamente`;
        rta.success = true;
        rta.data = user;
        return res.status(200).json(rta);
      });
    })(req, res, next);
  } catch (error) {
    rta.mensaje = "Error interno del servidor al loguearse";
    rta.success = false;
    return res.status(500).json(rta);
  }
};

// Configuración de la estrategia de autenticación local con Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Busca al usuario en la base de datos por correo electrónico
        const user = await findOneEmail(email);
        if (!user) {
          // Usuario no encontrado
          return done(null, false, {
            message: "Correo electrónico no registrado",
          });
        }
        // Verifica la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          // Contraseña incorrecta
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        // Autenticación exitosa
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export const logout = (req, res) => {
  const rta = {
    data: null,
    mensaje: [],
    success: null,
  };
  try {
    req.logout();
    res.redirect("/");
    console.log("a");
  } catch (error) {
    console.log("b");
    rta.mensaje = `Error al desloguearse, ${error.message}`;
    rta.success = false;
    res.send(500).json(rta);
  }
};
