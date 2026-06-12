const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema
({
    nombre: { type: String, required: true},
    marca: String,
    precio: { type: Number, min: [0, "El precio no puede ser negativo"] },
    stock: { type: Number, min: [0, "El stock no puede ser negativo"] },
    categoria: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria',
        required: true 
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor'
    }
});

module.exports = mongoose.model('Equipo', equipoSchema);
