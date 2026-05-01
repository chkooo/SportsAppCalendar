# SportsAppCalendar

**SportApp-Calendar** es un sistema de gestión y reservación de espacios deportivos, desarrollado como proyecto universitario para la materia de **Gestión de Proyectos de Software**. Construido con una arquitectura moderna, escalable y orientada a la nube, el sistema permite a administradores gestionar recursos deportivos y a usuarios reservar canchas en tiempo real.

> Diseño elegante, minimalista y oscuro. Funciona en red local — no solo en una PC.

---

## Estado del Proyecto

| Módulo                            | Estado           |
| --------------------------------- | ---------------- |
| Autenticación (Sign In / Sign Up) | ✅ Funcionando   |
| Conexión con Supabase             | ✅ Funcionando   |
| API REST (Hono + Prisma)          | ✅ 95% completo |
| CRUD de Recursos (Backend)        | ✅ Completado    |
| CRUD de Recursos (Frontend)       | 🔄 ~60% completo |
| Visualización de Canchas          | ✅ Funcionando   |
| Sistema de Reservas               | ✅ Completado    |
| Notificaciones (Email)            | ✅ Funcionando   |
| Panel de Administración           | 🔄 En progreso   |
| Pagos / Transferencias            | 🔄 Modelo listo |

---

## Tecnologías Utilizadas

### Frontend

- **React 19** (Vite) — Biblioteca principal para la UI
- **TypeScript** — Desarrollo seguro y tipado
- **Tailwind CSS v4** — Estilizado moderno (via `@tailwindcss/vite`, sin `tailwind.config.js`)
- **React Router** — Navegación y rutas protegidas
- **Supabase JS** — Cliente de autenticación en el frontend
- **Bun** — Runtime ultrarrápido para gestión de paquetes

### Backend

- **Bun + Hono** — Framework minimalista de alto rendimiento para la API REST
- **Prisma ORM** — Abstracción de base de datos type-safe con TypeScript
- **PostgreSQL (Supabase)** — Base de datos relacional en la nube (DBaaS)
- **Supabase Auth** — Motor de autenticación con triggers automáticos

---

## Arquitectura

```
Frontend (React + Vite)
        ↓
Supabase Auth  →  Trigger automático  →  public.User
        ↓
Backend API (Hono)
        ↓
Prisma ORM
        ↓
PostgreSQL (Supabase Cloud)
```

### Modelo de Datos Principal

- **Client** — Empresa/organización que usa el sistema
- **User** — Usuarios vinculados a Supabase Auth
- **Membership** — Rol del usuario por cliente (ADMIN, STAFF, CUSTOMER)
- **Resource / ResourceType** — Canchas y tipos de espacios deportivos
- **ResourceSchedule** — Horarios de operación por recurso
- **Booking** — Reservaciones con precio bloqueado al momento de reservar
- **Payment** — Registro de pagos por reservación

---

## Estructura del Proyecto

```
SportsAppCalendar/
├── Frontend/         # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       ├── context/  # AuthContext (persistencia de sesión)
│       ├── lib/      # Cliente de Supabase
│       └── routes/
├── Backend/          # Bun + Hono + Prisma
│   ├── routes/      # clients, users, resources, bookings, payments, blocks
│   ├── prisma/
│   │   └── schema.prisma
│   └── index.ts
├── package.json      # Scripts raíz
└── README.md
```

---

## Componentes Frontend

### Páginas (`IUs/`)
- `Main.tsx` - Vista principal/público
- `Admin.tsx` - Panel de administración
- `Pg.tsx` - Página de reservas de usuario
- `ResourceDetail.tsx` - Detalles de recurso

### Autenticación
- `Login.tsx` - Iniciar sesión
- `Register.tsx` - Registrarse
- `AuthConteiner.tsx` - Contenedor de auth

### Dashboard
- `AdminDashboard.tsx` - Vista principal admin
- `Metric.tsx` - Tarjetas de estadísticas
- `UserAdminTB.tsx` - Tabla de usuarios
- `ResourceAdminTB.tsx` - Tabla de recursos
- `BookingAdminTB.tsx` - Tabla de reservas
- `LogAdmin.tsx` - bitácora de actividad

### Editables
- `UserETB.tsx` - Editar usuario
- `ResourcsETB.tsx` - Editar recurso

### Core
- `RSCard.tsx` - Tarjeta de recurso
- `ResourceInventory.tsx` - Inventario de recursos
- `BookingControl.tsx` - Control de reservas
- `UserAdministrator.tsx` - Administración de usuarios
- `MaintenanceLog.tsx` - bitácora de mantenimiento
- `Menu.tsx` - Navegación

---

## Instalación y Uso

### Requisitos Previos

- [Bun](https://bun.sh/) v1.0 o superior
- Cuenta en [Supabase](https://supabase.com/) con proyecto configurado

### 1. Clonar el repositorio

```bash
git clone https://github.com/chkooo/SportsAppCalendar.git
cd SportsAppCalendar
```

### 2. Instalar dependencias

```bash
bun install
```
> Las dos carpetas (Frontend y Backend) se instalan automáticamente via concurrently

### 3. Configurar variables de entorno

En `Frontend/.env`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
```

En `Backend/.env`:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:6543/postgres
```

### 4. Sincronizar base de datos

```bash
cd Backend
bunx prisma db push
```

### 5. Correr el proyecto

```bash
# Solo en tu máquina
bun dev

# En red local (accesible desde otros dispositivos)
bun devh
```

---

## Endpoints API

| Route | Métodos | Descripción |
|-------|--------|-------------|
| `/clients` | GET, POST | CRUD clientes |
| `/users` | GET, POST, PUT, PATCH, DELETE | CRUD usuarios + toggle active |
| `/resources` | GET, POST, PUT, DELETE | CRUD recursos |
| `/resources/blocks` | GET | Lista bloqueos mantenimiento |
| `/bookings` | GET, POST, PUT, DELETE | Reservas + conflict detection + email |
| `/payments` | GET, POST, PUT, DELETE | CRUD pagos |
| `/blocks` | GET, POST, DELETE | Bloqueos mantenimiento |

---

## Scripts Disponibles

| Comando    | Descripción                                 |
| ---------- | ------------------------------------------- |
| `bun dev`  | Corre frontend y backend en modo desarrollo |
| `bun devh` | Corre en modo red local (`--host`) |

### Puertos

| Servicio | Puerto |
|----------|--------|
| Frontend (Vite) | 5173 |
| Backend (Hono) | 3000 |
