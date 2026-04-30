const express = require("express");
const router = express.Router();

const {crearAsiento, buscarAsientos, buscarAsientoId, eliminarAsiento, actualizarAsiento} = require("../controllers/AsientoController");

router.post("/", crearAsiento);
router.get("/", buscarAsientos);
router.get("/:id", buscarAsientoId);
router.delete("/:id", eliminarAsiento);
router.patch("/:id", actualizarAsiento)


module.exports = router;