# SportsAppCalendar

**SportApp-Calendar** es un sistema de gestión y reservación de espacios deportivos, desarrollado como proyecto universitario para la materia de **Gestión de Proyectos de Software**. Construido con una arquitectura moderna, escalable y orientada a la nube, el sistema permite a administradores gestionar recursos deportivos y a usuarios reservar canchas en tiempo real.

> Diseño elegante, minimalista y oscuro. Funciona en red local — no solo en una PC.

---

## Estado del Proyecto

| Módulo | Estado |
|--------|-------|
| Autenticación (Sign In / Sign Up) | ✅ Completado |
| Conexión con Supabase | ✅ Completado |
| API REST (Hono + Prisma) | ✅ Completado |
| CRUD de Recursos (Backend) | ✅ Completado |
| CRUD de Recursos (Frontend) | ✅ Completado |
| Visualización de Canchas | ✅ Completado |
| Sistema de Reservas | ✅ Completado |
| Notificaciones (Email) | ✅ Completado |
| Panel de Administración | ✅ Completado |
| Bloqueos de Mantenimiento | ✅ Completado |
| Profile (User Edit) | ✅ Completado |
| Pagos / Transferencias | ⏸ No aplica (demo universitario) |

### Avances Recientes

- ✅ CRUD completo de recursos (Create, Read, Update, Delete)
- ✅ Sistema de reservas con detección de conflictos
- ✅ Modal de confirmación en lugar de dialogs nativos del navegador
- ✅ Auto-refresh después de operaciones CRUD
- ✅ Logout desde admin redirige al home
- ✅ Botón de admin solo para usuarios con rol ADMIN/SUPERADMIN
- ✅ Edición de perfil de usuario
- ✅ Panel de mantenimiento (crear/eliminar bloqueos)

---

**Progreso: ~95% Completado**

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
- **Prisma ORM** — ORM type-safe para comunicación con PostgreSQL
- **Nodemailer** — Envío de emails vía SMTP (Gmail)
- **PostgreSQL (Supabase)** — Base de datos relacional en la nube (DBaaS)
- **Supabase Auth** — Motor de autenticación JWT

---

## Servicios Externos

| Servicio | Función | Configuración |
|----------|---------|----------------|
| **PostgreSQL (Supabase)** | Base de datos relacional | `DATABASE_URL` en .env |
| **Supabase Auth** | Autenticación JWT | Keys en .env |
| **Gmail SMTP** | Emails de confirmación | `GMAIL_USER`, `GMAIL_PASS` en .env |

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
- **Membership** — Rol del usuario por cliente (ADMIN, STAFF, CUSTOMER, SUPERADMIN)
- **Resource / ResourceType** — Canchas y tipos de espacios deportivos
- **ResourceSchedule** — Horarios de operación por recurso
- **ResourceBlock** — Bloqueos de mantenimiento
- **Booking** — Reservaciones con precio bloqueado al momento de reservar
- **Payment** — Registro de pagos (schema listo, no implementado en demo)

---

## Roles de Usuario

| Rol | Acceso |
|-----|-------|
| **SUPERADMIN** | Admin completo del sistema |
| **ADMIN** | Panel de administración (gestión de usuarios, recursos, reservas, mantenimiento) |
| **STAFF** | Similar a ADMIN pero sin gestión de usuarios |
| **CUSTOMER** | Reservar canchas, editar su propio perfil |

### Flujo de Usuario (User Flow)

```
1. Abrir app → Ver canchas disponibles (Main)
2. Click en cancha → Seleccionar fecha y horario (ResourceDetail)
3. Si no está logueado → Modal de login/registro
4. Confirmar reserva → Email de confirmación enviado
5. Usuario normal → Click en avatar → Editar perfil
6. Admin → Click en "Admin" → Panel de administración
7. Logout → Redirige al home
```

---

## Estructura del Proyecto

```
SportsAppCalendar/
├── Frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   │   ├── ui/       # Componentes base (Button, Card, Modal, Toast...)
│   │   │   ├── DashboardComponents/  # Partes del admin
│   │   │   └── editables/ # Modals para Create/Edit
│   │   ├── context/      # AuthContext (sesión)
│   │   ├── lib/         # Supabase client
│   │   ├── IUs/        # Páginas principales
│   │   ├── types/       # TypeScript types
│   │   ├── api_url.ts   # API helpers
│   │   ├── App.tsx      # Root component
│   │   └── main.tsx     # Entry point
│   └── .env
├── Backend/               # Bun + Hono + Prisma
│   ├── routes/          # API endpoints
│   │   ├── clients.ts
│   │   ├── users.ts
│   │   ├── resources.ts
│   │   ├── resource-types.ts
│   │   ├── bookings.ts
│   │   ├── payments.ts
│   │   ├── blocks.ts
│   │   └── dashboard.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── db.ts           # Prisma client
│   ├── index.ts       # Entry point
│   └── .env
├── package.json          # Scripts raíz
├── README.md
└── AGENTS.md            # Docs para AI agents
```

---

## Componentes Frontend

### Páginas (`IUs/`)
- `Main.tsx` - Vista principal/público
- `Admin.tsx` - Panel de administración
- `ResourceDetail.tsx` - Detalles de recurso y reservar
- `Pg.tsx` - Playground (testing)

### Autenticación
- `Login.tsx` - Iniciar sesión
- `Register.tsx` - Registrarse
- `AuthConteiner.tsx` - Contenedor de auth

### Dashboard / Admin
- `AdminDashboard.tsx` - Vista principal admin
- `Metric.tsx` - Tarjetas de estadísticas
- `UserAdminTB.tsx` - Fila de usuario en tabla
- `ResourceAdminTB.tsx` - Fila de recurso en tabla
- `BookingAdminTB.tsx` - Fila de reserva en tabla
- `LogAdmin.tsx` - Fila de mantenimiento
- `DateRangePicker.tsx` - Selector de fechas para dashboard

### Editables (Modals)
- `UserCTB.tsx` - Crear usuario
- `UserETB.tsx` - Editar usuario
- `ResourceCTB.tsx` - Crear recurso
- `ResourcsETB.tsx` - Editar recurso
- `ProfileETB.tsx` - Editar perfil de usuario
- `BlockCTB.tsx` - Crear bloqueo de mantenimiento

### Core
- `RSCard.tsx` - Tarjeta de recurso
- `ResourceInventory.tsx` - Inventario de recursos
- `BookingControl.tsx` - Control de reservas
- `UserAdministrator.tsx` - Administración de usuarios
- `MaintenanceLog.tsx` - Bitácora de mantenimiento
- `Menu.tsx` - Navegación principal
- `ThemeToggle.tsx` - Cambio de tema claro/oscuro

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
| `/dashboard/summary` | GET | Métricas generales (users, resources, bookings) |
| `/dashboard/metrics` | GET | Ingresos y reservas por rango de fechas |

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

---

##Demo / Testing

Para probar el sistema, crea un usuario desde la interfaz de registro. Para acceso como ADMIN, un usuario debe tener una membresía con rol ADMIN en la tabla `Membership` de la base de datos.

### Características Demo

- ✅ No hay sistema de pagos (demo universitario)
- ✅ Works en red local (`bun devh`)
- ✅ Confirmaciones por email (configurar GMAIL_USER/GMAIL_PASS en Backend/.env)
- ✅ Diseño responsive (móvil y desktop)
- ✅ Tema claro/oscuro (dark mode por defecto)
