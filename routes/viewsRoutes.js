const express = require('express');
const router = express.Router();

const Equipo = require('../models/Equipo');
const Categoria = require('../models/Categoria');
const Proveedor = require('../models/Proveedor');

// Vista Principal de Equipos
router.get('/equipos', async (req, res) => {
    try {
        const equipos = await Equipo.find().populate('categoria').populate('proveedor');
        res.render('equipos/index', { equipos });
    } catch (error) {
        res.status(500).send("Error al cargar equipos");
    }
});

// Ruta para el formulario de nuevo equipo
router.get('/equipos/nuevo', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        const proveedores = await Proveedor.find();
        res.render('equipos/crear', { categorias, proveedores });
    } catch (error) {
        res.status(500).send("Error interno: " + error.message);
    }
});

// Ruta para el formulario de editar equipo
router.get('/equipos/editar/:id', async (req, res) => {
    try {
        const equipo = await Equipo.findById(req.params.id).populate('categoria').populate('proveedor');
        const categorias = await Categoria.find();
        const proveedores = await Proveedor.find();

        if (!equipo) {
            return res.status(404).send("Equipo no encontrado");
        }

        res.render('equipos/editar', { equipo, categorias, proveedores });
    } catch (error) {
        res.status(404).send("Equipo no encontrado");
    }
});

// Categorías
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.render('categorias/index', { categorias });
    } catch (error) {
        res.status(500).send("Error al cargar categorías");
    }
});

router.get('/categorias/nuevo', (req, res) => res.render('categorias/crear'));

// Ruta para mostrar formulario de editar categoría
router.get('/categorias/editar/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).send("Categoría no encontrada");
        }
        res.render('categorias/editar', { categoria });
    } catch (error) {
        res.status(500).send("Error al cargar la categoría");
    }
});

// Proveedores
router.get('/proveedores', async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.render('proveedores/index', { proveedores });
    } catch (error) {
        res.status(500).send("Error al cargar proveedores");
    }
});

router.get('/proveedores/nuevo', (req, res) => res.render('proveedores/crear'));

// Ruta para mostrar formulario de editar proveedor
router.get('/proveedores/editar/:id', async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).send("Proveedor no encontrado");
        }
        res.render('proveedores/editar', { proveedor });
    } catch (error) {
        res.status(500).send("Error al cargar el proveedor");
    }
});

module.exports = router;