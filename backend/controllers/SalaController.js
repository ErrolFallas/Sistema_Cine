const { Sala } = require("../models/");

exports.crearSala = async (req, res) => {
    try {
        const newSala = await Sala.create(req.body)
        res.json(newSala)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarSalas = async (req, res) => {
    try {
        const infoSalas = await Sala.findAll()
        res.json(infoSalas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarSalaId = async (req, res) => {
    try {
        const { id } = req.params
        const infoSalaId = await Sala.findByPk(id)

        if (!infoSalaId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoSalaId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarSala = async (req, res) => {
    try {
        await Sala.destroy({
            where: { id_sala: req.params.id }
        });

        res.json({ message: "Sala eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarSala = async (req, res) => {
    try {
        await Sala.update(req.body, {
            where: { id_sala: req.params.id }
        });

        res.json({ message: "Sala actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};