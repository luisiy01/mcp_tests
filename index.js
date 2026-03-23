const connection = require('./database/connection');
const express = require('express');
const cors = require('cors');

connection();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const projectRoutes = require('./routes/project');

app.use('/api/project', projectRoutes);

app.get('/pruebitas', (req, res) => {

    console.log('se ha ejecutado mi enpoiont de prueba')
    res.send(`<section><h1>prueba de una ruta</h1></section>`).status(200);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});