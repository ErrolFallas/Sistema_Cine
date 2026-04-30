const { Pelicula } = require("../models/");

exports.crearPelicula = async (req, res) => {
    try {
        const newPelicula = await Pelicula.create(req.body)
        res.json(newPelicula)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarPeliculas = async (req, res) => {
    try {
        const infoPeliculas = await Pelicula.findAll()
        res.json(infoPeliculas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.buscarPeliculaId = async (req, res) => {
    try {
        const { id } = req.params
        const infoPeliculaId = await Pelicula.findByPk(id)

        if (!infoPeliculaId) {
            res.status(404).json({ message: "La información no existe" })
        } else {
            res.json(infoUserId)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error del servidor" })
    }
}

exports.eliminarPelicula = async (req, res) => {
    try {
        await Pelicula.destroy({
            where: { id: req.params.id }
        });

        res.json({ message: "Película eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarPelicula = async (req, res) => {
    try {
        await Pelicula.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({ message: "Película actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};