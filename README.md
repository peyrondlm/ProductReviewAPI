## ProductReviewAPI

API para la gestión de productos, reseñas, comentarios, reviewers y usuarios.  
Este proyecto está pensado para usarse con un servidor casero, por lo que la disponibilidad del servicio puede variar.  
https://oreja-negra.negroides.world/api/

---

## Rutas principales de la API

Estas son las rutas base disponibles en la API:

- **/auth** – Autenticación (login, registro, verificación de token)
- **/reviews** – Reseñas de productos
- **/reviewers** – Información de reviewers
- **/comments** – Comentarios en reseñas o productos
- **/products** – Gestión y consulta de productos
- **/users** – Gestión de usuarios

---

## Instalar las dependencias
Simplemente ejecuta 
```bash
npm install
```

---

## Como correrlo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/peyrondlm/ProductReviewAPI
   cd ProductReviewAPI
   ```

2. Crear archivo .env en la raíz con las siguientes variables
    ```bash
    PORT=
    MONGODB_URI=
    JWT_SECRET=
    SALT_ROUNDS=
    JWT_EXPIRATION=
    TOKEN=
    ```

3. Correrlo con
   ```bash
   npm run dev
   ```

---

## Insertar datos

Este proyecto incluye un script para cargar productos y reviewers desde la carpeta `data/`.

Ejecuta:

```bash
node data/insertData.js
```
