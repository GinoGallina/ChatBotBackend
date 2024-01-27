import { OPCIONES } from "../utils/constants.js";

export const saludarUsuario = (socket) => {
  socket.emit("mensaje", "Hola, ¡bienvenido al chat de ...!");
};

export const usuarioDesconectado = () => {
  console.log("Usuario desconectado");
};

export const processMessage = (socket, mensaje) => {
  // Tendira que hacer algo aca
  let rta;
  switch (mensaje) {
    case "a":
      rta = "Es una A";
      break;
    case OPCIONES.PRODUCTOS:
      rta = "Es algo de productos";
      break;
    default:
      rta = "Lo siento, no entendí. ¿Puedes proporcionar más información?";
  }

  socket.emit("mensaje", rta);
};
