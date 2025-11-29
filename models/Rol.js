/**
 * Modelo de Rol para MongoDB
 * 
 * Define el esquema y estructura de los roles en la base de datos
 * Un rol define los permisos y niveles de acceso de los usuarios
 * 
 * @author Tu Nombre
 * @date 2025
 */

const mongoose = require('mongoose');

/**
 * Schema de Rol
 * 
 * Estructura:
 * - nombre: Nombre del rol (Administrador, Usuario, etc.)
 * - descripcion: Descripción detallada del rol
 * - permisos: Array de permisos asignados al rol
 * - activo: Estado del rol (activo/inactivo)
 * - fechaCreacion: Fecha de creación automática
 */
const RolSchema = new mongoose.Schema({
    // Nombre del rol
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [50, 'El nombre no puede exceder 50 caracteres'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    
    // Descripción del rol
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
        maxlength: [200, 'La descripción no puede exceder 200 caracteres']
    },
    
    // Permisos asociados al rol
    permisos: {
        type: [String],
        default: ['leer']
    },
    
    // Estado del rol
    activo: {
        type: Boolean,
        default: true
    },
    
    // Fecha de creación (automática)
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
}, {
    // Opciones del schema
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false // Deshabilita el campo __v
});

/**
 * Método personalizado para obtener solo roles activos
 * 
 * @returns {Promise} Promesa con array de roles activos
 */
RolSchema.statics.obtenerActivos = function() {
    return this.find({ activo: true });
};

/**
 * Método para formatear el rol antes de enviarlo como respuesta
 * Oculta información sensible y formatea fechas
 */
RolSchema.methods.toJSON = function() {
    const rol = this.toObject();
    
    // Formatear fecha de creación
    if (rol.fechaCreacion) {
        rol.fechaCreacion = rol.fechaCreacion.toLocaleDateString('es-ES');
    }
    
    return rol;
};

// Exportar el modelo
module.exports = mongoose.model('Rol', RolSchema);