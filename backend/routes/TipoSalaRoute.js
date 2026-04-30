const express = require("express");
const router = express.Router();

const {crearTipoSala, buscarTipoSalas, buscarTipoSalaId, eliminarTipoSala, actualizarTipoSala} = require("../controllers/TipoSalaController");

router.post("/", crearTipoSala);
router.get("/", buscarTipoSalas);
router.get("/:id", buscarTipoSalaId);
router.delete("/:id", eliminarTipoSala);
router.patch("/:id", actualizarTipoSala)


module.exports = router;