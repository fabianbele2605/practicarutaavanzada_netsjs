# PracticaRutaAvanzada_NetsJS
Práctica sobre lo aprendido de la ruta NestJS y TypeScript - Riwi

## 🚀 **Sistema de Gestión de Torneos**

Sistema completo de gestión de torneos deportivos desarrollado con **NestJS**, **TypeScript**, **Prisma** y **PostgreSQL**. Incluye autenticación JWT, autorización por roles y CRUD completo para todas las entidades.

## 📋 **Módulos Implementados**

### ✅ **Users Module**
Gestión completa de usuarios del sistema.
- **Funcionalidades**: CRUD de usuarios, encriptación de contraseñas, sistema de roles
- **Roles**: USER, ADMIN
- **Endpoints**: `/users` (GET, POST, PATCH, DELETE)
- **Seguridad**: Contraseñas encriptadas con bcrypt

### ✅ **Auth Module**
Sistema de autenticación y autorización.
- **Funcionalidades**: Login, registro, JWT tokens, guards de seguridad
- **Endpoints**: `/auth/login`, `/auth/register`, `/auth/profile`
- **Seguridad**: JWT Strategy, Guards (JwtAuthGuard, RolesGuard), decoradores @Roles

### ✅ **Tournaments Module**
Gestión de torneos deportivos.
- **Funcionalidades**: CRUD de torneos, validaciones de fechas, relación con organizadores
- **Endpoints**: `/tournaments` (GET, POST, PATCH, DELETE)
- **Validaciones**: Fechas válidas, límites de equipos, estados del torneo

### ✅ **Teams Module**
Gestión de equipos participantes.
- **Funcionalidades**: CRUD de equipos, relación con torneos, validaciones de límites
- **Endpoints**: `/teams` (GET, POST, PATCH, DELETE)
- **Validaciones**: Límite máximo por torneo, nombres únicos por torneo

### ✅ **Players Module**
Gestión de jugadores de los equipos.
- **Funcionalidades**: CRUD de jugadores, relación con equipos, filtros avanzados
- **Endpoints**: `/players` (GET, POST, PATCH, DELETE)
- **Características**: Filtros por nombre, posición, equipo, paginación

### ✅ **Matches Module**
Gestión completa de partidos entre equipos.
- **Funcionalidades**: CRUD de partidos, gestión de resultados, estados de partidos, filtros avanzados
- **Endpoints**: `/matches` (GET, POST, PATCH, DELETE)
- **Validaciones**: Equipos del mismo torneo, no pueden jugar contra sí mismos, fechas válidas
- **Filtros**: Por torneo, equipos, fecha, estado del partido
- **Estados**: SCHEDULED, LIVE, FINISHED, CANCELLED

### ✅ **WebSockets Module**
Sistema de comunicación en tiempo real.
- **Funcionalidades**: Notificaciones en tiempo real, actualizaciones de partidos en vivo
- **Tecnología**: Socket.IO integrado con NestJS
- **Características**: Manejo de conexiones, mensajes bidireccionales, CORS configurado
- **Gateway**: EventsGateway para manejo de eventos WebSocket

### ✅ **CI/CD Pipeline**
Sistema de integración y despliegue continuo.
- **CI Pipeline**: Tests automatizados, linting, validaciones en cada push
- **CD Pipeline**: Despliegue automático a producción desde main
- **Security Pipeline**: Escaneo de vulnerabilidades y auditoría de dependencias
- **Tecnología**: GitHub Actions con workflows automatizados
- **Características**: Tests E2E, Docker builds, reportes de seguridad

### ✅ **Testing Setup**
Suite completa de testing automatizado.
- **Unit Tests**: Tests unitarios para todos los servicios y controladores
- **E2E Tests**: Tests de integración end-to-end
- **Test Coverage**: Reportes de cobertura de código
- **Tecnología**: Jest + Supertest para testing completo
- **Características**: Mocks, fixtures, base de datos de testing

## 🏗️ **Arquitectura del Sistema**

### **Tecnologías Principales:**
- **Backend**: NestJS + TypeScript
- **Base de datos**: PostgreSQL + Prisma ORM
- **Autenticación**: JWT + Passport
- **Validación**: class-validator + class-transformer
- **WebSockets**: Socket.IO para tiempo real
- **Testing**: Jest + Supertest + Coverage
- **CI/CD**: GitHub Actions + Workflows automatizados
- **Seguridad**: ESLint + Audit + Trivy Docker scan
- **Containerización**: Docker + Docker Compose

