# PracticaRutaAvanzada_NetsJS
Práctica sobre lo aprendido de la ruta NestJS y TypeScript - Riwi

## 🚀 Features Implementados

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
