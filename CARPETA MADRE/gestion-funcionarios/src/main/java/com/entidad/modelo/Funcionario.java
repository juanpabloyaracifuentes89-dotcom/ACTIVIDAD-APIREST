package com.entidad.modelo;

import java.util.Date;

public class Funcionario {
    private int idFuncionario;
    private String nombres;
    private String apellidos;
    private String numeroDocumento;
    private int idTipoDocumento;
    private String correo;
    private String telefono;
    private String direccion;
    private Date fechaIngreso;
    private int idDepartamento;
    private int idCargo;
    private boolean estado;

    public Funcionario() {}

    public Funcionario(int idFuncionario, String nombres, String apellidos, String numeroDocumento, 
                       int idTipoDocumento, String correo, String telefono, String direccion, 
                       Date fechaIngreso, int idDepartamento, int idCargo, boolean estado) {
        this.idFuncionario = idFuncionario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.numeroDocumento = numeroDocumento;
        this.idTipoDocumento = idTipoDocumento;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaIngreso = fechaIngreso;
        this.idDepartamento = idDepartamento;
        this.idCargo = idCargo;
        this.estado = estado;
    }

    // Getters y Setters
    public int getIdFuncionario() { return idFuncionario; }
    public void setIdFuncionario(int idFuncionario) { this.idFuncionario = idFuncionario; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getNumeroDocumento() { return numeroDocumento; }
    public void setNumeroDocumento(String numeroDocumento) { this.numeroDocumento = numeroDocumento; }

    public int getIdTipoDocumento() { return idTipoDocumento; }
    public void setIdTipoDocumento(int idTipoDocumento) { this.idTipoDocumento = idTipoDocumento; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public Date getFechaIngreso() { return fechaIngreso; }
    public void setFechaIngreso(Date fechaIngreso) { this.fechaIngreso = fechaIngreso; }

    public int getIdDepartamento() { return idDepartamento; }
    public void setIdDepartamento(int idDepartamento) { this.idDepartamento = idDepartamento; }

    public int getIdCargo() { return idCargo; }
    public void setIdCargo(int idCargo) { this.idCargo = idCargo; }

    public boolean isEstado() { return estado; }
    public void setEstado(boolean estado) { this.estado = estado; }
}
