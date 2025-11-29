/**
 * Rutas para la gestión de Usuarios
 * 
 * Define todos los endpoints relacionados con usuarios:
 * - POST /api/usuarios - Crear un nuevo usuario
 * - GET /api/usuarios - Listar todos los usuarios
 * - GET /api/usuarios/:id - Obtener un usuario específico
 * - PUT /api/usuarios/:id - Actualizar un usuario
 * - DELETE /api/usuarios/:id - Eliminar un usuario
 * 
 * @author Tu Nombre
 * @date 2025
 */

const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');

/**
 * POST /api/usuarios
 * Crear un nuevo usuario
 * 
 * Body esperado (JSON):
 * {
 *   "nombres": "Juan",
 *   "apellidos": "Pérez",
 *   "correoElectronico": "juan@example.com",
 *   "contrasena": "123456",
 *   "rol": "ID_del_rol"
 * }
 */
router.post('/', async (req, res) => {
    try {
        // Extraer datos del body
        const { nombres, apellidos, correoElectronico, contrasena, rol } = req.body;
        
        // Validar que los campos requeridos existan
        if (!nombres || !apellidos || !correoElectronico || !contrasena || !rol) {
            return res.status(400).json({
                success: false,
                mensaje: 'Todos los campos son obligatorios'
            });
        }
        
        // Verificar que el rol existe
        const rolExiste = await Rol.findById(rol);
        if (!rolExiste) {
            return res.status(400).json({
                success: false,
                mensaje: 'El rol especificado no existe'
            });
        }
        
        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            nombres,
            apellidos,
            correoElectronico,
            contrasena, // En producción se debería encriptar
            rol
        });
        
        // Guardar en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();
        
        // Poblar el rol para la respuesta
        await usuarioGuardado.populate('rol');
        
        // Responder con éxito
        res.status(201).json({
            success: true,
            mensaje: 'Usuario creado exitosamente',
            data: usuarioGuardado
        });
        
    } catch (error) {
        // Manejar error de correo duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                mensaje: 'El correo electrónico ya está registrado'
            });
        }
        
        // Otros errores
        res.status(500).json({
            success: false,
            mensaje: 'Error al crear el usuario',
            error: error.message
        });
    }
});

/**
 * GET /api/usuarios
 * Obtener todos los usuarios
 * 
 * Query params opcionales:
 * - activo=true/false - Filtrar por estado
 * - rol=ID - Filtrar por rol
 */
router.get('/', async (req, res) => {
    try {
        // Obtener parámetros de filtro (opcionales)
        const { activo, rol } = req.query;
        
        // Construir filtro dinámico
        const filtro = {};
        if (activo !== undefined) {
            filtro.activo = activo === 'true';
        }
        if (rol) {
            filtro.rol = rol;
        }
        
        // Obtener usuarios de la base de datos
        // populate('rol') trae los datos completos del rol relacionado
        const usuarios = await Usuario.find(filtro)
            .populate('rol')
            .sort({ fechaRegistro: -1 }); // Ordenar por más reciente
        
        // Responder con los usuarios
        res.status(200).json({
            success: true,
            cantidad: usuarios.length,
            data: usuarios
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener los usuarios',
            error: error.message
        });
    }
});

/**
 * GET /api/usuarios/:id
 * Obtener un usuario específico por ID
 * 
 * Params:
 * - id: ID del usuario en MongoDB
 */
router.get('/:id', async (req, res) => {
    try {
        // Obtener el ID de los parámetros
        const { id } = req.params;
        
        // Buscar el usuario por ID y poblar el rol
        const usuario = await Usuario.findById(id).populate('rol');
        
        // Verificar si existe
        if (!usuario) {
            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        
        // Responder con el usuario
        res.status(200).json({
            success: true,
            data: usuario
        });
        
    } catch (error) {
        // Error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de usuario inválido'
            });
        }
        
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el usuario',
            error: error.message
        });
    }
});

/**
 * PUT /api/usuarios/:id
 * Actualizar un usuario existente
 * 
 * Params:
 * - id: ID del usuario a actualizar
 * 
 * Body esperado (JSON) - todos los campos son opcionales:
 * {
 *   "nombres": "Juan Carlos",
 *   "apellidos": "Pérez García",
 *   "correoElectronico": "juan.nuevo@example.com",
 *   "contrasena": "nueva123",
 *   "rol": "nuevo_ID_rol",
 *   "activo": false
 * }
 */
router.put('/:id', async (req, res) => {
    try {
        // Obtener el ID de los parámetros
        const { id } = req.params;
        
        // Obtener los datos a actualizar
        const datosActualizar = req.body;
        
        // Si se está actualizando el rol, verificar que existe
        if (datosActualizar.rol) {
            const rolExiste = await Rol.findById(datosActualizar.rol);
            if (!rolExiste) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El rol especificado no existe'
                });
            }
        }
        
        // Opciones para la actualización
        const opciones = {
            new: true, // Devolver el documento actualizado
            runValidators: true // Ejecutar validaciones del schema
        };
        
        // Actualizar el usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id,
            datosActualizar,
            opciones
        ).populate('rol');
        
        // Verificar si existe
        if (!usuarioActualizado) {
            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        
        // Responder con el usuario actualizado
        res.status(200).json({
            success: true,
            mensaje: 'Usuario actualizado exitosamente',
            data: usuarioActualizado
        });
        
    } catch (error) {
        // Error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de usuario inválido'
            });
        }
        
        // Error de correo duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                mensaje: 'El correo electrónico ya está registrado'
            });
        }
        
        res.status(500).json({
            success: false,
            mensaje: 'Error al actualizar el usuario',
            error: error.message
        });
    }
});

/**
 * DELETE /api/usuarios/:id
 * Eliminar un usuario
 * 
 * Params:
 * - id: ID del usuario a eliminar
 * 
 * Nota: Esta operación es permanente
 */
router.delete('/:id', async (req, res) => {
    try {
        // Obtener el ID de los parámetros
        const { id } = req.params;
        
        // Eliminar el usuario
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        
        // Verificar si existe
        if (!usuarioEliminado) {
            return res.status(404).json({
                success: false,
                mensaje: 'Usuario no encontrado'
            });
        }
        
        // Responder con éxito
        res.status(200).json({
            success: true,
            mensaje: 'Usuario eliminado exitosamente',
            data: usuarioEliminado
        });
        
    } catch (error) {
        // Error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                mensaje: 'ID de usuario inválido'
            });
        }
        
        res.status(500).json({
            success: false,
            mensaje: 'Error al eliminar el usuario',
            error: error.message
        });
    }
});

// Exportar el router
module.exports = router;