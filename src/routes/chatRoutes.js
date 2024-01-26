import express from "express";
import { saludarUsuario } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/saludar", (req, res) => {
  saludarUsuario(res.socket);
});

chatRouter.post("/mensaje", (req, res) => {
  const { mensaje } = req.body;
  // chatController.procesarMensaje(res.socket, mensaje);
});
export default chatRouter;
