import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import dotenv from "dotenv";
import cors from 'cors'
import { saludarUsuario, processMessage, usuarioDesconectado } from "./controllers/chatController.js";

//DB
import sequelize from './config/db.js'

//Passport
import passport from "./config/passport.js";
import session from 'express-session';
import cookieParser from 'cookie-parser'

//Routes
import chatRoutes from './routes/chatRoutes.js'
import tipoRouter from "./routes/tipoRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
console.clear()

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);



 app.use(cors({
   origin: "http://localhost:5173",
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   credentials: true,
 }));
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next()
})

//Configuraciones de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Config passport
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));

  // , cookie: {
  // secure: false,
  //   sameSite: 'none',
  // }  Para cuando es https

app.use(passport.initialize());
app.use(passport.session());
// Cambio en la línea que utiliza __dirname
app.use(express.static(new URL('../public', import.meta.url).pathname));




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

export default passport;

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
