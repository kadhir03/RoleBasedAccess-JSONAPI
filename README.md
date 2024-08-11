# RoleBasedAccess-JSONAPI

## Descripción

Este es un proyecto API en Node.js que implementa control de acceso basado en roles (RBAC) utilizando datos almacenados en archivos JSON de forma local. La API permite gestionar usuarios, roles y tareas con control de acceso en función de los permisos asignados a cada rol.

## Características

- **Control de Acceso Basado en Roles (RBAC):** Los usuarios pueden acceder a rutas y realizar acciones según los permisos definidos por sus roles.
- **Almacenamiento Local:** Los datos se almacenan en archivos JSON en lugar de una base de datos.
- **Autenticación:** Los usuarios deben autenticarse para obtener un token de acceso, que es necesario para interactuar con la API.
- **Rutas CRUD:** Permite crear, leer, actualizar y eliminar usuarios, roles y tareas.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:

   git clone https://github.com/kadhir03/RoleBasedAccess-JSONAPI.git

2. Navega al directorio del proyecto:

   cd RoleBasedAccess-JSONAPI

3. Instala las dependencias:

   npm install

## Uso

Para iniciar la aplicación en modo de desarrollo:

npm run dev

La API estará disponible en http://localhost:3000.

## Rutas disponibles

### Autenticación

- `POST api/auth/login`: Inicia sesión y obtiene un token de acceso.

### Usuarios

- `GET api/users`: Obtiene todos los usuarios.
- `POST api/users`: Crea un nuevo usuario.
- `PATCH api/users/:id`: Actualiza un usuario existente.
- `DELETE api/users/:id`: Elimina un usuario.

### Roles

- `GET api/roles`: Obtiene todos los roles.
- `POST api/roles`: Crea un nuevo rol.
- `PATCH api/roles/:id`: Actualiza un rol existente.
- `DELETE api/roles/:id`: Elimina un rol.

### Tareas

- `GET api/tasks`: Obtiene todas las tareas.
- `POST api/tasks`: Crea una nueva tarea.
- `PATCH api/tasks/:id`: Actualiza una tarea existente.
- `DELETE api/tasks/:id`: Elimina una tarea.

## Autenticación y Autorización

1. **Iniciar sesión:** Usa la ruta de autenticación para obtener un token de acceso.
2. **Autorizar:** Envía el token de acceso en el encabezado `Authorization` para acceder a rutas protegidas.

### Ejemplo de autenticación

POST api/auth/login
{
"username": "admin",
"password": "password"
}

## Contribuciones

Las contribuciones son bienvenidas y apreciadas. Si deseas contribuir, por favor sigue estos pasos:

1. **Fork** este repositorio.
2. Crea una nueva rama con tu característica o corrección de errores (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit con un mensaje claro y descriptivo (`git commit -m 'Agregar nueva característica'`).
4. Haz un push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un **Pull Request** en este repositorio.

Por favor, asegúrate de que tu código sigue las mejores prácticas y que todas las pruebas pasen antes de enviar tu Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Puedes consultar los detalles en el archivo [LICENSE](LICENSE).
