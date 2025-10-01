# PracticaRutaAvanzada_NetsJS
Práctica sobre lo aprendido de la ruta NestJS y TypeScript - Riwi

## 🚀 Features Implementados

### ✅ Users Module (feature/users-module)
Módulo completo de gestión de usuarios con:

- **CRUD Completo**: Create, Read, Update, Delete
- **Validaciones con DTOs**: class-validator para todos los endpoints
- **Protección por Roles**: Sistema de roles USER/ADMIN
- **Autenticación JWT**: Guards de seguridad
- **Tests Unitarios**: Cobertura completa de service y controller

#### Endpoints:
- `POST /users` - Crear usuario (Solo ADMIN)
- `GET /users` - Listar usuarios con paginación
- `GET /users/:id` - Obtener usuario por ID
- `PATCH /users/:id` - Actualizar usuario (Solo ADMIN)
- `DELETE /users/:id` - Eliminar usuario (Solo ADMIN)

### ✅ Tournaments Module (feature/tournaments-module)
Módulo completo de gestión de torneos con:

- **Modelo y CRUD de torneos**: Operaciones completas
- **Relación con usuarios**: Campo organizador vinculado a User
- **Validación de estados y fechas**: Reglas de negocio implementadas
- **Testeo completo**: Tests unitarios y de integración

#### Endpoints:
- `POST /tournaments` - Crear torneo (Solo ADMIN)
- `GET /tournaments` - Listar torneos con filtros y paginación
- `GET /tournaments/:id` - Obtener torneo específico
- `PATCH /tournaments/:id` - Actualizar torneo (Solo ADMIN)
- `DELETE /tournaments/:id` - Eliminar torneo (Solo ADMIN)

#### Validaciones de negocio:
- ✅ Fecha inicio < fecha fin
- ✅ No crear torneos en el pasado
- ✅ Mínimo 2 equipos por torneo
- ✅ Estados válidos (UPCOMING, ACTIVE, FINISHED)

## 🛠️ Tecnologías

- **Backend**: NestJS + TypeScript
- **Base de datos**: Prisma ORM + PostgreSQL
- **Autenticación**: JWT + bcryptjs
- **Validación**: class-validator + class-transformer
- **Testing**: Jest
- **Containerización**: Docker

## 🚀 Instalación

```bash
cd backend
npm install
npm run start:dev
