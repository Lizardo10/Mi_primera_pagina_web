const express = require("express");
const Router = express.Router();
Router.get("/", (req, res) => {
  res.render("index", {
    titulo:
      "Esta es mi primera pagina web con conexion a Base de datos por favor redirigirse a la pestaña Mascotas",
  });
});
Router.get("/servicio", (req, res) => {
  res.render("servicios", {
    tituloServicios: "Mi titulo dinamico de servicios",
  });
});
module.exports = Router;
