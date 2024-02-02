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

const tipoRouter = express.Router();

tipoRouter.get("/all", getAllTipos);
tipoRouter.get("/allWithDeleted", getAllWithDeletedTipos);
tipoRouter.get("/:id", getOneTipo);
tipoRouter.post("/create", createTipo);
// // tipoRouter.put();
tipoRouter.delete("/delete/:id", deleteTipo);

export default tipoRouter;
