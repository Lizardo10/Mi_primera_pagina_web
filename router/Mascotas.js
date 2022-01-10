const express = require("express");
const Router = express.Router();
const Mascota = require("../models/mascota");
Router.get("/", async (req, res) => {
  try {
    const arrayMascotasDB = await Mascota.find();
    console.log(arrayMascotasDB);
    res.render("mascotas", {
      arrayMascotas: arrayMascotasDB,
    });
  } catch (error) {
    console.log(error);
  }
});
Router.get("/crear", (req, res) => {
  res.render("crear");
});
Router.post("/", async (req, res) => {
  const body = req.body;
  try {
    // const MascotaDB = new Mascota(body);
    // await MascotaDB.save();
    await Mascota.create(body);

    res.redirect("/mascotas");
  } catch (error) {
    console.log(error);
  }
});
Router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const mascotaDB = await Mascota.findOne({ _id, _id });
    console.log(mascotaDB);
    res.render("detalle", {
      mascota: mascotaDB,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.render("detalle", {
      error: true,
      mensaje: "No se encuentra el id seleccionado",
    });
  }
});
Router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const mascotaDB = await Mascota.findOneAndDelete({ _id: _id });
    if (mascotaDB) {
      res.json({
        estado: true,
        mensaje: "eliminado!",
      });
    } else {
      res.json({
        estado: false,
        mensaje: " Fallo eliminar!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
Router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const mascotaDB = await Mascota.findByIdAndUpdate(_id, body, {
      useFindAndModify: false,
    });
    console.log(mascotaDB);
    res.json({
      estado: true,
      mensaje: "Editado",
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: "Fallamos!",
    });
  }
});
module.exports = Router;
