# SportsAppCalendar

**SportApp-Calendar** es un sistema integral de gestión y reservación de espacios deportivos. Diseñado con una arquitectura moderna y escalable, permite a los administradores gestionar recursos (canchas) y a los usuarios consultar disponibilidad en tiempo real.

Este proyecto forma parte de la materia de **Gestión de Proyectos de Software**, enfocado en la modularidad y la experiencia de usuario (UX).

## Tecnologías Utilizadas

### Frontend

- **React 18** (Vite) - Biblioteca principal para la UI.
- **TypeScript** - Para un desarrollo seguro y tipado.
- **Tailwind CSS v4** - Estilizado moderno y eficiente.
- **Bun** - Runtime de JavaScript ultra rápido para gestión de paquetes y ejecución.

### Backend (Cloud-Native Architecture)
- **Bun + Hono**: Framework de backend minimalista y de alto rendimiento, optimizado para entornos de baja latencia y alta concurrencia.
- **Prisma ORM**: Capa de abstracción de base de datos que permite un manejo de datos seguro y sincronizado con TypeScript (Type-Safe).
- **PostgreSQL (Supabase)**: Base de datos relacional de nivel empresarial alojada en la nube (DBaaS), asegurando persistencia, seguridad y alta disponibilidad.

---
## Estructura del Proyecto

* `/frontend`: Interfaz de usuario, componentes de administración y vistas de cliente desarrolladas en React.
* `/backend`: API REST, esquemas de Prisma, lógica de negocio y controladores de Hono.

---

### Requisitos Previos
Es indispensable contar con [Bun](https://bun.sh/) instalado en su versión 1.0 o superior.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/chkooo/SportsAppCalendar.git](https://github.com/chkooo/SportsAppCalendar.git)
cd SportsAppCalendar
