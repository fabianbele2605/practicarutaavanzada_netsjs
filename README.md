# PracticaRutaAvanzada_NetsJS
practica sobre los aprendido de la ruta NestJS y typeScript Riwi

# Setup Environment - Feature Implementation

## 📋 **Resumen de la Rama `feature/setup-environment`**

Esta rama establece la configuración inicial completa del proyecto, incluyendo la estructura base de NestJS, configuración de Prisma ORM, Docker para PostgreSQL, variables de entorno y todas las herramientas de desarrollo necesarias.

## 🚀 **Configuraciones Implementadas**

### **1. Proyecto NestJS Base**
- **Inicialización**: Proyecto NestJS con TypeScript
- **Estructura**: Arquitectura modular estándar
- **CLI**: Configuración de NestJS CLI
- **Scripts**: Scripts de desarrollo y producción

### **2. Base de Datos y ORM**
- **Prisma ORM**: Configuración completa con PostgreSQL
- **Schema**: Definición inicial del esquema de base de datos
- **Migraciones**: Sistema de migraciones configurado
- **Cliente**: Generación automática del cliente Prisma

### **3. Containerización con Docker**
- **Docker Compose**: Configuración para PostgreSQL
- **Dockerfile**: Imagen del backend (opcional)
- **Networking**: Red interna para comunicación
- **Volúmenes**: Persistencia de datos de PostgreSQL

### **4. Variables de Entorno**
- **Configuración**: Setup de ConfigModule de NestJS
- **Variables**: DATABASE_URL, JWT_SECRET, PORT, NODE_ENV
- **Seguridad**: Archivo .env para configuraciones sensibles
- **Validación**: Carga global de variables de entorno

### **5. Herramientas de Desarrollo**
- **ESLint**: Linting de código TypeScript
- **Prettier**: Formateo automático de código
- **Husky**: Git hooks para calidad de código
- **lint-staged**: Linting en archivos staged

## 🛠️ **Archivos Creados/Configurados**

### **Configuración del Proyecto:**
```
├── backend/
│   ├── src/
│   │   ├── app.controller.ts       ✅ Controller base
│   │   ├── app.service.ts          ✅ Service base
│   │   ├── app.module.ts           ✅ Módulo principal
│   │   └── main.ts                 ✅ Punto de entrada
│   ├── prisma/
│   │   └── schema.prisma           ✅ Esquema de base de datos
│   ├── .env                        ✅ Variables de entorno
│   ├── .env.example               ✅ Plantilla de variables
│   ├── package.json               ✅ Dependencias y scripts
│   ├── tsconfig.json              ✅ Configuración TypeScript
│   ├── nest-cli.json              ✅ Configuración NestJS CLI
│   ├── .eslintrc.js               ✅ Configuración ESLint
│   ├── .prettierrc                ✅ Configuración Prettier
│   └── dockerfile                 ✅ Imagen Docker (opcional)
├── docker-compose.yml             ✅ Servicios Docker
└── .gitignore                     ✅ Archivos ignorados
```

## 🔧 **Dependencias Configuradas**

### **Dependencias Principales:**
```json
{
  "@nestjs/core": "Framework principal",
  "@nestjs/common": "Decoradores y utilidades",
  "@nestjs/config": "Gestión de configuración",
  "prisma": "ORM y CLI",
  "@prisma/client": "Cliente de base de datos",
  "reflect-metadata": "Metadata para decoradores",
  "rxjs": "Programación reactiva"
}
```

### **Dependencias de Desarrollo:**
```json
{
  "@nestjs/cli": "CLI de NestJS",
  "@nestjs/testing": "Utilidades de testing",
  "typescript": "Compilador TypeScript",
  "eslint": "Linter de código",
  "prettier": "Formateador de código",
  "husky": "Git hooks",
  "lint-staged": "Linting en staged files"
}
```

## 🐳 **Configuración Docker**

### **docker-compose.yml:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: tournament_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: tournament_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### **Comandos Docker:**
```bash
# Levantar PostgreSQL
docker-compose up -d postgres

# Ver logs
docker-compose logs postgres

# Detener servicios
docker-compose down
```

## 📊 **Esquema Inicial de Base de Datos**

### **Configuración Prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Modelos base para el sistema de torneos
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

## ⚙️ **Variables de Entorno**

### **Archivo .env:**
```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/tournament_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# App
PORT=3000
NODE_ENV="development"
```

### **ConfigModule Setup:**
```typescript
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
```

## 🧪 **Scripts de Desarrollo**

### **package.json scripts:**
```json
{
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

## 🔍 **Herramientas de Calidad**

### **ESLint Configuration:**
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    '@nestjs',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
};
```

### **Prettier Configuration:**
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80
}
```

## ✅ **Estado de Configuración**

- [x] **Proyecto NestJS**: Inicializado con TypeScript
- [x] **Prisma ORM**: Configurado con PostgreSQL
- [x] **Docker**: PostgreSQL containerizado
- [x] **Variables de entorno**: ConfigModule configurado
- [x] **ESLint**: Linting de código configurado
- [x] **Prettier**: Formateo automático configurado
- [x] **Husky**: Git hooks configurados
- [x] **Scripts**: Comandos de desarrollo listos
- [x] **Estructura**: Arquitectura base establecida

## 🚀 **Comandos de Inicio Rápido**

### **Configuración Inicial:**
```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 3. Levantar base de datos
docker-compose up -d postgres

# 4. Ejecutar migraciones
npx prisma migrate dev

# 5. Generar cliente Prisma
npx prisma generate

# 6. Iniciar servidor de desarrollo
npm run start:dev
```

### **Verificación:**
```bash
# Verificar que el servidor esté corriendo
curl http://localhost:3000

# Verificar base de datos
npx prisma studio
```

## 🔄 **Flujo de Desarrollo Establecido**

### **Estructura de Ramas:**
- `main`: Producción
- `develop`: Integración
- `feature/*`: Nuevas funcionalidades

### **Calidad de Código:**
- Pre-commit hooks con Husky
- Linting automático con ESLint
- Formateo con Prettier
- Tests unitarios con Jest

## 👨💻 **Desarrollado por**
- **Rama**: `feature/setup-environment`
- **Propósito**: Configuración inicial del proyecto
- **Tecnologías**: NestJS + Prisma + Docker + PostgreSQL

---
**Nota**: Esta configuración proporciona la base sólida para el desarrollo de todo el sistema de gestión de torneos.