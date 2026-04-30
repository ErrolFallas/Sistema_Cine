const express = require("express");
const router = express.Router();

const {crearCine, buscarCines, buscarCineId, eliminarCine, actualizarCine} = require("../controllers/CineController");

router.post("/", crearCine);
router.get("/", buscarCines);
router.get("/:id", buscarCineId);
router.delete("/:id", eliminarCine);
router.patch("/:id", actualizarCine)


module.exports = router;