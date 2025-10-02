# Tournament API - Postman Collection

## 📋 **Descripción**
Colección completa de Postman para probar todos los endpoints del Sistema de Gestión de Torneos desarrollado con NestJS.

## 📁 **Contenido**
- `postman/Tournament API.postman_collection.json` - Colección exportada de Postman

## 🚀 **Cómo usar**

### **1. Importar en Postman:**
1. Abrir Postman
2. Clic en **"Import"**
3. Seleccionar el archivo `Tournament API.postman_collection.json`
4. La colección aparecerá en tu workspace

### **2. Configurar el entorno:**
1. Asegúrate que el servidor esté corriendo en `http://localhost:3000`
2. Ejecuta los requests en este orden:

## 📝 **Orden de Ejecución**

### **Paso 1: Autenticación**
1. **Register User** - Crear usuario administrador
2. **Login User** - Obtener JWT token
3. **Copiar el access_token** de la respuesta

### **Paso 2: Configurar Token**
- En cada request que requiera autenticación:
  - Authorization → Bearer Token
  - Pegar el access_token obtenido

### **Paso 3: Crear Datos**
1. **Create Tournament** - Crear torneo
2. **Create Team 1** - Crear primer equipo
3. **Create Team 2** - Crear segundo equipo
4. **Create Match** - Crear partido entre equipos

## 🔐 **Endpoints Incluidos**

### **Authentication:**
- `POST /auth/register` - Registro de usuarios
- `POST /auth/login` - Login y obtención de JWT

### **Tournaments:**
- `POST /tournaments` - Crear torneo (ADMIN)

### **Teams:**
- `POST /teams` - Crear equipos (ADMIN)

### **Matches:**
- `POST /matches` - Crear partidos (ADMIN)

## ⚙️ **Configuración de Ejemplo**

### **Usuario de Prueba:**
```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "name": "Admin User",
  "role": "ADMIN"
}
```

### **Torneo de Prueba:**
```json
{
  "name": "Copa 2025",
  "startDate": "2025-12-01",
  "endDate": "2025-12-30",
  "maxTeams": 8
}
```

### **Equipos de Prueba:**
```json
{
  "name": "Real Madrid",
  "tournamentId": "[ID_DEL_TORNEO]"
}
```

## 🧪 **Testing**

### **Validaciones Probadas:**
- ✅ Autenticación JWT funcional
- ✅ Creación de torneos con fechas futuras
- ✅ Creación de equipos vinculados a torneos
- ✅ Creación de partidos entre equipos del mismo torneo
- ✅ Validaciones de negocio (equipos no pueden jugar contra sí mismos)

### **Respuestas Esperadas:**
- **201 Created**: Para creación exitosa
- **200 OK**: Para consultas exitosas
- **400 Bad Request**: Para validaciones fallidas
- **401 Unauthorized**: Para falta de autenticación
- **404 Not Found**: Para recursos no encontrados

## 📋 **Notas Importantes**

1. **Fechas**: Usar fechas futuras para torneos (ej: 2025-12-01)
2. **IDs**: Copiar IDs de las respuestas para usar en requests posteriores
3. **Token**: El JWT token expira, hacer login nuevamente si es necesario
4. **Orden**: Seguir el orden de ejecución para evitar errores de dependencias

## 🔄 **Flujo Completo de Testing**

```
1. Register → 2. Login → 3. Create Tournament → 4. Create Teams → 5. Create Match
```

## 🛠️ **Requisitos**

- **Postman**: Versión 8.0 o superior
- **Servidor**: NestJS corriendo en localhost:3000
- **Base de datos**: PostgreSQL configurada y migraciones ejecutadas

---

**Colección creada por**: Fabián Beleño  
**Fecha**: Octubre 2025  
**Versión**: 1.0  
**Estado**: ✅ Funcional y probada