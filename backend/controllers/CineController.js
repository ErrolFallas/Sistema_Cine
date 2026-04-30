const { Cine } = require("../models/");

exports.crearCine = async (req, res) => {
    try {
        const newCine = await Cine.create(req.body)
        res.json(newCine)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarCines = async (req, res) => {
    try {
        const infoCines = await Cine.findAll()
        res.json(infoCines)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarCineId = async (req, res) => {
    try {
        const { id } = req.params
        const infoCineId = await Cine.findByPk(id)

        if (!infoCineId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json({ message:"Cine encontrado",infoCineId})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarCine = async (req, res) => {
    try {
        await Cine.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Cine eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarCine = async (req, res) => {
    try {
        await Cine.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Cine actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};