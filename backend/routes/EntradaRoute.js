const express = require("express");
const router = express.Router();

const {crearEntrada, buscarEntradas, buscarEntradaId, eliminarEntrada, actualizarEntrada} = require("../controllers/EntradaController");

router.post("/", crearEntrada);
router.get("/", buscarEntradas);
router.get("/:id", buscarEntradaId);
router.delete("/:id", eliminarEntrada);
router.patch("/:id", actualizarEntrada)


module.exports = router;