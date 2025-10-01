# PracticaRutaAvanzada_NetsJS
Práctica sobre lo aprendido de la ruta NestJS y TypeScript - Riwi

## 🚀 Features Implementados

### ✅ Users Module
Módulo base de gestión de usuarios con:

- **Modelo y CRUD de usuarios**: Operaciones completas
- **Sistema de roles**: USER y ADMIN
- **Autenticación**: Registro y login
- **Validaciones**: Email único y campos requeridos

#### Endpoints:
- `POST /users` - Crear usuario
- `GET /users` - Listar usuarios con filtros
- `GET /users/:id` - Obtener usuario específico
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### ✅ Auth Module
Módulo de autenticación y autorización con:

- **JWT Authentication**: Tokens seguros
- **Guards y Strategies**: Protección de rutas
- **Role-based Access**: Control por roles
- **Password Hashing**: Encriptación con bcrypt

#### Endpoints:
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `GET /auth/profile` - Perfil del usuario autenticado

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

### ✅ Teams Module (feature/teams-module)
Módulo completo de gestión de equipos con:

- **Modelo y CRUD de equipos**: Operaciones completas vinculadas a torneos
- **Relación con torneos**: Verificación de existencia y límites
- **Asociación con jugadores**: Consultas incluidas y validaciones
- **Validaciones de negocio**: Límites por torneo, nombres únicos

#### Endpoints:
- `POST /teams` - Crear equipo en torneo específico (Solo ADMIN)
- `GET /teams` - Listar equipos con filtros y paginación
- `GET /teams/:id` - Obtener equipo específico con jugadores
- `PATCH /teams/:id` - Actualizar equipo (Solo ADMIN)
- `DELETE /teams/:id` - Eliminar equipo (Solo ADMIN)

#### Validaciones de negocio:
- ✅ Verificar que el torneo existe antes de crear equipo
- ✅ Respetar límite máximo de equipos por torneo (maxTeams)
- ✅ No permitir nombres duplicados en el mismo torneo
- ✅ No eliminar equipos que tengan jugadores asociados
- ✅ Búsqueda case-insensitive por nombre

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
