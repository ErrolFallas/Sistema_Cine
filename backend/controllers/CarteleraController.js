const { Cartelera } = require("../models/");

exports.crearCartelera = async (req, res) => {
    try {
        const newCartelera = await Cartelera.create(req.body)
        res.json(newCartelera)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarCarteleras = async (req, res) => {
    try {
        const infoCarteleras = await Cartelera.findAll()
        res.json(infoCarteleras)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarCarteleraId = async (req, res) => {
    try {
        const { id } = req.params
        const infoCarteleraId = await Cartelera.findByPk(id)

        if (!infoCarteleraId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoCarteleraId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarCartelera = async (req, res) => {
    try {
        await Cartelera.destroy({
            where: { id_cartelera: req.params.id }
        });

        res.json({ message: "Cartelera eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarCartelera = async (req, res) => {
    try {
        await Cartelera.update(req.body, {
            where: { id_cartelera: req.params.id }
        });

        res.json({ message: "Cartelera actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};