# WebSockets Module

## 📋 **Descripción**
Módulo de WebSockets para comunicación en tiempo real en el sistema de gestión de torneos. Implementa Socket.IO para notificaciones y actualizaciones en vivo.

## ✅ **Funcionalidades Implementadas**

### **Gateway Básico:**
- ✅ **EventsGateway**: Gateway principal para WebSocket connections
- ✅ **Conexión/Desconexión**: Manejo de clientes que se conectan y desconectan
- ✅ **Mensaje básico**: Handler para mensajes de prueba
- ✅ **CORS configurado**: Permite conexiones desde cualquier origen

### **Configuración:**
- ✅ **Socket.IO integrado**: Configuración completa con NestJS
- ✅ **WebsocketsModule**: Módulo NestJS para organización
- ✅ **Logs de conexión**: Registro de conexiones y desconexiones

## 🏗️ **Arquitectura**

### **Archivos Implementados:**
```
src/websockets/
├── events.gateway.ts       # Gateway principal de WebSockets
├── websockets.module.ts    # Módulo NestJS
└── README.md              # Documentación
```

### **EventsGateway:**
```typescript
@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect
```

## 🔧 **Configuración Técnica**

### **Socket.IO Setup:**
- ✅ **CORS habilitado**: Permite conexiones cross-origin
- ✅ **Interfaces implementadas**: OnGatewayConnection, OnGatewayDisconnect
- ✅ **Server instance**: @WebSocketServer para acceso al servidor

### **Handlers Implementados:**
- ✅ `handleConnection()`: Maneja nuevas conexiones
- ✅ `handleDisconnect()`: Maneja desconexiones
- ✅ `@SubscribeMessage('message')`: Handler básico de mensajes

## 📝 **Ejemplos de Uso**

### **Conexión desde Cliente:**
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.emit('message', 'Hello from client');
```

### **Logs del Servidor:**
```
Client connected: socket_id_123
Client disconnected: socket_id_123
```

## 🚀 **Características Técnicas**

### **Dependencias:**
- ✅ `@nestjs/websockets`: Integración NestJS
- ✅ `socket.io`: Biblioteca WebSocket
- ✅ Decoradores: `@WebSocketGateway`, `@SubscribeMessage`

### **Configuración:**
- ✅ **Puerto**: Usa el mismo puerto del servidor HTTP
- ✅ **CORS**: Configurado para desarrollo (`origin: "*"`)
- ✅ **Logging**: Console logs para debugging

## ✅ **Estado del Módulo**

- [x] **Gateway**: EventsGateway implementado
- [x] **Module**: WebsocketsModule configurado
- [x] **Conexiones**: Manejo básico de conexión/desconexión
- [x] **Mensajes**: Handler básico implementado
- [x] **CORS**: Configurado para desarrollo
- [x] **Documentación**: README completo

## 🔄 **Próximos Pasos**

1. **Eventos específicos**: Implementar eventos para torneos y partidos
2. **Autenticación**: Integrar JWT para WebSockets
3. **Rooms**: Crear salas por torneo/partido
4. **Notificaciones**: Sistema de notificaciones en tiempo real
5. **Testing**: Implementar tests para WebSockets

## 📋 **Eventos Planificados**

### **Torneos:**
- `tournament:created`
- `tournament:updated`
- `tournament:started`

### **Partidos:**
- `match:started`
- `match:goal`
- `match:finished`
- `match:updated`

### **Equipos:**
- `team:joined`
- `team:updated`

---

**Módulo desarrollado por**: Fabián Beleño  
**Fecha**: Octubre 2025  
**Estado**: ✅ Básico implementado - En desarrollo