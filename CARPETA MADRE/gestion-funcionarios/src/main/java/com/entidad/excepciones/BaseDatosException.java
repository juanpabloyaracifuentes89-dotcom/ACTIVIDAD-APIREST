package com.entidad.excepciones;

/**
 * Excepción personalizada para el manejo unificado de errores de base de datos
 */
public class BaseDatosException extends Exception {
    
    public BaseDatosException(String mensaje) {
        super(mensaje);
    }

    public BaseDatosException(String mensaje, Throwable causa) {
        super(mensaje, causa);
    }
}
