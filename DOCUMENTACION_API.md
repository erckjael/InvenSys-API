# Documentación Detallada de la API - InvenSys

Esta documentación describe todos los endpoints disponibles en la API REST de InvenSys.

## 📋 Tabla de Contenidos

- [Información General](#información-general)
- [Autenticación](#autenticación)
- [Respuestas Estándar](#respuestas-estándar)
- [Endpoints - Roles](#endpoints---roles)
- [Endpoints - Usuarios](#endpoints---usuarios)
- [Códigos de Estado HTTP](#códigos-de-estado-http)
- [Ejemplos de Errores](#ejemplos-de-errores)

---

## 🌐 Información General

### URL Base
```
http://localhost:3000
```

### Formato de Datos
- Todas las peticiones y respuestas usan formato **JSON**
- Content-Type: `application/json`

### Versionado
- Versión actual: **1.0.0**

---

## 🔐 Autenticación

⚠️ **Nota:** Esta versión de la API no implementa autenticación. Es un proyecto educativo.

En producción se debería implementar:
- JWT (JSON Web Tokens)
- OAuth 2.0
- API Keys

---

## 📦 Respuestas Estándar

Todas las respuestas siguen este formato:

### Respuesta Exitosa
```json
{
  "success": true,
  "mensaje": "Mensaje descriptivo",
  "data": { ... }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "mensaje": "Descripción del error",
  "error": "Detalles técnicos (opcional)"
}
```

---

## 📂 Endpoints - Roles

### 1. Crear un Rol

Crea un nuevo rol en el sistema.

**Endpoint:**
```http
POST /api/roles
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Administrador",
  "descripcion": "Acceso total al sistema",
  "permisos": ["crear", "leer", "actualizar", "eliminar"]
}
```

**Parámetros:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| nombre | String | Sí | Nombre del rol (único, 3-50 caracteres) |
| descripcion | String | Sí | Descripción del rol (máx. 200 caracteres) |
| permisos | Array | No | Array de permisos (default: ["leer"]) |

**Respuesta Exitosa (201 Created):**
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
    "fechaCreacion": "29/11/2025",
    "createdAt": "2025-11-29T10:30:00.000Z",
    "updatedAt": "2025-11-29T10:30:00.000Z"
  }
}
```

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | Campos obligatorios faltantes |
| 400 | Ya existe un rol con ese nombre |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Administrador",
    "descripcion": "Acceso total al sistema",
    "permisos": ["crear", "leer", "actualizar", "eliminar"]
  }'
```

---

### 2. Listar Todos los Roles

Obtiene la lista completa de roles.

**Endpoint:**
```http
GET /api/roles
```

**Query Parameters (opcionales):**

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| activo | Boolean | Filtrar por estado | `?activo=true` |

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "cantidad": 2,
  "data": [
    {
      "_id": "673f8a1b2c4d5e6f7g8h9i0j",
      "nombre": "Administrador",
      "descripcion": "Acceso total al sistema",
      "permisos": ["crear", "leer", "actualizar", "eliminar"],
      "activo": true,
      "fechaCreacion": "29/11/2025"
    },
    {
      "_id": "673f8a1b2c4d5e6f7g8h9i0k",
      "nombre": "Usuario",
      "descripcion": "Acceso limitado",
      "permisos": ["leer"],
      "activo": true,
      "fechaCreacion": "29/11/2025"
    }
  ]
}
```

**Ejemplo en cURL:**
```bash
curl -X GET http://localhost:3000/api/roles
```

**Filtrar roles activos:**
```bash
curl -X GET "http://localhost:3000/api/roles?activo=true"
```

---

### 3. Obtener un Rol por ID

Obtiene la información detallada de un rol específico.

**Endpoint:**
```http
GET /api/roles/:id
```

**URL Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | String | ID del rol (ObjectId de MongoDB) |

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
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

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | ID de rol inválido |
| 404 | Rol no encontrado |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X GET http://localhost:3000/api/roles/673f8a1b2c4d5e6f7g8h9i0j
```

---

### 4. Actualizar un Rol

Actualiza la información de un rol existente.

**Endpoint:**
```http
PUT /api/roles/:id
```

**URL Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | String | ID del rol a actualizar |

**Headers:**
```
Content-Type: application/json
```

**Body (JSON) - Todos los campos son opcionales:**
```json
{
  "nombre": "Super Administrador",
  "descripcion": "Acceso completo y absoluto",
  "permisos": ["all"],
  "activo": true
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "mensaje": "Rol actualizado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0j",
    "nombre": "Super Administrador",
    "descripcion": "Acceso completo y absoluto",
    "permisos": ["all"],
    "activo": true,
    "fechaCreacion": "29/11/2025"
  }
}
```

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | ID de rol inválido |
| 400 | Nombre duplicado |
| 404 | Rol no encontrado |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X PUT http://localhost:3000/api/roles/673f8a1b2c4d5e6f7g8h9i0j \
  -H "Content-Type: application/json" \
  -d '{
    "descripcion": "Nueva descripción"
  }'
```

---

### 5. Eliminar un Rol

Elimina permanentemente un rol del sistema.

**Endpoint:**
```http
DELETE /api/roles/:id
```

**URL Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | String | ID del rol a eliminar |

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "mensaje": "Rol eliminado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0j",
    "nombre": "Administrador"
  }
}
```

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | ID de rol inválido |
| 404 | Rol no encontrado |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X DELETE http://localhost:3000/api/roles/673f8a1b2c4d5e6f7g8h9i0j
```

---

## 👤 Endpoints - Usuarios

### 1. Crear un Usuario

Registra un nuevo usuario en el sistema.

**Endpoint:**
```http
POST /api/usuarios
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correoElectronico": "juan@example.com",
  "contrasena": "123456",
  "rol": "673f8a1b2c4d5e6f7g8h9i0j"
}
```

**Parámetros:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| nombres | String | Sí | Nombres del usuario (2-100 caracteres) |
| apellidos | String | Sí | Apellidos del usuario (2-100 caracteres) |
| correoElectronico | String | Sí | Email único y válido |
| contrasena | String | Sí | Contraseña (mínimo 6 caracteres) |
| rol | String | Sí | ID del rol (debe existir) |

**Respuesta Exitosa (201 Created):**
```json
{
  "success": true,
  "mensaje": "Usuario creado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0m",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "correoElectronico": "juan@example.com",
    "rol": {
      "_id": "673f8a1b2c4d5e6f7g8h9i0j",
      "nombre": "Administrador",
      "descripcion": "Acceso total al sistema"
    },
    "activo": true,
    "fechaRegistro": "29/11/2025"
  }
}
```

**Nota:** La contraseña no se incluye en la respuesta por seguridad.

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | Campos obligatorios faltantes |
| 400 | El rol especificado no existe |
| 400 | El correo electrónico ya está registrado |
| 400 | Formato de correo inválido |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Juan",
    "apellidos": "Pérez",
    "correoElectronico": "juan@example.com",
    "contrasena": "123456",
    "rol": "673f8a1b2c4d5e6f7g8h9i0j"
  }'
```

---

### 2. Listar Todos los Usuarios

Obtiene la lista completa de usuarios con sus roles.

**Endpoint:**
```http
GET /api/usuarios
```

**Query Parameters (opcionales):**

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| activo | Boolean | Filtrar por estado | `?activo=true` |
| rol | String | Filtrar por rol | `?rol=673f8a1b...` |

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "cantidad": 2,
  "data": [
    {
      "_id": "673f8a1b2c4d5e6f7g8h9i0m",
      "nombres": "Juan",
      "apellidos": "Pérez",
      "correoElectronico": "juan@example.com",
      "rol": {
        "_id": "673f8a1b2c4d5e6f7g8h9i0j",
        "nombre": "Administrador"
      },
      "activo": true,
      "fechaRegistro": "29/11/2025"
    },
    {
      "_id": "673f8a1b2c4d5e6f7g8h9i0n",
      "nombres": "María",
      "apellidos": "González",
      "correoElectronico": "maria@example.com",
      "rol": {
        "_id": "673f8a1b2c4d5e6f7g8h9i0k",
        "nombre": "Usuario"
      },
      "activo": true,
      "fechaRegistro": "29/11/2025"
    }
  ]
}
```

**Ejemplo en cURL:**
```bash
curl -X GET http://localhost:3000/api/usuarios
```

**Filtrar por rol:**
```bash
curl -X GET "http://localhost:3000/api/usuarios?rol=673f8a1b2c4d5e6f7g8h9i0j"
```

---

### 3. Obtener un Usuario por ID

Obtiene la información detallada de un usuario específico.

**Endpoint:**
```http
GET /api/usuarios/:id
```

**URL Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | String | ID del usuario (ObjectId de MongoDB) |

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0m",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "correoElectronico": "juan@example.com",
    "rol": {
      "_id": "673f8a1b2c4d5e6f7g8h9i0j",
      "nombre": "Administrador",
      "descripcion": "Acceso total al sistema"
    },
    "activo": true,
    "fechaRegistro": "29/11/2025"
  }
}
```

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | ID de usuario inválido |
| 404 | Usuario no encontrado |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X GET http://localhost:3000/api/usuarios/673f8a1b2c4d5e6f7g8h9i0m
```

---

### 4. Actualizar un Usuario

Actualiza la información de un usuario existente.

**Endpoint:**
```http
PUT /api/usuarios/:id
```

**URL Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | String | ID del usuario a actualizar |

**Headers:**
```
Content-Type: application/json
```

**Body (JSON) - Todos los campos son opcionales:**
```json
{
  "nombres": "Juan Carlos",
  "apellidos": "Pérez García",
  "correoElectronico": "juan.nuevo@example.com",
  "contrasena": "nueva123",
  "rol": "nuevo_id_rol",
  "activo": false
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "mensaje": "Usuario actualizado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0m",
    "nombres": "Juan Carlos",
    "apellidos": "Pérez García",
    "correoElectronico": "juan.nuevo@example.com",
    "rol": {
      "_id": "nuevo_id_rol",
      "nombre": "Usuario"
    },
    "activo": false,
    "fechaRegistro": "29/11/2025"
  }
}
```

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | ID de usuario inválido |
| 400 | El rol especificado no existe |
| 400 | Correo duplicado |
| 404 | Usuario no encontrado |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X PUT http://localhost:3000/api/usuarios/673f8a1b2c4d5e6f7g8h9i0m \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Juan Carlos"
  }'
```

