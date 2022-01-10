const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
require("dotenv").config();

const Port = process.env.PORT || 3000;
// conexion a base de datos
const mongoose = require("mongoose");

const uri = process.env.DATABASE_URL;
mongoose
  .connect(uri, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Base de datos conectada"))
  .catch((e) => console.log(e));
// Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

// Rutas
app.use("/", require("./router/rutasweb"));
app.use("/mascotas", require("./router/Mascotas"));
// middlewares
app.use((req, res, next) => {
  res.status(404).render("404");
});
// Puerto a la escucha
app.listen(Port, () => {
  console.log(`Su puerto esta abierto, el numero de puerto es: ${Port}`);
  console.log("http://localhost:3001/");
});
