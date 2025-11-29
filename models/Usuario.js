/**
 * Modelo de Usuario para MongoDB
 * 
 * Define el esquema y estructura de los usuarios en la base de datos
 * Incluye validaciones y métodos personalizados
 * 
 * @author Tu Nombre
 * @date 2025
 */

const mongoose = require('mongoose');

/**
 * Schema de Usuario
 * 
 * Estructura:
 * - nombres: Nombres del usuario
 * - apellidos: Apellidos del usuario
 * - correoElectronico: Email único del usuario
 * - contrasena: Contraseña del usuario
 * - rol: Referencia al modelo Rol (relación)
 * - activo: Estado del usuario
 * - fechaRegistro: Fecha de creación automática
 */
const UsuarioSchema = new mongoose.Schema({
    // Nombres del usuario
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios'],
        trim: true,
        maxlength: [100, 'Los nombres no pueden exceder 100 caracteres'],
        minlength: [2, 'Los nombres deben tener al menos 2 caracteres']
    },
    
    // Apellidos del usuario
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
        trim: true,
        maxlength: [100, 'Los apellidos no pueden exceder 100 caracteres'],
        minlength: [2, 'Los apellidos deben tener al menos 2 caracteres']
    },
    
    // Correo electrónico (único)
    correoElectronico: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor ingrese un correo electrónico válido'
        ]
    },
    
    // Contraseña
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    
    // Relación con el modelo Rol (referencia)
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol', // Nombre del modelo relacionado
        required: [true, 'El rol es obligatorio']
    },
    
    // Estado del usuario
    activo: {
        type: Boolean,
        default: true
    },
    
    // Fecha de registro (automática)
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    // Opciones del schema
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false // Deshabilita el campo __v
});

/**
 * Método estático para buscar usuario por correo
 * 
 * @param {String} correo - Correo electrónico a buscar
 * @returns {Promise} Promesa con el usuario encontrado
 */
UsuarioSchema.statics.buscarPorCorreo = function(correo) {
    return this.findOne({ correoElectronico: correo }).populate('rol');
};

/**
 * Método para obtener el nombre completo del usuario
 * 
 * @returns {String} Nombre completo
 */
UsuarioSchema.methods.nombreCompleto = function() {
    return `${this.nombres} ${this.apellidos}`;
};

/**
 * Método para formatear el usuario antes de enviarlo como respuesta
 * Oculta la contraseña y formatea fechas
 */
UsuarioSchema.methods.toJSON = function() {
    const usuario = this.toObject();
    
    // Ocultar contraseña por seguridad
    delete usuario.contrasena;
    
    // Formatear fecha de registro
    if (usuario.fechaRegistro) {
        usuario.fechaRegistro = usuario.fechaRegistro.toLocaleDateString('es-ES');
    }
    
    return usuario;
};

// Exportar el modelo
module.exports = mongoose.model('Usuario', UsuarioSchema);