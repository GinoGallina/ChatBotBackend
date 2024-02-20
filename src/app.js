import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import dotenv from "dotenv";
import chatRoutes from './routes/chatRoutes.js'
import cors from 'cors'
import { saludarUsuario, processMessage, usuarioDesconectado } from "./controllers/chatController.js";
import sequelize from './config/db.js'
import tipoRouter from "./routes/tipoRoutes.js";
import User from "./models/User/User.js";
import passport from "passport";
import LocalStrategy from 'passport-local';
import session from 'express-session';
import userRouter from "./routes/userRoutes.js";

dotenv.config();
console.clear()

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);



app.use(cors())

//Configuraciones de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// Cambio en la línea que utiliza __dirname
app.use(express.static(new URL('../public', import.meta.url).pathname));



passport.use('/login',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Contraseña incorrecta." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});




io.on("connection", (socket) => {

  console.log("Usuario Conectado");
  saludarUsuario(socket)

  socket.on("mensaje", (mensaje) => {
    processMessage(socket, mensaje.toLowerCase())
  });

  socket.on("disconnect", () => {
    usuarioDesconectado()
  });

});

app.use("/chat", chatRoutes);
app.use("/tipos", tipoRouter);
app.use("/mensajes", tipoRouter);
app.use("/users", userRouter);


app.use((req, res, next) => {
  res.status(404).send("Not Found");
  console.log('Solicitud recibida:', req.url);
  next();
});


sequelize.sync({ force: false }).then(() => {

  const PORT = process.env.PORT || 3001;

  console.log('Conectado a la Base de Datos')
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.log('Hubo un error' + error)
})
