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

### ✅ Players Module (feature/players-module)
Módulo completo de gestión de jugadores con:

- **Modelo y CRUD de jugadores**: Operaciones completas vinculadas a equipos
- **Filtros avanzados**: Búsqueda por nombre, posición y equipo
- **Paginación completa**: Con metadatos y límites configurables
- **Validaciones robustas**: Campos requeridos y opcionales

#### Endpoints:
- `POST /players` - Crear jugador
- `GET /players` - Listar jugadores con filtros y paginación
- `GET /players/:id` - Obtener jugador específico
- `PATCH /players/:id` - Actualizar jugador
- `DELETE /players/:id` - Eliminar jugador

#### Filtros disponibles:
- ✅ Búsqueda por nombre (case-insensitive)
- ✅ Filtro por posición del jugador
- ✅ Filtro por equipo específico (teamId)
- ✅ Paginación con page y limit (1-100)
- ✅ Respuesta con metadatos (total, totalPages)

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
