const express = require("express");
const router = express.Router();

const {crearCartelera, buscarCarteleras, buscarCarteleraId, eliminarCartelera, actualizarCartelera} = require("../controllers/CarteleraController");

router.post("/", crearCartelera);
router.get("/", buscarCarteleras);
router.get("/:id", buscarCarteleraId);
router.delete("/:id", eliminarCartelera);
router.patch("/:id", actualizarCartelera)


module.exports = router;