const express = require("express");
const router = express.Router();

const {crearFuncion, buscarFunciones, buscarFuncionId, eliminarFuncion, actualizarFuncion} = require("../controllers/FuncionController");

router.post("/", crearFuncion);
router.get("/", buscarFunciones);
router.get("/:id", buscarFuncionId);
router.delete("/:id", eliminarFuncion);
router.patch("/:id", actualizarFuncion)


module.exports = router;