const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    nombre_empresa: { type: String, required: true},
    contacto: String,
    telefono: String,
    pais: String
})

module.exports = mongoose.model('Proveedor', proveedorSchema);