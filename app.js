/**
 * Archivo principal de la API REST - InvenSys
 * 
 * Este archivo configura y arranca el servidor Express
 * Define las rutas principales y middlewares
 * Conecta con la base de datos MongoDB
 * 
 * Tecnologías utilizadas:
 * - Node.js - Entorno de ejecución
 * - Express - Framework web
 * - MongoDB - Base de datos NoSQL
 * - Mongoose - ODM para MongoDB
 * 
 * @author Tu Nombre
 * @date 2025
 */

// ============================================
// IMPORTACIÓN DE MÓDULOS Y DEPENDENCIAS
// ============================================

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Importar la función de conexión a la base de datos
const conectarDB = require('./config/database');

// Importar las rutas
const rutasUsuarios = require('./routes/usuarios');
const rutasRoles = require('./routes/roles');

// ============================================
// CONFIGURACIÓN DE LA APLICACIÓN
// ============================================

// Crear instancia de Express
const app = express();

// Definir el puerto del servidor (desde variable de entorno o 3000 por defecto)
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES
// ============================================

/**
 * CORS (Cross-Origin Resource Sharing)
 * Permite que la API sea consumida desde diferentes dominios
 * Útil cuando el frontend está en un servidor diferente
 */
app.use(cors());

/**
 * Body Parser
 * Convierte el body de las peticiones a formato JSON
 * Permite leer req.body en las rutas
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Middleware personalizado para logging
 * Registra todas las peticiones en la consola
 */
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// ============================================
// CONEXIÓN A LA BASE DE DATOS
// ============================================

// Conectar a MongoDB Atlas
conectarDB();

// ============================================
// RUTAS PRINCIPALES
// ============================================

/**
 * Ruta raíz (home)
 * GET /
 * Devuelve información básica de la API
 */
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        mensaje: 'Bienvenido a InvenSys API REST',
        version: '1.0.0',
        descripcion: 'API para el Sistema de Gestión de Inventario InvenSys',
        documentacion: '/api/docs',
        endpoints: {
            usuarios: '/api/usuarios',
            roles: '/api/roles'
        },
        estado: 'Activo',
        baseDatos: 'MongoDB Atlas',
        autor: 'Tu Nombre',
        fecha: new Date().toLocaleDateString('es-ES')
    });
});

/**
 * Ruta de estado (health check)
 * GET /api/status
 * Verifica que la API esté funcionando
 */
app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        mensaje: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(), // Tiempo que lleva corriendo el servidor
        memoria: process.memoryUsage()
    });
});

// ============================================
// RUTAS DE LA API
// ============================================

/**
 * Montar las rutas de usuarios
 * Todas las rutas de usuarios estarán bajo /api/usuarios
 */
app.use('/api/usuarios', rutasUsuarios);

/**
 * Montar las rutas de roles
 * Todas las rutas de roles estarán bajo /api/roles
 */
app.use('/api/roles', rutasRoles);

// ============================================
// MANEJO DE ERRORES 404
// ============================================

/**
 * Middleware para rutas no encontradas
 * Se ejecuta cuando ninguna ruta coincide con la petición
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        mensaje: 'Ruta no encontrada',
        ruta: req.url,
        metodo: req.method,
        sugerencia: 'Verifica la documentación de la API'
    });
});

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================

/**
 * Middleware para manejo de errores globales
 * Captura cualquier error no manejado en la aplicación
 */
app.use((error, req, res, next) => {
    console.error('❌ Error no controlado:', error);
    
    res.status(500).json({
        success: false,
        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
    });
});

// ============================================
// INICIAR EL SERVIDOR
// ============================================

/**
 * Arrancar el servidor en el puerto especificado
 * Mostrar mensaje de confirmación en la consola
 */
app.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 Servidor InvenSys API iniciado');
    console.log('========================================');
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📚 Documentación: http://localhost:${PORT}/api/docs`);
    console.log(`✅ Estado: http://localhost:${PORT}/api/status`);
    console.log('========================================');
    console.log('Presiona CTRL + C para detener el servidor');
    console.log('========================================\n');
});

// ============================================
// EXPORTAR LA APLICACIÓN
// ============================================

// Exportar para testing (opcional)
module.exports = app;