const { TipoSala } = require("../models/");

exports.crearTipoSala = async (req, res) => {
    try {
        const newTipoSala = await TipoSala.create(req.body)
        res.json(newTipoSala)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarTiposSala = async (req, res) => {
    try {
        const infoUsers = await TipoSala.findAll()
        res.json(infoUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarTipoSalaId = async (req, res) => {
    try {
        const { id } = req.params
        const infoUserId = await TipoSala.findByPk(id)

        if (!infoUserId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoUserId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarTipoSala = async (req, res) => {
    try {
        await TipoSala.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Tipo de Sala eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarTipoSala = async (req, res) => {
    try {
        await TipoSala.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Tipo de Sala actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};