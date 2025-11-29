# InvenSys API REST

API REST desarrollada con Node.js, Express y MongoDB para el sistema de gestión de inventario InvenSys.

## 📋 Información del Proyecto

- **Nombre:** InvenSys API REST
- **Tecnología:** Node.js + Express + MongoDB
- **Base de datos:** MongoDB Atlas
- **Componente:** Construcción de API
- **Evidencia:** GA7-220501096-AA5-EV03

## 👨‍💻 Autor

**Nombre:** Erckjael Salazar  
**Programa:** Analisis y desarrollo web 
**Centro de Formación:** SENA  
**Fecha:** Noviembre 2025

## 🚀 Descripción

API REST que proporciona servicios web para la gestión de usuarios y roles del sistema InvenSys. Implementa operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) siguiendo los estándares REST y buenas prácticas de desarrollo.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js v20.x** - Entorno de ejecución de JavaScript
- **Express 4.18.x** - Framework web minimalista
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose 8.x** - ODM para MongoDB

### Dependencias
- **body-parser** - Parser de cuerpos de peticiones
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **nodemon** - Reinicio automático del servidor (dev)

## 📁 Estructura del Proyecto
```
invensys-api/
├── models/
│   ├── Usuario.js          # Modelo de Usuario
│   └── Rol.js              # Modelo de Rol
├── routes/
│   ├── usuarios.js         # Rutas de usuarios
│   └── roles.js            # Rutas de roles
├── config/
│   └── database.js         # Configuración de BD
├── screenshots/            # Capturas de pantalla
├── .env                    # Variables de entorno
├── .gitignore             # Archivos ignorados por Git
├── app.js                 # Archivo principal
├── package.json           # Dependencias del proyecto
├── README.md              # Este archivo
└── DOCUMENTACION_API.md   # Documentación detallada
```

## ⚙️ Instalación

### Requisitos Previos

- Node.js v14.0.0 o superior
- npm v5.6 o superior
- Cuenta en MongoDB Atlas
- Git

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/[TuUsuario]/invensys-api.git
cd invensys-api
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Crear archivo `.env` en la raíz con:
```env
PORT=3000
MONGODB_URI=tu_url_de_mongodb_atlas
DB_NAME=invensys
NODE_ENV=development
```

4. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

5. **Ejecutar en modo producción:**
```bash
npm start
```

## 🌐 Endpoints de la API

### URL Base
```
http://localhost:3000
```

### Rutas Principales

#### **Información General**
- `GET /` - Información de la API
- `GET /api/status` - Estado del servidor

#### **Roles**
- `POST /api/roles` - Crear un nuevo rol
- `GET /api/roles` - Listar todos los roles
- `GET /api/roles/:id` - Obtener un rol por ID
- `PUT /api/roles/:id` - Actualizar un rol
- `DELETE /api/roles/:id` - Eliminar un rol

#### **Usuarios**
- `POST /api/usuarios` - Crear un nuevo usuario
- `GET /api/usuarios` - Listar todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `DELETE /api/usuarios/:id` - Eliminar un usuario

Para documentación detallada de cada endpoint, ver [DOCUMENTACION_API.md](DOCUMENTACION_API.md)

## 📝 Ejemplos de Uso

### Crear un Rol

**Request:**
```http
POST /api/roles
Content-Type: application/json

{
  "nombre": "Administrador",
  "descripcion": "Acceso total al sistema",
  "permisos": ["crear", "leer", "actualizar", "eliminar"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "mensaje": "Rol creado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0j",
    "nombre": "Administrador",
    "descripcion": "Acceso total al sistema",
    "permisos": ["crear", "leer", "actualizar", "eliminar"],
    "activo": true,
    "fechaCreacion": "29/11/2025"
  }
}
```

### Crear un Usuario

**Request:**
```http
POST /api/usuarios
Content-Type: application/json

{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correoElectronico": "juan@example.com",
  "contrasena": "123456",
  "rol": "673f8a1b2c4d5e6f7g8h9i0j"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "mensaje": "Usuario creado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0k",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "correoElectronico": "juan@example.com",
    "rol": {
      "_id": "673f8a1b2c4d5e6f7g8h9i0j",
      "nombre": "Administrador"
    },
    "activo": true,
    "fechaRegistro": "29/11/2025"
  }
}
```

## 🧪 Testing

Se recomienda usar **Postman** para probar la API.

### Importar colección de Postman

1. Abrir Postman
2. Import → File
3. Seleccionar `InvenSys_API.postman_collection.json`

### Probar manualmente

1. Iniciar el servidor: `npm run dev`
2. Abrir Postman
3. Probar los endpoints según la documentación

## 📊 Base de Datos

### Colecciones de MongoDB

#### **roles**
```javascript
{
  _id: ObjectId,
  nombre: String,
  descripcion: String,
  permisos: [String],
  activo: Boolean,
  fechaCreacion: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### **usuarios**
```javascript
{
  _id: ObjectId,
  nombres: String,
  apellidos: String,
  correoElectronico: String,
  contrasena: String,
  rol: ObjectId (ref: 'Rol'),
  activo: Boolean,
  fechaRegistro: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Seguridad

⚠️ **Nota de Seguridad:** Esta API es un proyecto educativo. En producción se deben implementar:

- Encriptación de contraseñas (bcrypt)
- Autenticación con JWT
- Validación y sanitización de datos
- Rate limiting
- HTTPS
- Variables de entorno seguras

## 📚 Buenas Prácticas Implementadas

✅ **Código limpio y comentado**  
✅ **Nomenclatura en lowerCamelCase**  
✅ **Manejo de errores con try-catch**  
✅ **Validaciones en modelos de Mongoose**  
✅ **Respuestas estandarizadas en JSON**  
✅ **Uso de async/await**  
✅ **Separación de responsabilidades (MVC)**  
✅ **Código modular y reutilizable**  

## 🐛 Solución de Problemas

### Error: No se puede conectar a MongoDB
- Verificar que la URL de conexión sea correcta
- Verificar que el usuario y contraseña sean correctos
- Verificar que la IP esté permitida en MongoDB Atlas

### Error: Port already in use
- Cambiar el puerto en el archivo `.env`
- O detener el proceso que usa el puerto 3000

### Error: Module not found
- Ejecutar `npm install` nuevamente
- Verificar que todas las dependencias estén instaladas

## 📦 Scripts Disponibles
```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar servidor en desarrollo (nodemon)
```

## 🔗 Enlaces

- **Repositorio GitHub:** https://github.com/[TuUsuario]/invensys-api
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Documentación Node.js:** https://nodejs.org/
- **Documentación Express:** https://expressjs.com/
- **Documentación Mongoose:** https://mongoosejs.com/

## 📄 Licencia

Este proyecto es parte de una actividad académica del SENA.

---

**Desarrollado con ❤️ para el SENA - 2025**