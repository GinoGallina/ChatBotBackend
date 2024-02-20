/* eslint-disable import/extensions */
import express from "express";
import {
  createTipo,
  deleteTipo,
  // deleteTipo,
  getAllTipos,
  getAllWithDeletedTipos,
  getOneTipo,
  // eslint-disable-next-line import/extensions
} from "../controllers/Tipo/tipoController.js";
import { isLogged } from "../middlewares/isLoggedMiddleware.js";

const tipoRouter = express.Router();

tipoRouter.get("/all", isLogged, getAllTipos);
tipoRouter.get("/allWithDeleted", isLogged, getAllWithDeletedTipos);
tipoRouter.get("/:id", isLogged, getOneTipo);
tipoRouter.post("/create", isLogged, createTipo);
// // tipoRouter.put();
tipoRouter.delete("/delete/:id", isLogged, deleteTipo);

export default tipoRouter;
