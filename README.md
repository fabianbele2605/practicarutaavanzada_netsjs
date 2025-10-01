# PracticaRutaAvanzada_NetsJS
practica sobre los aprendido de la ruta NestJS y typeScript Riwi

# Authentication Module - Feature Implementation

## 📋 **Resumen de la Rama `feature/authentication`**

Esta rama implementa el sistema completo de **Autenticación y Autorización** para el sistema de gestión de torneos, incluyendo JWT tokens, guards de seguridad, estrategias de autenticación y control de acceso por roles.

## 🚀 **Funcionalidades Implementadas**

### **1. DTOs (Data Transfer Objects)**
- **LoginDto**: Validación para inicio de sesión
  - `email`: Email del usuario (obligatorio)
  - `password`: Contraseña del usuario (obligatorio)

### **2. AuthService - Lógica de Autenticación**

#### **Métodos Implementados:**
- `login()`: Autenticar usuario y generar JWT token
- `register()`: Registrar nuevo usuario en el sistema
- `validateUser()`: Validar credenciales de usuario
- `getProfile()`: Obtener perfil del usuario autenticado

#### **Validaciones de Seguridad:**
- ✅ Verificación de credenciales con bcrypt
- ✅ Generación de tokens JWT seguros
- ✅ Validación de usuarios existentes
- ✅ Manejo de errores de autenticación

### **3. AuthController - Endpoints de Autenticación**

```typescript
POST   /auth/login     → Iniciar sesión (público)
POST   /auth/register  → Registrar usuario (público)
GET    /auth/profile   → Obtener perfil (protegido)
```

### **4. Sistema de Seguridad JWT**

#### **JWT Strategy:**
- Estrategia Passport para validación de tokens
- Extracción de tokens desde headers Authorization
- Validación de payload y usuario activo

#### **Guards Implementados:**
- **JwtAuthGuard**: Protección de endpoints con JWT
- **RolesGuard**: Control de acceso por roles

#### **Decoradores:**
- **@Roles()**: Especificar roles requeridos para endpoints
- Integración con metadata para control de acceso

### **5. AuthModule - Configuración**
- JWT Module configurado con secret y expiración
- Passport Module para estrategias
- Guards y Strategy registrados
- Integración con UsersModule

## 🛠️ **Archivos Creados/Modificados**

### **Nuevos Archivos:**
```
src/auth/
├── dto/
│   └── login.dto.ts            ✅ Nuevo
├── auth.controller.ts          ✅ Nuevo
├── auth.controller.spec.ts     ✅ Nuevo
├── auth.service.ts             ✅ Nuevo
├── auth.service.spec.ts        ✅ Nuevo
├── auth.module.ts              ✅ Nuevo
├── jwt-auth.guard.ts           ✅ Nuevo
├── jwt.strategy.ts             ✅ Nuevo
├── roles.decorator.ts          ✅ Nuevo
└── roles.guard.ts              ✅ Nuevo
```

### **Archivos Modificados:**
```
src/app.module.ts               ✅ Agregado AuthModule
package.json                    ✅ Dependencias JWT y Passport
```

## 🔧 **Dependencias Agregadas**
- `@nestjs/jwt`: Para manejo de tokens JWT
- `@nestjs/passport`: Para estrategias de autenticación
- `passport-jwt`: Estrategia JWT para Passport
- `passport`: Core de Passport para Node.js

## 🔐 **Configuración de Seguridad**

### **JWT Configuration:**
```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
})
```

### **Passport Strategy:**
```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
}
```

## 🧪 **Ejemplos de Uso**

### **Login:**
```json
POST /auth/login
{
  "email": "usuario@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id_123",
    "email": "usuario@example.com",
    "name": "Juan Pérez",
    "role": "USER"
  }
}
```

### **Registro:**
```json
POST /auth/register
{
  "email": "nuevo@example.com",
  "password": "password123",
  "name": "Nuevo Usuario"
}
```

### **Acceso Protegido:**
```
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛡️ **Sistema de Protección**

### **Uso de Guards:**
```typescript
// Proteger endpoint con JWT
@UseGuards(JwtAuthGuard)
@Get('protected')
getProtectedResource() { }

// Proteger con roles específicos
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Delete('admin-only')
adminOnlyEndpoint() { }
```

### **Niveles de Acceso:**
- **Público**: Login, Register
- **Autenticado**: Profile, endpoints básicos
- **Admin**: Endpoints administrativos

## ✅ **Estado del Desarrollo**

- [x] Sistema de login con JWT
- [x] Registro de usuarios
- [x] Guards de autenticación implementados
- [x] Control de acceso por roles
- [x] JWT Strategy configurada
- [x] Decoradores de roles
- [x] Tests unitarios implementados
- [x] Integración con UsersModule
- [x] Manejo de errores de autenticación

## 🚀 **Próximos Pasos Sugeridos**

1. **Refresh Tokens**: Implementar tokens de renovación
2. **Password Reset**: Sistema de recuperación de contraseñas
3. **Email Verification**: Verificación de email al registrarse
4. **Rate Limiting**: Límites de intentos de login
5. **Session Management**: Gestión de sesiones activas

## 👨💻 **Desarrollado por**
- **Rama**: `feature/authentication`
- **Patrón**: NestJS + JWT + Passport + Guards
- **Seguridad**: Autenticación y autorización completa

---
**Nota**: Este módulo proporciona la base de seguridad para todo el sistema de gestión de torneos.