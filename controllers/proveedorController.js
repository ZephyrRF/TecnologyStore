const Proveedor = require('../models/Proveedor');

exports.obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);
    } catch(error) {
        res.status(500).json({ message: "Error al obtener proveedores" });
    }
};

exports.crearProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        await nuevoProveedor.save();
        res.status(201).json(nuevoProveedor);
    } catch(error) {
        res.status(400).json({ message: "Error al registrar proveedor" });
    }
};

exports.actualizarProveedor = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, req.body, { new: true });

        if (!proveedorActualizado) {
            return res.status(404).json({ message: "El proveedor no existe" });
        }

        res.status(200).json({ proveedorActualizado });
    } catch(error) {
        res.status(400).json({ message: "Error al actualizar" });
    }
};

exports.eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;

        const proveedorEliminado = await Proveedor.findByIdAndDelete(id);
        if (!proveedorEliminado) {
            return res.status(404).json({ message: "El proveedor no existe." });
        }
        res.status(200).json({ message: "Proveedor eliminado de la base de datos." });
    } catch(error) {
        res.status(400).json({ message: "Error al eliminar el proveedor." });
    }
};
