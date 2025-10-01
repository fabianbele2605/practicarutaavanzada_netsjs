# PracticaRutaAvanzada_NetsJS
practica sobre los aprendido de la ruta NestJS y typeScript Riwi

# Users Module - Feature Implementation

## 📋 **Resumen de la Rama `feature/users-module`**

Esta rama implementa el módulo de **Users (Usuarios)** para el sistema de gestión de torneos, incluyendo CRUD completo, validaciones de negocio y gestión de roles.

## 🚀 **Funcionalidades Implementadas**

### **1. DTOs (Data Transfer Objects)**
- **CreateUserDto**: Validación para crear usuarios
  - `email`: Email único (obligatorio)
  - `password`: Contraseña (obligatorio, mínimo 6 caracteres)
  - `name`: Nombre completo (obligatorio)
  - `role`: Rol del usuario (USER/ADMIN, opcional, default: USER)

- **UpdateUserDto**: Validación para actualizar usuarios
  - Hereda campos de CreateUserDto (todos opcionales)
  - Permite actualización parcial de datos

- **QueryUserDto**: Filtros para búsqueda
  - `name`: Filtrar por nombre (búsqueda parcial)
  - `email`: Filtrar por email específico
  - `role`: Filtrar por rol (USER/ADMIN)

### **2. UsersService - Lógica de Negocio**

#### **Validaciones Implementadas:**
- ✅ Email único en el sistema
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de existencia antes de actualizar/eliminar
- ✅ Protección de datos sensibles (no retorna passwords)

#### **Métodos CRUD:**
- `create()`: Crear nuevo usuario con encriptación de password
- `findAll()`: Buscar usuarios con filtros opcionales
- `findOne()`: Obtener usuario por ID
- `findByEmail()`: Buscar usuario por email
- `update()`: Actualizar datos de usuario
- `remove()`: Eliminar usuario

### **3. UsersController - Endpoints REST**

```typescript
GET    /users        → Listar todos los usuarios
GET    /users/:id    → Obtener usuario específico
POST   /users        → Crear nuevo usuario
PATCH  /users/:id    → Actualizar usuario
DELETE /users/:id    → Eliminar usuario
```

### **4. UsersModule - Configuración**
- Controller y Service registrados
- PrismaService como dependencia
- Módulo registrado en AppModule

## 🛠️ **Archivos Creados/Modificados**

### **Nuevos Archivos:**
```
src/users/
├── dto/
│   ├── create-user.dto.ts      ✅ Nuevo
│   ├── update-user.dto.ts      ✅ Nuevo
│   └── query-user.dto.ts       ✅ Nuevo
├── users.controller.ts         ✅ Nuevo
├── users.controller.spec.ts    ✅ Nuevo
├── users.service.ts            ✅ Nuevo
├── users.service.spec.ts       ✅ Nuevo
└── users.module.ts             ✅ Nuevo
```

### **Archivos Modificados:**
```
src/app.module.ts               ✅ Agregado UsersModule
package.json                    ✅ Dependencias bcrypt
```

## 🔧 **Dependencias Agregadas**
- `bcrypt`: Para encriptación de contraseñas
- `@types/bcrypt`: Tipos TypeScript para bcrypt

## 📊 **Modelo de Datos**

El módulo trabaja con el modelo `User` de Prisma:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tournaments Tournament[]
}

enum Role {
  USER
  ADMIN
}
```

## 🧪 **Ejemplos de Uso**

### **Crear Usuario:**
```json
POST /users
{
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Juan Pérez",
  "role": "USER"
}
```

### **Actualizar Usuario:**
```json
PATCH /users/user_id_123
{
  "name": "Juan Pérez Actualizado",
  "role": "ADMIN"
}
```

### **Buscar Usuarios:**
```
GET /users?role=ADMIN&name=Juan
```

## 🔐 **Seguridad Implementada**

### **Encriptación:**
- Contraseñas encriptadas con bcrypt (salt rounds: 10)
- Validación de email único
- Protección de datos sensibles (passwords no se retornan)

## ✅ **Estado del Desarrollo**

- [x] DTOs con validaciones completas
- [x] Service con lógica de negocio
- [x] Controller con endpoints REST
- [x] Sistema de roles (USER/ADMIN)
- [x] Módulo configurado correctamente
- [x] Tests unitarios implementados
- [x] Integración con AppModule
- [x] Encriptación de contraseñas

## 🚀 **Próximos Pasos Sugeridos**

1. **Validaciones avanzadas**: Más validaciones de negocio
2. **Paginación**: Implementar paginación en listado
3. **Filtros avanzados**: Más opciones de búsqueda
4. **Soft Delete**: Eliminación lógica de usuarios
5. **Audit Logs**: Registro de cambios en usuarios

## 👨💻 **Desarrollado por**
- **Rama**: `feature/users-module`
- **Patrón**: NestJS + Prisma + bcrypt
- **Funcionalidad**: Gestión completa de usuarios

---
**Nota**: Este módulo proporciona la gestión de usuarios para el sistema de torneos.