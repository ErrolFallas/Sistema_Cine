const express = require("express");
const router = express.Router();

const {crearPelicula, buscarPeliculas, buscarPeliculaId, eliminarPelicula, actualizarPelicula} = require("../controllers/PeliculaController");

router.post("/", crearPelicula);
router.get("/", buscarPeliculas);
router.get("/:id", buscarPeliculaId);
router.delete("/:id", eliminarPelicula);
router.patch("/:id", actualizarPelicula)


module.exports = router;