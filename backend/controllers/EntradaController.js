const { Entrada } = require("../models/");

exports.crearEntrada = async (req, res) => {
    try {
        const newEntrada = await Entrada.create(req.body)
        res.json(newEntrada)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarEntradas = async (req, res) => {
    try {
        const infoEntradas = await Entrada.findAll()
        res.json(infoEntradas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarEntradaId = async (req, res) => {
    try {
        const { id } = req.params
        const infoEntradaId = await Entrada.findByPk(id)

        if (!infoEntradaId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoEntradaId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarEntrada = async (req, res) => {
    try {
        await Entrada.destroy({
            where: { id_entrada: req.params.id }
        });

        res.json({ message: "Entrada eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarEntrada = async (req, res) => {
    try {
        await Entrada.update(req.body, {
            where: { id_entrada: req.params.id }
        });

        res.json({ message: "Entrada actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};