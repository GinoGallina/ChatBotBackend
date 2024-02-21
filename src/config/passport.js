/* eslint-disable import/extensions */
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findOneEmail, getOne } from "../services/User/userService.js";

// Configuración de la estrategia de autenticación local con Passport
passport.use(
  "local-login",
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

// Serialización de usuario para almacenar en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialización de usuario para obtener información de la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getOne(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
