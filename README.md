# Players Module - feature/players-module

## 📋 Implementación
Módulo completo de gestión de jugadores en NestJS con operaciones CRUD, filtros avanzados y paginación.

## ✅ Funcionalidades Desarrolladas

### Estructura del Módulo
- **DTOs**: CreatePlayerDto, UpdatePlayerDto, QueryPlayerDto
- **Service**: PlayersService con lógica de negocio
- **Controller**: PlayersController con endpoints REST
- **Module**: PlayersModule configurado e integrado

### Endpoints REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/players` | Crear nuevo jugador |
| `GET` | `/players` | Listar jugadores con filtros |
| `GET` | `/players/:id` | Obtener jugador específico |
| `PATCH` | `/players/:id` | Actualizar jugador |
| `DELETE` | `/players/:id` | Eliminar jugador |

### Filtros y Validaciones
- ✅ Búsqueda por nombre (case-insensitive)
- ✅ Filtro por posición del jugador
- ✅ Filtro por equipo específico (teamId)
- ✅ Paginación con page y limit (1-100)
- ✅ Respuesta con metadatos (total, totalPages)
- ✅ Validaciones de campos requeridos y opcionales

## 📁 Archivos Creados

```
src/players/
├── dto/
│   ├── create-player.dto.ts
│   ├── update-player.dto.ts
│   └── query-player.dto.ts
├── players.controller.ts
├── players.service.ts
└── players.module.ts
```

## 🔧 Tecnologías Utilizadas
- **NestJS + TypeScript**
- **Prisma ORM**
- **class-validator + class-transformer**
- **Inyección de dependencias**

## 🚀 Instalación

```bash
cd backend
npm install
npm run start:dev
```