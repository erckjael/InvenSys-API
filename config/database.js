/**
 * Configuración de conexión a MongoDB
 * 
 * Este archivo gestiona la conexión con la base de datos MongoDB Atlas
 * Utiliza Mongoose como ODM (Object Document Mapper)
 * 
 * @author Tu Nombre
 * @date 2025
 */

const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Función para conectar a la base de datos MongoDB
 * Utiliza async/await para manejar la operación asíncrona
 * 
 * @returns {Promise} Promesa que se resuelve cuando la conexión es exitosa
 */
const conectarDB = async () => {
    try {
        // Realizar la conexión a MongoDB
        // En Mongoose 6+, ya no se necesitan las opciones useNewUrlParser y useUnifiedTopology
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('✅ Conexión exitosa a MongoDB Atlas');
        console.log(`📦 Base de datos: ${process.env.DB_NAME}`);
        
    } catch (error) {
        // Capturar y mostrar errores de conexión
        console.error('❌ Error al conectar con MongoDB:', error.message);
        
        // Terminar el proceso si no se puede conectar
        process.exit(1);
    }
};

// Exportar la función para usarla en otros archivos
module.exports = conectarDB;
