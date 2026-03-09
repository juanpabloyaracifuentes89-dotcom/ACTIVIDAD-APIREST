# 🎬 API REST - Gestión de Películas

Proyecto desarrollado como una **API REST** para la gestión de películas, géneros, directores, productoras y tipos de contenido.
Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los recursos almacenados en una base de datos.

---

# 📌 Tecnologías utilizadas

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* cors
* Postman (para pruebas de la API)

---

# 📂 Estructura del proyecto

backend
│
├── controllers
│ ├── generocontrollers.js
│ ├── tipocontrollers.js
│ ├── productoracontrollers.js
│ ├── directorcontrollers.js
│ └── mediacontrollers.js
│
├── db
│ └── db-connection-mongo.js
│
├── models
│ ├── Genero.js
│ ├── Tipo.js
│ ├── Productora.js
│ ├── Director.js
│ └── Media.js
│
├── routes
│ ├── genero.js
│ ├── tipo.js
│ ├── productora.js
│ ├── director.js
│ └── media.js
│
├── .env
├── .env.template
├── index.js
└── package.json

---

# ⚙️ Instalación del proyecto

1. Clonar el repositorio

git clone https://github.com/juanpabloyaracifuentes89-dotcom/ACTIVIDAD-APIREST/tree/main

2. Entrar a la carpeta del proyecto

cd backend

3. Instalar dependencias

npm install

4. Crear archivo .env basado en el template

PORT=4000
MONGO_URI=mongodb+srv://USUARIO:PASSWORD@HOST/NOMBRE_DB

5. Ejecutar el servidor

npm run dev

El servidor se ejecutará en:

http://localhost:4000

---

# 📡 Endpoints de la API

## Géneros

GET
/api/generos
Obtiene todos los géneros.

POST
/api/generos
Crea un nuevo género.

---

## Tipos

GET
/api/tipos

POST
/api/tipos

---

## Productoras

GET
/api/productoras

POST
/api/productoras

---

## Directores

GET
/api/directores

POST
/api/directores

---

## Medias

GET
/api/medias

POST
/api/medias

PUT
/api/medias/:id

DELETE
/api/medias/:id

---

# 🧪 Pruebas de la API

Las pruebas de los endpoints se realizaron utilizando:

Postman

---

# 👨‍💻 Autor

Juan Pablo Yara Cifuentes
PREICA2601B010006
---

