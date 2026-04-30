const express = require("express");
const router = express.Router();

const {crearSala, buscarSalas, buscarSalaId, eliminarSala, actualizarSala} = require("../controllers/SalaController");

router.post("/", crearSala);
router.get("/", buscarSalas);
router.get("/:id", buscarSalaId);
router.delete("/:id", eliminarSala);
router.patch("/:id", actualizarSala)


module.exports = router;