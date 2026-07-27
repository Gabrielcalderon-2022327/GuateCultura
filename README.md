# GuateCultura

**GuateCultura** es una plataforma cultural que impulsa el arte y la cultura guatemalteca. Permite a creadores compartir su música, literatura y cine, mientras los usuarios pueden seguirlos, comentar, dar likes, guardar favoritos, crear playlists y apoyar económicamente a través de tips.

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Modelo de Datos](#-modelo-de-datos)
- [Validaciones](#-validaciones)
- [Manejo de Errores](#-manejo-de-errores)
- [Ejemplos de Uso](#-ejemplos-de-uso)

## Características

- Gestión de usuarios con roles: `USER`, `CREATOR`, `ADMIN`
- Perfiles de creadores con biografía e imagen
- Producciones categorizadas: música, literatura y cine
- Archivos multimedia asociados: video, imagen, PDF, audio
- Sistema de seguidores
- Playlists personales de producciones
- Posts con contenido multimedia
- Likes en producciones y posts
- Comentarios en producciones y posts
- Sistema de favoritos
- Pagos y tips a creadores
- Validaciones robustas por entidad
- Manejo centralizado de errores

## Tecnologías


| **Tecnología**   | Uso                                  |
| ----------------- | ------------------------------------ |
| **TypeScript**    | Lenguaje principal                   |
| **Node.js**       | Runtime                              |
| **MySQL**         | Base de datos                        |
| **mysql2**        | Driver MySQL con soporte de Promises |
| **dotenv**        | Variables de entorno                 |
| **http (nativo)** | Servidor HTTP sin frameworks         |
| **pnpm**          | Gestor de paquetes                   |

## Arquitectura

El proyecto sigue una arquitectura en capas:

```
Cliente HTTP
Server (http nativo)
Router principal → Routes por entidad
Services (lógica de negocio)
Validators (validaciones)
Base de datos (MySQL)
```

**Capas:**

- **Models**: Interfaces TypeScript que representan las entidades
- **Enums**: Valores fijos (roles, categorías, tipos)
- **Services**: Lógica de acceso y manipulación de datos con MySQL
- **Validators**: Reglas de validación por entidad
- **Routes**: Endpoints HTTP agrupados por entidad
- **Exceptions**: Clases de error personalizadas
- **Utils**: Helpers reutilizables

## Estructura del Proyecto

```
guatecultura-ts/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── (1 route por cada entidad con endpoints)
│   │   ├── router.ts
│   │   └── server.ts
│   ├── config/
│   │   └── db.ts
│   ├── exceptions/
│   │   ├── notFoundException.ts
│   │   └── validationException.ts
│   ├── models/
│   │   ├── enums/
│   │   │   ├── FileType.ts
│   │   │   ├── MediaType.ts
│   │   │   ├── PaymentStatus.ts
│   │   │   ├── ProductionCategory.ts
│   │   │   ├── ProductionVisibility.ts
│   │   │   └── UserRole.ts
│   │   ├── (17 entidades)
│   ├── services/
│   │   └── (17 services)
│   ├── validators/
│   │   ├── validators.ts
│   │   └── (17 validators)
│   └── utils/
│       ├── sendJson.ts
│       ├── readBody.ts
│       ├── matchRegex.ts
│       └── sqlErrorHandler.ts
├── .env
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── scriptDB_GuateCultura.sql
```

## Instalación

### Requisitos previos

- Node.js (v18 o superior)
- pnpm
- MySQL (v8 o superior)

### Pasos

1. **Clonar el repositorio**

```bash
git clone <url-del-repo>
cd guatecultura-ts
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Crear la base de datos**

Ejecuta el script `scriptDB_GuateCultura.sql` en tu servidor MySQL o cualquier cliente que soporte MySQL

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=GuateCultura_in5cm
```

## Ejecución

### Modo desarrollo

```bash
pnpm dev
```

El servidor se ejecuta en:

```
http://localhost:3000
```

Verás en consola:

```
--------------------------------
SERVER INCIADO
PUERTO: 3000
URL: http://localhost:3000
--------------------------------
```

## Endpoints de la API

Todas las rutas siguen el patrón REST:


| Método  | Ruta                 | Descripción |
| -------- | -------------------- | ------------ |
| `GET`    | `/api/{entidad}`     | Listar todos |
| `GET`    | `/api/{entidad}/:id` | Obtener uno  |
| `POST`   | `/api/{entidad}`     | Crear        |
| `PUT`    | `/api/{entidad}/:id` | Editar       |
| `DELETE` | `/api/{entidad}/:id` | Eliminar     |

### Entidades disponibles


| Entidad             | Endpoint                   |
| ------------------- | -------------------------- |
| Users               | `/api/users`               |
| Creators            | `/api/creators`            |
| Productions         | `/api/productions`         |
| ProductionFiles     | `/api/productionFiles`     |
| Followers           | `/api/followers`           |
| Playlists           | `/api/playlists`           |
| PlaylistItems       | `/api/playlistItems`       |
| Posts               | `/api/posts`               |
| PostMedia           | `/api/postMedia`           |
| ProductionLikes     | `/api/productionLikes`     |
| PostLikes           | `/api/postLikes`           |
| ProductionComments  | `/api/productionComments`  |
| PostComments        | `/api/postComments`        |
| ProductionFavorites | `/api/productionFavorites` |
| PostFavorites       | `/api/postFavorites`       |
| Payments            | `/api/payments`            |
| Tips                | `/api/tips`                |

## Modelo de Datos

### Enums

- **UserRole**: `USER`, `CREATOR`, `ADMIN`
- **ProductionCategory**: `MUSIC`, `LITERATURE`, `CINEMA`
- **ProductionVisibility**: `PUBLIC`, `PRIVATE`, `DRAFT`
- **FileType** / **MediaType**: `VIDEO`, `IMAGE`, `PDF`, `AUDIO`
- **PaymentStatus**: `SUCCESS`, `PENDING`, `FAILED`

### Relaciones principales

```
User (1) ──── (1) Creator
Creator (1) ──── (N) Production
Production (1) ──── (N) ProductionFile
Creator (1) ──── (N) Post
Post (1) ──── (N) PostMedia
User (N) ──── (N) Creator (Followers)
User (1) ──── (N) Playlist
Playlist (N) ──── (N) Production (PlaylistItems)
User (N) ──── (N) Production (Likes / Favorites)
User (N) ──── (N) Post (Likes / Favorites / Comments)
Payment (1) ──── (1) Tip ──── (1) Creator
```

## Validaciones

Cada entidad tiene su propio validator con reglas específicas:

### Validaciones comunes

- **Campos requeridos**: valida que no estén vacíos, null o undefined
- **Longitud máxima**: respeta los límites de `varchar` de MySQL
- **Enums**: valida que el valor pertenezca al enum correspondiente
- **FK existente**: valida que los IDs referenciados existan
- **Unicidad**: para campos únicos simples (email, username)

### Validaciones específicas destacadas

- **Users**: formato de email, longitud mínima de password (8 caracteres), unicidad de email y username
- **Creators**: solo usuarios con rol `CREATOR` o `ADMIN`
- **Followers**: un usuario no puede seguirse a sí mismo
- **PlaylistItems**: no se pueden agregar producciones en estado `DRAFT`
- **Payments**: `amount` mayor a 0
- **Tips**: el `amount` debe coincidir con el del pago, y el pago debe estar en estado `SUCCESS`

### Uniques compuestas (manejadas por MySQL)

Estas se capturan mediante `ER_DUP_ENTRY`:

- `Followers`: no duplicar usuario+creator
- `PlaylistItems`: no duplicar playlist+producción
- `ProductionLikes` / `PostLikes`: no duplicar like
- `ProductionFavorites` / `PostFavorites`: no duplicar favorito

## Manejo de Errores

El sistema tiene un `handleException` centralizado que responde con códigos HTTP apropiados:


| Excepción / Error     | Código HTTP                | Descripción          |
| ---------------------- | --------------------------- | --------------------- |
| `ValidationException`  | `400 Bad Request`           | Error de validación  |
| `SyntaxError`          | `400 Bad Request`           | JSON malformado       |
| `NotFoundException`    | `404 Not Found`             | Recurso no encontrado |
| `ER_DUP_ENTRY` (MySQL) | `409 Conflict`              | Duplicado en unique   |
| Método no permitido   | `405 Method Not Allowed`    | HTTP method inválido |
| Error no controlado    | `500 Internal Server Error` | Fallo interno         |

### Formato de respuesta de error

```json
{
    "error": "Descripción del error"
}
```

## Notas adicionales

- Los campos `created_at` y `updated_at` se manejan automáticamente por MySQL
- Los IDs son auto-incrementales
- El campo `password` se almacena en texto plano (para producción se recomienda hashear con bcrypt)
- La conexión a MySQL usa un **pool de conexiones** para mejor rendimiento

## Autor

Proyecto desarrollado por Gabriel Alexander Calderon Monzon 5TO Perito Informatica.