---

### 5. Eliminar un Usuario

Elimina permanentemente un usuario del sistema.

**Endpoint:**
```http
DELETE /api/usuarios/:id
```

**URL Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | String | ID del usuario a eliminar |

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "mensaje": "Usuario eliminado exitosamente",
  "data": {
    "_id": "673f8a1b2c4d5e6f7g8h9i0m",
    "nombres": "Juan",
    "apellidos": "Pérez"
  }
}
```

**Errores Posibles:**

| Código | Descripción |
|--------|-------------|
| 400 | ID de usuario inválido |
| 404 | Usuario no encontrado |
| 500 | Error interno del servidor |

**Ejemplo en cURL:**
```bash
curl -X DELETE http://localhost:3000/api/usuarios/673f8a1b2c4d5e6f7g8h9i0m
```

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Uso en la API |
|--------|-------------|---------------|
| 200 | OK | Petición exitosa (GET, PUT, DELETE) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 400 | Bad Request | Datos inválidos o faltantes |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## ⚠️ Ejemplos de Errores

### Error 400 - Campos Faltantes
```json
{
  "success": false,
  "mensaje": "Todos los campos son obligatorios"
}
```

### Error 400 - Correo Duplicado
```json
{
  "success": false,
  "mensaje": "El correo electrónico ya está registrado"
}
```

### Error 400 - ID Inválido
```json
{
  "success": false,
  "mensaje": "ID de usuario inválido"
}
```

### Error 404 - No Encontrado
```json
{
  "success": false,
  "mensaje": "Usuario no encontrado"
}
```

### Error 500 - Error del Servidor
```json
{
  "success": false,
  "mensaje": "Error al crear el usuario",
  "error": "Detalles técnicos del error"
}
```

---

## 📝 Notas Importantes

### Sobre las Contraseñas
⚠️ En esta versión educativa, las contraseñas se almacenan en texto plano. **En producción se debe:**
- Usar bcrypt para encriptar contraseñas
- Implementar validación de fortaleza
- Nunca devolver contraseñas en las respuestas

### Sobre la Autenticación
⚠️ Esta API no implementa autenticación. **En producción se debe:**
- Implementar JWT (JSON Web Tokens)
- Requerir token en headers para peticiones protegidas
- Implementar refresh tokens
- Limitar intentos de acceso

### Sobre las Validaciones
✅ Validaciones implementadas:
- Campos requeridos
- Formatos de email
- Longitud mínima/máxima
- Unicidad de correos y nombres de roles

### Sobre CORS
✅ CORS está habilitado para permitir peticiones desde cualquier origen (desarrollo).  
⚠️ **En producción** se debe restringir a dominios específicos.

---

## 🔄 Flujo de Trabajo Recomendado

### Para crear un usuario:

1. **Listar roles disponibles**
```
   GET /api/roles
```

2. **Seleccionar un rol** (copiar el `_id`)

3. **Crear el usuario**
```
   POST /api/usuarios
```
   Incluir el `_id` del rol en el campo `rol`

4. **Verificar**
```
   GET /api/usuarios
```

---

## 📞 Soporte

Para reportar problemas o hacer consultas:
- **Email:** [tu-email@example.com]
- **GitHub:** https://github.com/[TuUsuario]/invensys-api/issues

---

**Documentación actualizada:** Noviembre 2025  
**Versión de la API:** 1.0.0  
**Autor:** [Tu Nombre]  
**Proyecto:** InvenSys - Sistema de Gestión de Inventario  
**Institución:** SENA