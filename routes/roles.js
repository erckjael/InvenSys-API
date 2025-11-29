/**
 * Rutas para la gestión de Roles
 * 
 * Define todos los endpoints relacionados con roles:
 * - POST /api/roles - Crear un nuevo rol
 * - GET /api/roles - Listar todos los roles
 * - GET /api/roles/:id - Obtener un rol específico
 * - PUT /api/roles/:id - Actualizar un rol
 * - DELETE /api/roles/:id - Eliminar un rol
 * 
 * @author Tu Nombre
 * @date 2025
 */

const express = require('express');
const router = express.Router();
const Rol = require('../models/Rol');

/**
 * POST /api/roles
 * Crear un nuevo rol
 * 
 * Body esperado (JSON):
 * {
 *   "nombre": "Administrador",
 *   "descripcion": "Acceso total al sistema",
 *   "permisos": ["crear", "leer", "actualizar", "eliminar"]
 * }
 */
router.post('/', async (req, res) => {
    try {
        // Extraer datos del body
        const { nombre, descripcion, permisos } = req.body;
        
        // Validar que los campos requeridos existan
        if (!nombre || !descripcion) {
            return res.status(400).json({
                success: false,
                mensaje: 'Los campos nombre y descripción son obligatorios'
            });
        }
        
        // Crear el nuevo rol
        const nuevoRol = new Rol({
            nombre,
            descripcion,
            permisos: permisos || ['leer']
        });
        
        // Guardar en la base de datos
        const rolGuardado = await nuevoRol.save();
        
        // Responder con éxito
        res.status(201).json({
            success: true,
            mensaje: 'Rol creado exitosamente',
            data: rolGuardado
        });
        
    } catch (error) {
        // Manejar error de rol duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                mensaje: 'Ya existe un rol con ese nombre'
            });
        }
        
        // Otros errores
        res.status(500).json({
            success: false,
            mensaje: 'Error al crear el rol',
            error: error.message
        });
    }
});

/**
 * GET /api/roles
 * Obtener todos los roles
 * 
 * Query params opcionales:
 * - activo=true/false - Filtrar por estado
 */
router.get('/', async (req, res) => {
    try {
        // Obtener parámetro de filtro (opcional)
        const { activo } = req.query;
        
        // Construir filtro
        const filtro = activo !== undefined ? { activo: activo === 'true' } : {};
        
        // Obtener roles de la base de datos
        const roles = await Rol.find(filtro).sort({ nombre: 1 });
        
        // Responder con los roles
        res.status(200).json({
            success: true,
            cantidad: roles.length,
            data: roles
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener los roles',
            error: error.message
        });
    }
});

/**
 * GET /api/roles/:id
 * Obtener un rol específico por ID
 * 
 * Params:
 * - id: ID del rol en MongoDB
 */
router.get('/:id', async (req, res) => {
    try {
        // Obtener el ID de los parámetros
        const { id } = req.params;
        
        // Buscar el rol por ID
        const rol = await Rol.findById(id);
        
        // Verificar si existe
        if (!rol) {
            return res.status(404).json({
                success: false,
                mensaje: 'Rol no encontrado'
            });
        }
        
        // Responder con el rol
        res.status(200).json({
            success: true,
            data: rol
        });
        
    } catch (error) {
        // Error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de rol inválido'
            });
        }
        
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el rol',
            error: error.message
        });
    }
});

/**
 * PUT /api/roles/:id
 * Actualizar un rol existente
 * 
 * Params:
 * - id: ID del rol a actualizar
 * 
 * Body esperado (JSON) - todos los campos son opcionales:
 * {
 *   "nombre": "Super Administrador",
 *   "descripcion": "Acceso completo",
 *   "permisos": ["all"],
 *   "activo": true
 * }
 */
router.put('/:id', async (req, res) => {
    try {
        // Obtener el ID de los parámetros
        const { id } = req.params;
        
        // Obtener los datos a actualizar
        const datosActualizar = req.body;
        
        // Opciones para la actualización
        const opciones = {
            new: true, // Devolver el documento actualizado
            runValidators: true // Ejecutar validaciones del schema
        };
        
        // Actualizar el rol
        const rolActualizado = await Rol.findByIdAndUpdate(
            id,
            datosActualizar,
            opciones
        );
        
        // Verificar si existe
        if (!rolActualizado) {
            return res.status(404).json({
                success: false,
                mensaje: 'Rol no encontrado'
            });
        }
        
        // Responder con el rol actualizado
        res.status(200).json({
            success: true,
            mensaje: 'Rol actualizado exitosamente',
            data: rolActualizado
        });
        
    } catch (error) {
        // Error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de rol inválido'
            });
        }
        
        // Error de nombre duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                mensaje: 'Ya existe un rol con ese nombre'
            });
        }
        
        res.status(500).json({
            success: false,
            mensaje: 'Error al actualizar el rol',
            error: error.message
        });
    }
});

/**
 * DELETE /api/roles/:id
 * Eliminar un rol
 * 
 * Params:
 * - id: ID del rol a eliminar
 * 
 * Nota: Esta operación es permanente
 */
router.delete('/:id', async (req, res) => {
    try {
        // Obtener el ID de los parámetros
        const { id } = req.params;
        
        // Eliminar el rol
        const rolEliminado = await Rol.findByIdAndDelete(id);
        
        // Verificar si existe
        if (!rolEliminado) {
            return res.status(404).json({
                success: false,
                mensaje: 'Rol no encontrado'
            });
        }
        
        // Responder con éxito
        res.status(200).json({
            success: true,
            mensaje: 'Rol eliminado exitosamente',
            data: rolEliminado
        });
        
    } catch (error) {
        // Error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de rol inválido'
            });
        }
        
        res.status(500).json({
            success: false,
            mensaje: 'Error al eliminar el rol',
            error: error.message
        });
    }
});

// Exportar el router
module.exports = router;