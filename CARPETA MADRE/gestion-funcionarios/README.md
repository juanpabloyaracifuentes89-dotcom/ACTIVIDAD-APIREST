# Gestión de Funcionarios - App Java CRUD

Este proyecto es el resultado del desarrollo de la "Actividad 1" para la asignatura de **Software Seguro**. Consiste en una aplicación de escritorio programada en **Java utilizando Swing**, implementando buenas prácticas de seguridad de software, persistencia de datos relacional y separación de responsabilidades.

## 🚀 Características y Requerimientos Cumplidos

*   **Tecnología Java Desktop:** Entorno gráfico utilizando la biblioteca estándar de Java (Java Swing).
*   **Gestión CRUD:** Creación, lectura, actualización y eliminación de los registros en la tabla **Funcionarios**.
*   **Integridad y Modelo Relacional:** Todas las inserciones o modificaciones respetan las relaciones configuradas en Base de Datos para las tablas complementarias (`Tipos de Documento`, `Departamentos`, `Cargos`).
*   **Patrón de Arquitectura DAO (Data Access Object):** Las consultas y transacciones hacia MySQL están aisladas de las ventanas (`Views`). Todo el control se delega a las clases `ConexionDB` y `FuncionarioDAO`.
*   **Control de Excepciones Construido a Medida:** Se utiliza un manejo meticuloso de incidencias en base de datos gracias a la propagación con *try-catch* y el uso de la excepción personalizada `BaseDatosException`.

## ⚙️ Tecnologías Utilizadas
*   Lenguaje: **Java** (JDK 17 recomendado)
*   Motor de Base de Datos: **MySQL**
*   Gestor de dependencias: **Apache Maven**
*   Editor sugerido: **Visual Studio Code** o **NetBeans / Eclipse**

---

## 🛠️ Instrucciones de Ejecución

Siga estos pasos para hacer funcionar el proyecto en su máquina local:

### 1. Base de datos
1. Abra XAMPP (Apache y MySQL encendido) o su entorno habitual como _MySQL Workbench_.
2. Ejecute el código contenido en el archivo **`Script_Funcionarios.sql`**. Esto generará en automático la base de datos `gestion_funcionarios`, las tablas y todos los datos iniciales listos para visualizarse.

### 2. Configuración de credenciales de Conexión
1. Diríjase a la ruta del código: `src/main/java/com/entidad/dao/ConexionDB.java`.
2. Verifique que los valores coincidan con su servidor MySQL local:
```java
private static final String USER = "root";  // Reemplace si tiene otro usuario
private static final String PASSWORD = "";  // Reemplace si tiene clave configurada
```

### 3. Compilación y Arranque
*   Diríjase al archivo principal en `src/main/java/com/entidad/app/Main.java`.
*   Presione _"Ejecutar"_ o _"Run Java"_ desde su IDE.
*   En la ventana de Swing desplegada podrá visualizar toda la información e interactuar con los botones de `Nuevo`, `Editar` y `Eliminar` sin inconvenientes.

---
**Asignatura:** Software Seguro - Bloque 2 | **Semestre 5**
