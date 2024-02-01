import Mensaje from "./Mensaje/mensaje.js";
// eslint-disable-next-line import/extensions
import Tipo from "./Tipo/Tipo.js";

Tipo.hasOne(Mensaje, {
  foreignKey: "id_tipo",
  as: "mensaje",
  onDelete: "CASCADE",
});
