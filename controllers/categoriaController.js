const Categoria = require('../models/Categoria');


exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las categorías" });
    }
};

exports.crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json({ message: "Categoria creada", data: nuevaCategoria });
    } catch(error) {
        res.status(400).json({ message: "Error al crear categoria", error });
    }
};

exports.actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, req.body, { new: true });

        if (!categoriaActualizada) {
            return res.status(404).json({ message: "La categoría no existe" });
        }

        res.status(200).json({ categoriaActualizada });
    } catch(error) {
        res.status(400).json({ message: "Error al actualizar" });
    }
};

exports.eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoriaEliminada = await Categoria.findByIdAndDelete(id);

        if (!categoriaEliminada) {
            return res.status(404).json({ message: "La categoria no existe" });
        }
        res.status(200).json({ message: "Categoria eliminada de la base de datos" });
    } catch(error) {
        res.status(500).json({ message: "Error al eliminar la categoría" });
    }
};
