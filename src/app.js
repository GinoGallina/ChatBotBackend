import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";
import dotenv from "dotenv";
import chatRoutes from './routes/chatRoutes.js'
import cors from 'cors'
import { saludarUsuario, processMessage, usuarioDesconectado } from "./controllers/chatController.js";

dotenv.config();
console.clear()

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);



const corsOptions = {
    origin: '*',  // Sustituye con tu dominio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Habilita el envío de cookies desde el cliente
};
app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cambio en la línea que utiliza __dirname
app.use(express.static(new URL('../public', import.meta.url).pathname));


io.on("connection", (socket) => {


  console.log("Usuario Conectado");
  saludarUsuario(socket)

  socket.on("mensaje", (mensaje) => {
    processMessage(socket,mensaje.toLowerCase())


  });

  socket.on("disconnect", () => {
      usuarioDesconectado()
  });

});

 app.use("/chat", chatRoutes);

 app.use((req, res, next) => {
   res.status(404).send("Not Found");
     console.log('Solicitud recibida:', req.url);
     next();
 });

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
