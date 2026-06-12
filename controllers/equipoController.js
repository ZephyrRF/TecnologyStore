const Equipo = require('../models/Equipo');

exports.obtenerEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.find()
            .populate('categoria')
            .populate('proveedor');
        res.status(200).json(equipos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener datos" });
    }
};

exports.crearEquipo = async (req, res) => {
    try {
        const nuevoEquipo = new Equipo(req.body);
        await nuevoEquipo.save();
        return res.redirect('/equipos');
    } catch (error) {
        return res.status(400).json({ message: "Error al guardar" })
    }
}

exports.actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const equipoModificado = await Equipo.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!equipoModificado) {
            return res.status(404).json({ message: "Equipo no encontrado"})
        }

        res.status(200).json({
            message: "Equipo actualizado correctamente",
            data: equipoModificado
        });
    } catch(error) {
        res.status(500).json({ message: "Error al actualizar el equipo", error});
    }
}

exports.eliminarEquipo = async (req, res) => {
    try {
        const { id } = req.params;

        const equipoEliminado = await Equipo.findByIdAndDelete(id);

        if (!equipoEliminado) {
            return res.status(404).json({ message: "El equipo no existe"});
        }
        
        res.status(200).json({ message: "Equipo eliminado de la base de datos"});

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el equipo", error});
    }
}