### **Patrones Implementados:**
- **Módulos**: Arquitectura modular de NestJS
- **DTOs**: Validación de entrada y salida
- **Guards**: Protección de endpoints
- **Decoradores**: Metadata para roles y validaciones
- **Services**: Lógica de negocio separada
- **Controllers**: Manejo de rutas HTTP

## 📊 **Modelo de Base de Datos**

```prisma
model User {
  id          String       @id @default(cuid())
  email       String       @unique
  password    String
  name        String
  role        Role         @default(USER)
  tournaments Tournament[]
}

model Tournament {
  id          String           @id @default(cuid())
  name        String
  description String?
  startDate   DateTime
  endDate     DateTime
  maxTeams    Int
  status      TournamentStatus @default(UPCOMING)
  organizer   User             @relation(fields: [organizerId], references: [id])
  teams       Team[]
  matches     Match[]
}

model Team {
  id          String @id @default(cuid())
  name        String
  description String?
  tournament  Tournament @relation(fields: [tournamentId], references: [id])
  players     Player[]
  homeMatches Match[] @relation("HomeTeam")
  awayMatches Match[] @relation("AwayTeam")
}

model Player {
  id       String  @id @default(cuid())
  name     String
  position String?
  number   Int?
  team     Team    @relation(fields: [teamId], references: [id])
}

model Match {
  id         String      @id @default(cuid())
  matchDate  DateTime
  homeScore  Int?
  awayScore  Int?
  status     MatchStatus @default(SCHEDULED)
  tournament Tournament  @relation(fields: [tournamentId], references: [id])
  homeTeam   Team        @relation("HomeTeam", fields: [homeTeamId], references: [id])
  awayTeam   Team        @relation("AwayTeam", fields: [awayTeamId], references: [id])
}
```

## 🔐 **Sistema de Seguridad**

### **Autenticación:**
- JWT tokens con expiración configurable
- Contraseñas encriptadas con bcrypt (salt rounds: 10)
- Estrategia Passport para validación de tokens

### **Autorización:**
- Sistema de roles: USER, ADMIN
- Guards para protección de endpoints
- Decorador @Roles para especificar permisos requeridos

### **Endpoints Protegidos:**
```typescript
// Público
POST /auth/login
POST /auth/register
POST /users

// Autenticado (JWT requerido)
GET /auth/profile
GET /users, /tournaments, /teams, /players, /matches

// Solo ADMIN
POST /tournaments, /teams, /matches
PATCH /tournaments, /teams, /matches
DELETE /tournaments, /teams, /matches, /users
```

## 🧪 **Ejemplos de Uso**

### **1. Autenticación:**
```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123","name":"Admin User","role":"ADMIN"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### **2. Gestión de Torneos:**
```bash
# Crear torneo (requiere token ADMIN)
curl -X POST http://localhost:3000/tournaments \
  -H "Authorization: Bearer [JWT_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"name":"Copa 2024","startDate":"2024-06-01","endDate":"2024-06-30","maxTeams":16}'
```

### **3. Gestión de Equipos:**
```bash
# Crear equipo (requiere token ADMIN)
curl -X POST http://localhost:3000/teams \
  -H "Authorization: Bearer [JWT_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"name":"Real Madrid","tournamentId":"tournament_id_123"}'
```

### **4. Gestión de Partidos:**
```bash
# Crear partido (requiere token ADMIN)
curl -X POST http://localhost:3000/matches \
  -H "Authorization: Bearer [JWT_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"matchDate":"2025-12-15T20:00:00Z","tournamentId":"tournament_id","homeTeamId":"team1_id","awayTeamId":"team2_id"}'

# Listar partidos con filtros
curl "http://localhost:3000/matches?tournamentId=tournament_id&status=SCHEDULED" \
  -H "Authorization: Bearer [JWT_TOKEN]"
```

### **5. WebSockets:**
```javascript
// Conexión desde cliente
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => console.log('Connected'));
socket.emit('message', 'Hello from client');
```

### **6. Testing:**
```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests E2E
npm run test:e2e

# Generar reporte de cobertura
npm run test:cov

# Ejecutar linting
npm run lint
```

### **7. CI/CD:**
```bash
# Los pipelines se ejecutan automáticamente:
# - CI: En cada push a feature branches
# - CD: En cada push a main
# - Security: Semanalmente y en PRs

# Build para producción
docker-compose -f docker-compose.prod.yml up -d
```

## 🚀 **Instalación y Configuración**

### **Prerrequisitos:**
- Node.js 18+
- Docker y Docker Compose
- Git

### **Pasos de Instalación:**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/fabianbele2605/PracticaRutaAvanzada_NetsJS.git
   cd PracticaRutaAvanzada_NetsJS
   ```

