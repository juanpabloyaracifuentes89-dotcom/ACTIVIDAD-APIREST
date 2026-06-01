package com.entidad.dao;

import com.entidad.excepciones.BaseDatosException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    // Configuración de la base de datos (por defecto XAMPP o MySQL Workbench usa puerto 3306 y usuario root)
    private static final String URL = "jdbc:mysql://localhost:3306/gestion_funcionarios?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";       // Cambiar si tu usuario es diferente
    private static final String PASSWORD = "";       // Cambiar si tienes contraseña en tu MySQL Local

    private static Connection conexion = null;

    // Patrón Singleton para mantener la conexión
    public static Connection obtenerConexion() throws BaseDatosException {
        try {
            if (conexion == null || conexion.isClosed()) {
                // Registrar el Driver explícitamente (opcional en versiones nuevas, pero buena práctica en tareas)
                Class.forName("com.mysql.cj.jdbc.Driver");
                conexion = DriverManager.getConnection(URL, USER, PASSWORD);
                System.out.println("✅ Conexión establecida a la base de datos.");
            }
        } catch (ClassNotFoundException e) {
            throw new BaseDatosException("Error: No se encontró el Driver de MySQL. Verifica el pom.xml.", e);
        } catch (SQLException e) {
            throw new BaseDatosException("Error conectando a la base de datos. Verifica creenciales o si MySQL está encendido.", e);
        }
        return conexion;
    }

    public static void cerrarConexion() {
        if (conexion != null) {
            try {
                conexion.close();
                conexion = null;
                System.out.println("Cerrando la conexión a la base de datos.");
            } catch (SQLException e) {
                System.err.println("Error al intentar cerrar la conexión.");
            }
        }
    }
}
