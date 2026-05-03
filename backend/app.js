require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());


const asientoRoute = require("./routes/AsientoRoute")
const carteleraRoute = require("./routes/CarteleraRoute")
const cineRoute = require("./routes/CineRoute")
const entradaRoute = require("./routes/EntradaRoute")
const funcionRoute = require("./routes/FuncionRoute")
const peliculaRoute = require("./routes/PeliculaRoute")
const salaRoute = require("./routes/SalaRoute")
const tipoSalaRoute = require("./routes/TipoSalaRoute")


app.use("/asientos", asientoRoute);
app.use("/carteleras", carteleraRoute);
app.use("/cines", cineRoute);
app.use("/entradas", entradaRoute);
app.use("/funciones", funcionRoute);
app.use("/peliculas", peliculaRoute);
app.use("/salas", salaRoute);
app.use("/tiposala", tipoSalaRoute);


const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        // Verificar conexión a MySQL
        await db.testConnection();

        // Sincronizar tablas (no borra datos existentes)
        await db.sequelize.sync();
        console.log("✅  Tablas sincronizadas correctamente.");

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌  Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

iniciarServidor();