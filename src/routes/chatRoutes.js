import express from "express";
// eslint-disable-next-line import/extensions
import { saludarUsuario } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/saludar", (req, res) => {
  saludarUsuario(res.socket);
});

chatRouter.get("/test", (req, res) => {
  const data = { mensaje: "Okey" };
  res.status(200).set("personalizado", "hoolis").json(data);
});

export default chatRouter;