2. **Configurar variables de entorno:**
   ```bash
   cd backend
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

3. **Levantar la base de datos:**
   ```bash
   docker-compose up -d postgres
   ```

4. **Instalar dependencias:**
   ```bash
   npm install
   ```

5. **Ejecutar migraciones:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Iniciar el servidor:**
   ```bash
   npm run start:dev
   ```

## 📁 **Estructura del Proyecto**

```
backend/
├── src/
│   ├── auth/           # Módulo de autenticación
│   ├── users/          # Módulo de usuarios
│   ├── tournaments/    # Módulo de torneos
│   ├── teams/          # Módulo de equipos
│   ├── players/        # Módulo de jugadores
│   ├── matches/        # Módulo de partidos
│   ├── websockets/     # Módulo de WebSockets
│   ├── reporting/      # Módulo de reportes
│   ├── prisma/         # Servicio de Prisma
│   ├── app.module.ts   # Módulo principal
│   └── main.ts         # Punto de entrada
├── prisma/
│   ├── schema.prisma   # Esquema de base de datos
│   └── migrations/     # Migraciones
├── test/               # Tests e2e
├── Dockerfile          # Docker para producción
├── package.json
├── docker-compose.yml
└── docker-compose.prod.yml
.github/
├── workflows/
│   ├── ci.yml          # Pipeline de CI
│   ├── cd.yml          # Pipeline de CD
│   └── security.yml    # Pipeline de seguridad
.env.prod               # Variables de producción
```

## ✅ **Estado del Desarrollo**

- [x] **Módulo Users**: CRUD completo con roles
- [x] **Módulo Auth**: JWT + Guards + Decoradores
- [x] **Módulo Tournaments**: Gestión completa de torneos
- [x] **Módulo Teams**: Gestión de equipos con validaciones
- [x] **Módulo Players**: Gestión de jugadores con filtros
- [x] **Módulo Matches**: Gestión completa de partidos con validaciones y filtros
- [x] **Módulo WebSockets**: Comunicación en tiempo real con Socket.IO
- [x] **Módulo Reporting**: Servicios de reportes y estadísticas
- [x] **CI/CD Pipeline**: Integración y despliegue continuo con GitHub Actions
- [x] **Testing Setup**: Suite completa de tests unitarios y E2E
- [x] **Security Pipeline**: Escaneo de vulnerabilidades y auditoría
- [x] **Base de datos**: Esquema completo con relaciones
- [x] **Seguridad**: Autenticación y autorización
- [x] **Validaciones**: DTOs y reglas de negocio
- [x] **Tests**: Unitarios y E2E para todos los módulos
- [x] **Testing API**: Colección Postman completa
- [x] **Documentación**: READMEs específicos por módulo
- [x] **Containerización**: Docker para desarrollo y producción

## 🔄 **Flujo de Desarrollo**

### **Ramas del Proyecto:**
- `main`: Rama principal (producción)
- `develop`: Rama de desarrollo (integración)
- `feature/users-module`: Módulo de usuarios
- `feature/authentication`: Sistema de autenticación
- `feature/tournaments-module`: Módulo de torneos
- `feature/teams-module`: Módulo de equipos
- `feature/players-module`: Módulo de jugadores
- `feature/matches-module`: Módulo de partidos
- `feature/realtime-websockets`: Sistema de WebSockets
- `feature/postman-collection`: Colección de Postman para testing
- `feature/ci-cd`: Pipeline de CI/CD con GitHub Actions
- `feature/testing-setup`: Configuración de testing automatizado

### **Metodología:**
- **Git Flow**: Ramas feature para cada módulo
- **Scaffolding**: Aprendizaje guiado paso a paso
- **TDD**: Tests unitarios para cada funcionalidad
- **Code Review**: Revisión de código antes de merge

## 🚀 **Próximas Funcionalidades**

1. **Eventos WebSocket**: Notificaciones específicas para torneos y partidos
2. **Módulo de Estadísticas**: Métricas y reportes de torneos
3. **API Documentation**: Swagger/OpenAPI completo
4. **Autenticación WebSocket**: JWT para conexiones WebSocket
5. **File Upload**: Subida de imágenes para equipos/jugadores
6. **Dashboard**: Panel administrativo web
7. **Mobile API**: Endpoints optimizados para móviles

## 👨‍💻 **Desarrollado por**
- **Estudiante**: Fabián Beleño
- **Institución**: Riwi
- **Programa**: Ruta Avanzada NestJS y TypeScript
- **Metodología**: Scaffolding (Aprendizaje guiado)

---
**Nota**: Este proyecto demuestra el dominio completo de NestJS, TypeScript, Prisma y patrones de desarrollo backend modernos.