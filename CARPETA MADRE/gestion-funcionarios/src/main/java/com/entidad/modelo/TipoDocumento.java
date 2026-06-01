package com.entidad.modelo;

public class TipoDocumento {
    private int idTipoDocumento;
    private String descripcion;

    public TipoDocumento(int idTipoDocumento, String descripcion) {
        this.idTipoDocumento = idTipoDocumento;
        this.descripcion = descripcion;
    }

    public int getIdTipoDocumento() {
        return idTipoDocumento;
    }

    public String getDescripcion() {
        return descripcion;
    }

    // Para que los JComboBox muestren correctamente el nombre en Swing
    @Override
    public String toString() {
        return descripcion;
    }
}
