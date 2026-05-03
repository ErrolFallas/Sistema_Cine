const { Asiento } = require("../models/");

exports.crearAsiento = async (req, res) => {
    try {
        const newAsiento = await Asiento.create(req.body)
        res.json(newAsiento)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarAsientos = async (req, res) => {
    try {
        const infoAsientos = await Asiento.findAll()
        res.json(infoAsientos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarAsientoId = async (req, res) => {
    try {
        const { id } = req.params
        const infoAsientoId = await Asiento.findByPk(id)

        if (!infoAsientoId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoAsientoId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarAsiento = async (req, res) => {
    try {
        await Asiento.destroy({
            where: { id_asiento: req.params.id }
        });

        res.json({ message: "Asiento eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarAsiento = async (req, res) => {
    try {
        await Asiento.update(req.body, {
            where: { id_asiento: req.params.id }
        });

        res.json({ message: "Asiento actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};