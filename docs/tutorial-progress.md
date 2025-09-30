# Tutorial: Plataforma de Gestión de Torneos - Progreso Paso a Paso

## 📋 Fase 1: Preparación y Configuración del Entorno

### ✅ Completado

#### Paso 1: Inicialización del proyecto NestJS
```bash
cd /home/Coder/Documentos/GitHub/PracticaRutaAvanzada_NetsJS/backend
npx @nestjs/cli new . --package-manager npm
```

**Archivos creados:**
- `src/main.ts` - Punto de entrada
- `src/app.module.ts` - Módulo raíz
- `src/app.controller.ts` - Controlador principal
- `src/app.service.ts` - Servicio principal
- Archivos de configuración: `.prettierrc`, `eslint.config.mjs`, `tsconfig.json`

#### Paso 2: Verificación del servidor
```bash
npm run start
```
✅ Servidor funcionando en `http://localhost:3000`

#### Paso 3: Configuración de variables de entorno
```bash
npm install @nestjs/config
```

**Archivo `.env` creado:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tournament_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# App
PORT=3000
NODE_ENV="development"
```

#### Paso 4: Configuración del ConfigModule
**Archivo modificado:** `src/app.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### Paso 5: Instalación y configuración de Prisma
```bash
npm install prisma @prisma/client
npx prisma init
```

**Archivos creados:**
- `prisma/schema.prisma` - Esquema de base de datos
- Actualización en `.env` con `DATABASE_URL`

#### Paso 6: Diseño del esquema de base de datos

**Modelos creados en `prisma/schema.prisma`:**

1. **Modelo User:**
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

2. **Modelo Tournament:**
```prisma
model Tournament {
  id            String   @id @default(cuid())
  name          String   
  description   String?
  startDate     DateTime
  endDate       DateTime
  maxTeams      Int
  status        TournamentStatus @default(UPCOMING)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  teams         Team[]
  matches       Match[]
}
```

3. **Modelo Team:**
```prisma
model Team {
  id            String @id @default(cuid())
  name          String
  description   String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  tournamentId  String
  tournament    Tournament @relation(fields: [tournamentId], references: [id])

  players       Player[]
  homeMatches   Match[] @relation("HomeTeam")
  awayMatches   Match[] @relation("AwayTeam")
}
```

4. **Modelo Player:**
```prisma
model Player {
  id            String @id @default(cuid())
  name          String
  position      String?
  number        Int?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  teamId        String
  team          Team @relation(fields: [teamId], references: [id])
}
```

5. **Modelo Match:**
```prisma
model Match {
  id            String @id @default(cuid())
  matchDate     DateTime
  homeScore     Int?
  awayScore     Int?
  status        MatchStatus @default(SCHEDULED)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  tournamentId  String
  tournament    Tournament @relation(fields: [tournamentId], references: [id])
  
  homeTeamId    String
  homeTeam      Team @relation("HomeTeam", fields: [homeTeamId], references: [id])
  
  awayTeamId    String
  awayTeam      Team @relation("AwayTeam", fields: [awayTeamId], references: [id])
}
```

6. **Enums:**
```prisma
enum TournamentStatus {
  UPCOMING
  ACTIVE
  FINISHED
}

enum MatchStatus {
  SCHEDULED
  LIVE
  FINISHED
  CANCELLED
}
```

#### Paso 7: Validación del esquema
```bash
npx prisma validate
npx prisma generate
```
✅ Esquema validado correctamente

### 🎯 Conceptos Aprendidos:
- Estructura de proyectos NestJS
- Configuración de variables de entorno con ConfigModule
- Sintaxis de Prisma Schema
- Relaciones entre modelos (1:N, N:M)
- Uso de enums en Prisma
- Decoradores de Prisma (@id, @unique, @default, @relation)

---

## 📋 Próximos Pasos - Fase 2: Autenticación y Usuarios

### 🔄 En Progreso
- Crear módulo de usuarios
- Implementar autenticación JWT
- Configurar guards y roles
- Crear DTOs de validación

---

**Fecha de inicio:** $(date)
**Estado actual:** Fase 1 completada ✅
**Rama actual:** `main` → `feature/authentication`

### 🌿 Control de Versiones:
- ✅ Commit: "feat: complete Phase 1 - NestJS setup and Prisma schema"
- ✅ Nueva rama: `feature/authentication` creada