# Aromalife-ADN

## Descripción
Este proyecto es una API RESTful desarrollada con Node.js y TypeScript fuertemente tipado, utilizando MongoDB como base de datos. Implementa un sistema de autenticación y autorización basado en JWT, junto con la gestión de usuarios y varios módulos interrelacionados para un sistema de velas aromáticas personalizadas.

## Características Principales
- **Gestión de Usuarios:** CRUD de usuarios con roles (superadmin, client, manager).
- **Autenticación y Autorización:** Uso de JWT para proteger rutas y middleware para verificación de permisos.
- **Gestión de Productos:**
  - **Fragancias:** Administración de fragancias para velas.
  - **Contenedores:** Administración de contenedores para velas.
  - **Velas Personalizadas:** Creación de velas con combinaciones de contenedores y fragancias.
  - **Regalos:** Gestión de productos adicionales.
- **Carrito de Compras:** Administración de compras con velas personalizadas y regalos opcionales.
- **Pruebas Unitarias e Integración:** Implementadas con Jest y Postman.

## Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o en la nube)
- npm o yarn

### Pasos para ejecutar el proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Nicolas-CM/Aromalife-ADN.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```
3. Configurar las variables de entorno:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3000
   MONGO_URL=mongodb+srv://datos2:datos2@datos2.oukgd.mongodb.net/aromalife?retryWrites=true&w=majority&appName=Aromalife
   JWT_SECRET=UnaVariableCualquieraUnica
   ```
4. Ejecutar el proyecto en desarrollo:
   ```bash
   yarn dev
   ```

## Endpoints Principales

### Autenticación
- `POST /user/login` - Iniciar sesión y obtener un token JWT.

### Usuarios
- `GET /user` - Obtener todos los usuarios (solo superadmin).
- `POST /user` - Crear nuevo usuario (solo superadmin).
- `GET /user/profile` - Obtener perfil del usuario autenticado.
- `GET /user/:id` - Obtener detalles de un usuario (superadmin y manager).
- `PUT /user/:id` - Modificar usuario (solo superadmin).
- `DELETE /user/:id` - Eliminar usuario (solo superadmin).

### Fragancias
- `GET /fragrance` - Obtener todas las fragancias (superadmin, manager, client).
- `POST /fragrance` - Crear nueva fragancia (solo superadmin).
- `GET /fragrance/:id` - Obtener fragancia por ID (superadmin, manager, client).
- `PUT /fragrance/:id` - Actualizar fragancia (solo superadmin).
- `DELETE /fragrance/:id` - Eliminar fragancia (solo superadmin).

### Contenedores
- `GET /container` - Obtener todos los contenedores (superadmin, manager, client).
- `POST /container` - Crear nuevo contenedor (solo superadmin).
- `GET /container/:id` - Obtener contenedor por ID (superadmin, manager, client).
- `PUT /container/:id` - Actualizar contenedor (solo superadmin).
- `DELETE /container/:id` - Eliminar contenedor (solo superadmin).

### Velas Personalizadas
- `GET /candle` - Obtener todas las personalizaciones de velas (superadmin, manager, client).
- `POST /candle` - Crear nueva personalización de vela (solo superadmin).
- `GET /candle/:id` - Obtener personalización por ID (superadmin, manager, client).
- `PUT /candle/:id` - Actualizar personalización (solo superadmin).
- `DELETE /candle/:id` - Eliminar personalización (solo superadmin).

### Regalos
- `GET /gift` - Obtener todos los regalos (superadmin, manager, client).
- `POST /gift` - Crear nuevo regalo (solo superadmin).
- `GET /gift/:id` - Obtener regalo por ID (superadmin, manager, client).
- `PUT /gift/:id` - Actualizar regalo (solo superadmin).
- `DELETE /gift/:id` - Eliminar regalo (solo superadmin).

### Carrito de Compras
- `GET /cart` - Obtener todos los carritos (superadmin, manager, client).
- `POST /cart` - Crear nuevo carrito (superadmin, manager, client).
- `GET /cart/:id` - Obtener carrito por ID (superadmin, manager, client).
- `PUT /cart/:id` - Actualizar carrito (superadmin, manager, client).
- `DELETE /cart/:id` - Eliminar carrito (superadmin, manager, client).

## Pruebas

### Pruebas Unitarias
Ejecutar los tests con:
```bash
npm test --coverage
```
Para visualizar los resultados de test, ingrese al siguiente archivo:
```cmd
coverage/Icov-report/index.html
```

### Pruebas de Integración
Se incluye un archivo de Postman (`Aromalife.postman_collection.json`) con pruebas de los endpoints.

## Despliegue
Este proyecto está desplegado en la plataforma **Vercel** con la url:
```url
https://aromalife-adn.vercel.app/
```

## Consideraciones y Dificultades Encontradas
- Implementación de middleware para permisos en rutas protegidas.
- Validación de relaciones entre entidades (fragancias, contenedores y velas personalizadas).
- Problemas con el despliegue inicial en Vercel.

## Autores
- [Davide Flamini](https://github.com/davidone007)
- [Andrés Cabezas](https://github.com/andrescabezas26)
- [Nicolas Cuellar](https://github.com/Nicolas-CM)