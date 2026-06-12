require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const equipoRoutes = require('./routes/equipoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const vistaRoutes = require('./routes/viewsRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/electiva-iv";

mongoose.connect(mongoURI)
    .then(() => console.log("Conectado a MongoDB correctamente"))
    .catch(err => console.error("Error de conexión:", err));

app.use('/api/equipos', equipoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/', vistaRoutes);

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
