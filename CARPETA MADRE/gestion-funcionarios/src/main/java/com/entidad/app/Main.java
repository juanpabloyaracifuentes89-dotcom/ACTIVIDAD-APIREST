package com.entidad.app;

import com.entidad.vista.LoginView;

import javax.swing.SwingUtilities;

public class Main {
    public static void main(String[] args) {
        // Ejecución en el hilo recomendado por Java Swing (EDT)
        SwingUtilities.invokeLater(() -> {
            LoginView vista = new LoginView();
            vista.setVisible(true);
        });
    }
}
