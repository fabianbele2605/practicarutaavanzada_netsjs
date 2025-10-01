# PracticaRutaAvanzada_NetsJS
Práctica sobre lo aprendido de la ruta NestJS y TypeScript - Riwi

## 🚀 Feature Implementado

### ✅ Teams Module (feature/teams-module)
Módulo completo de gestión de equipos con:

- **Modelo y CRUD de equipos**: Operaciones completas vinculadas a torneos
- **Relación con torneos**: Verificación de existencia y límites de equipos
- **Asociación con jugadores**: Consultas incluidas y validaciones
- **Validaciones de negocio**: Límites por torneo, nombres únicos, integridad referencial

#### Endpoints implementados:
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

#### Características técnicas:
- **DTOs con validaciones**: CreateTeamDto, UpdateTeamDto, QueryTeamDto
- **Protección por roles**: Solo ADMIN puede crear/actualizar/eliminar
- **Paginación**: Implementada con límites configurables
- **Filtros**: Por nombre de equipo y torneo específico
- **Tests unitarios**: Cobertura completa de service y controller
- **Relaciones**: Incluye datos de torneo y conteo de jugadores

## 🛠️ Tecnologías utilizadas

- **Backend**: NestJS + TypeScript
- **Base de datos**: Prisma ORM + PostgreSQL
- **Validación**: class-validator + class-transformer
- **Autenticación**: JWT + Guards personalizados
- **Testing**: Jest con mocks

## 🚀 Instalación y uso

```bash
cd backend
npm install
npx prisma generate
npm run start:dev
