const express = require("express");
const cors = require("cors");

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


const PORT = 3000;

app.listen(PORT, () => 
        {
            console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
        });