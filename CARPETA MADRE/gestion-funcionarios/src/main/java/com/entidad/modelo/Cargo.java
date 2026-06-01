package com.entidad.modelo;

public class Cargo {
    private int idCargo;
    private String nombre;
    private double salarioBase;

    public Cargo(int idCargo, String nombre, double salarioBase) {
        this.idCargo = idCargo;
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    public int getIdCargo() {
        return idCargo;
    }

    public String getNombre() {
        return nombre;
    }

    public double getSalarioBase() {
        return salarioBase;
    }

    @Override
    public String toString() {
        return nombre;
    }
}
