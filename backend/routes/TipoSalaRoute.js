const express = require("express");
const router = express.Router();

const {crearTipoSala, buscarTiposSala, buscarTipoSalaId, eliminarTipoSala, actualizarTipoSala} = require("../controllers/TipoSalaController");

router.post("/", crearTipoSala);
router.get("/", buscarTiposSala);
router.get("/:id", buscarTipoSalaId);
router.delete("/:id", eliminarTipoSala);
router.patch("/:id", actualizarTipoSala)


module.exports = router;