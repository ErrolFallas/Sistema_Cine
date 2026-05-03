const { Funcion } = require("../models/");

exports.crearFuncion = async (req, res) => {
    try {
        const newFuncion = await Funcion.create(req.body)
        res.json(newFuncion)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarFunciones = async (req, res) => {
    try {
        const infoFunciones = await Funcion.findAll()
        res.json(infoFunciones)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarFuncionId = async (req, res) => {
    try {
        const { id } = req.params
        const infoFuncionId = await Funcion.findByPk(id)

        if (!infoFuncionId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoFuncionId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarFuncion = async (req, res) => {
    try {
        await Funcion.destroy({
            where: { id_funcion: req.params.id }
        });

        res.json({ message: "Funcion eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarFuncion = async (req, res) => {
    try {
        await Funcion.update(req.body, {
            where: { id_funcion: req.params.id }
        });

        res.json({ message: "Funcion actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};