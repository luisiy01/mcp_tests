# REST API para Pruebas (api-rest)

Esta es una API RESTful desarrollada en Node.js utilizando Express y MongoDB (Mongoose). El propósito principal del proyecto es servir como un entorno de pruebas para MCP.

## Características

- Operaciones CRUD completas para la gestión de Proyectos.
- Subida de archivos (imágenes) utilizando Multer.
- Conexión a base de datos MongoDB (Atlas).
- Arquitectura basada en el patrón Modelo-Vista-Controlador (MVC).

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el servidor.
- **Express.js**: Framework ágil para construir la API.
- **MongoDB** & **Mongoose**: Base de datos NoSQL y ODM.
- **Multer**: Middleware para la gestión de subida de archivos (imágenes).
- **CORS**: Middleware para habilitar el intercambio de recursos de origen cruzado.
- **Validator**: Biblioteca para validación de datos.

## Estructura del Proyecto

```text
mcp_tests/
├── controllers/
│   └── project.js       # Lógica de negocio y controladores de la API
├── database/
│   └── connection.js    # Configuración de conexión con MongoDB
├── models/
│   └── project.js       # Esquema de Mongoose para la entidad Proyecto
├── routes/
│   └── project.js       # Definición de endpoints de la API
├── uploads/             # Directorio para almacenar las imágenes subidas
├── index.js             # Punto de entrada de la aplicación
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación del proyecto
```

## Endpoints de la API

La ruta base para todos los endpoints es: `/api/project`

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/save` | Crea un nuevo proyecto |
| `GET` | `/list` | Obtiene la lista de todos los proyectos |
| `GET` | `/item/:id` | Obtiene un proyecto específico por su ID |
| `PUT` | `/update/:id` | Actualiza un proyecto existente por su ID |
| `DELETE` | `/delete/:id` | Elimina un proyecto específico por su ID |
| `PUT` | `/upload/:id` | Sube una imagen para un proyecto específico |
| `GET` | `/image/:file` | Recupera un archivo de imagen subido |

Además, hay una ruta de prueba independiente en el archivo `index.js`:
- `GET /pruebitas` - Retorna un `<section>` HTML indicando que la ruta está funcionando.

### Modelo de Datos (Proyecto)

El esquema de la base de datos para cada proyecto contiene las siguientes propiedades:

- `name`: `String` (Requerido)
- `description`: `String` (Requerido)
- `state`: `String` (Requerido)
- `image`: `String` (Por defecto: 'default.png')
- `created_at`: `Date` (Por defecto: Fecha real del momento de creación)

## Instalación y Ejecución

1. Clona el repositorio o asegúrate de tener todo el código fuente.
2. Abre una terminal dentro de la raíz del proyecto.
3. Instala las dependencias escribiendo:
   ```bash
   npm install
   ```
4. Ejecuta el servidor en modo desarrollo utilizando nodemon:
   ```bash
   npm run start
   ```
5. El servidor se iniciará y estará escuchando peticiones en `http://localhost:3000`.

## Autor

- Luis Nuñez
