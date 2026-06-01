# Actividad: Autenticación y Autorización

## Información del Estudiante

| Campo | Detalle |
|---|---|
| **Nombre** | Juan Pablo Yara Cifuentes |
| **Grupo** | PREICA2601B020006 |
| **Asignatura** | Software Seguro |

---

## Descripción del Proyecto

Este proyecto toma como base la aplicación CRUD de gestión de funcionarios construida en el curso de **Ingeniería Web 2 (Caso de estudio 3)** y le agrega una capa completa de **autenticación y autorización**.

La solución está compuesta por dos módulos:

1. **`inventarios-api/`** → API REST desarrollada con **Spring Boot** que expone los servicios protegidos con **JWT**.
2. **`gestion-funcionarios/`** → Aplicación de escritorio desarrollada con **Java Swing** que consume la misma base de datos y aplica el control de acceso en la interfaz gráfica.

---

## Estructura del Repositorio

```
CARPETA MADRE/
├── inventarios-api/          → API REST (Spring Boot + JWT)
│   ├── src/
│   │   └── main/java/com/proyecto/inventarios/
│   │       ├── controller/   → AuthController, InventarioController, etc.
│   │       ├── service/      → Lógica de negocio y encriptación BCrypt
│   │       ├── security/     → JwtUtil, JwtFilter, SecurityConfig
│   │       ├── model/        → Entidades JPA
│   │       └── repository/   → Repositorios Spring Data
│   └── src/main/resources/
│       └── application.properties
│
└── gestion-funcionarios/     → Aplicación Escritorio (Java Swing)
    ├── src/main/java/com/entidad/
    │   ├── vista/            → LoginView, PrincipalView
    │   ├── dao/              → UsuarioDAO (autenticación local)
    │   └── app/              → Main (punto de entrada)
    └── pom.xml
```

---

## Requisitos Cumplidos

| # | Requisito | Estado |
|---|-----------|--------|
| 1 | Agregar campo `password` al módulo de usuarios | ✅ |
| 2 | Contraseña guardada **encriptada** con BCrypt | ✅ |
| 3 | Agregar campo `rol` al módulo de usuarios | ✅ |
| 4 | Roles permitidos: `ADMINISTRADOR` y `DOCENTE` | ✅ |
| 5 | Servicio de creación de usuarios acepta `password` y `rol` | ✅ |
| 6 | Servicio de autenticación por email y contraseña | ✅ |
| 7 | Servicios de inventarios, marcas, tipos y estados reciben token en la cabecera | ✅ |
| 8 | `ADMINISTRADOR` tiene acceso total (creación, edición, eliminación) | ✅ |
| 9 | `DOCENTE` solo puede visualizar inventarios | ✅ |

---

## Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| **Java 17** | Lenguaje de programación |
| **Spring Boot** | Framework para la API REST |
| **Spring Security** | Control de acceso en la API |
| **JWT (JSON Web Token)** | Autenticación stateless en la API |
| **BCrypt** | Encriptación de contraseñas |
| **MySQL** | Base de datos |
| **Java Swing** | Interfaz gráfica de escritorio |
| **Maven** | Gestión de dependencias |

---

## Cómo Funciona la Seguridad

### Encriptación de la Contraseña
Cuando se crea un usuario, la contraseña **nunca se guarda en texto plano**. Se transforma con **BCrypt** en un hash irreversible:

```java
String hash = BCrypt.hashpw(plainPassword, BCrypt.gensalt());
usuario.setPassword(hash);
```

### Validación del Usuario (Login)
1. El usuario ingresa su **email + contraseña**.
2. El sistema busca al usuario en la base de datos por email.
3. Compara la contraseña ingresada con el hash guardado usando `BCrypt.checkpw`.
4. Si coincide, extrae el **rol** del usuario y otorga el acceso.

### Control de Acceso por Rol

| Rol | Permisos |
|---|---|
| `ADMINISTRADOR` | Crear, editar, eliminar y visualizar todo |
| `DOCENTE` | Solo visualizar inventarios |

---

## Endpoints de la API

| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| `POST` | `/api/auth/login` | Público | Inicia sesión y devuelve el JWT |
| `POST` | `/api/usuarios` | ADMINISTRADOR | Crea un nuevo usuario |
| `GET` | `/api/inventarios` | ADMIN + DOCENTE | Lista todos los inventarios |
| `POST` | `/api/inventarios` | ADMINISTRADOR | Crea un inventario |
| `GET` | `/api/marcas` | ADMIN + DOCENTE | Lista marcas |
| `POST` | `/api/marcas` | ADMINISTRADOR | Crea una marca |
| `GET` | `/api/tipos-equipo` | ADMIN + DOCENTE | Lista tipos de equipo |
| `GET` | `/api/estados-equipo` | ADMIN + DOCENTE | Lista estados de equipo |

> Todos los endpoints (excepto `/api/auth/login`) requieren el header:  
> `Authorization: Bearer <token>`

---

## Usuarios de Prueba

| Email | Contraseña | Rol |
|---|---|---|
| `admin@empresa.com` | `password123` | ADMINISTRADOR |
| `docente@empresa.com` | `password123` | DOCENTE |

---

## Cómo Ejecutar el Proyecto

### API REST (`inventarios-api`)
```bash
cd inventarios-api
mvn spring-boot:run
```
La API queda disponible en `http://localhost:8085`

### Aplicación de Escritorio (`gestion-funcionarios`)
```bash
cd gestion-funcionarios
mvn exec:java -Dexec.mainClass="com.entidad.app.Main"
```
O ejecutar directamente desde el IDE.

### Base de Datos
1. Crear la base de datos en MySQL.
2. Ejecutar el script `db_schema.sql` (en `inventarios-api`) para crear las tablas.
3. Ejecutar `Script_Funcionarios.sql` (en `gestion-funcionarios`) para crear la tabla `usuarios` del escritorio.

---

## Archivos Clave Modificados

| Archivo | Tipo | Cambio Realizado |
|---|---|---|
| `UsuarioService.java` | Modificado | Encriptación BCrypt al crear usuario |
| `AuthController.java` | Nuevo | Endpoint de login con JWT |
| `JwtUtil.java` | Nuevo | Generación y validación de tokens |
| `JwtFilter.java` | Nuevo | Interceptor de peticiones HTTP |
| `SecurityConfig.java` | Nuevo | Configuración de roles y permisos |
| `LoginView.java` | Nuevo | Pantalla de login en la app Swing |
| `UsuarioDAO.java` | Nuevo | Validación local de usuario con BCrypt |
| `PrincipalView.java` | Modificado | Botones habilitados/deshabilitados según rol |
| `Main.java` | Modificado | Inicia la app desde la pantalla de login |
| `pom.xml` | Modificado | Dependencia `jbcrypt` añadida |
| `db_schema.sql` | Nuevo | Script completo de base de datos con hashes BCrypt |
