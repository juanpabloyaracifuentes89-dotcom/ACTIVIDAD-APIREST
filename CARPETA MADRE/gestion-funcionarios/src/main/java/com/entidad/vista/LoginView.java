package com.entidad.vista;

import com.entidad.dao.UsuarioDAO;
import com.entidad.excepciones.BaseDatosException;
import com.entidad.modelo.Usuario;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class LoginView extends JFrame {
    private JTextField txtEmail;
    private JPasswordField txtPassword;
    private JButton btnLogin, btnCancelar;
    private UsuarioDAO usuarioDAO;

    public LoginView() {
        usuarioDAO = new UsuarioDAO();
        setTitle("Inicio de Sesión - Gestión de Funcionarios");
        setSize(400, 220);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);

        iniciarComponentes();
    }

    private void iniciarComponentes() {
        JPanel panelPrincipal = new JPanel(new GridBagLayout());
        panelPrincipal.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(8, 8, 8, 8);

        // Fila 0: Título/Email Label
        gbc.gridx = 0;
        gbc.gridy = 0;
        panelPrincipal.add(new JLabel("Correo Electrónico:"), gbc);

        gbc.gridx = 1;
        txtEmail = new JTextField(15);
        panelPrincipal.add(txtEmail, gbc);

        // Fila 1: Password Label
        gbc.gridx = 0;
        gbc.gridy = 1;
        panelPrincipal.add(new JLabel("Contraseña:"), gbc);

        gbc.gridx = 1;
        txtPassword = new JPasswordField(15);
        panelPrincipal.add(txtPassword, gbc);

        // Fila 2: Botones
        JPanel panelBotones = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        btnLogin = new JButton("Ingresar");
        btnCancelar = new JButton("Cancelar");
        panelBotones.add(btnLogin);
        panelBotones.add(btnCancelar);

        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 2;
        panelPrincipal.add(panelBotones, gbc);

        add(panelPrincipal);

        // Acciones
        btnLogin.addActionListener(this::ejecutarLogin);
        btnCancelar.addActionListener(e -> System.exit(0));

        // Permitir entrar presionando Enter
        txtPassword.addActionListener(this::ejecutarLogin);
    }

    private void ejecutarLogin(ActionEvent e) {
        String email = txtEmail.getText().trim();
        String password = new String(txtPassword.getPassword());

        if (email.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Por favor complete todos los campos.", "Campos vacíos", JOptionPane.WARNING_MESSAGE);
            return;
        }

        try {
            Usuario usuario = usuarioDAO.autenticar(email, password);
            if (usuario != null) {
                JOptionPane.showMessageDialog(this, "¡Bienvenido " + usuario.getNombre() + "!\nRol: " + usuario.getRol(), "Acceso Permitido", JOptionPane.INFORMATION_MESSAGE);
                
                // Abrir la vista principal pasando el rol del usuario para autorizar
                PrincipalView vistaPrincipal = new PrincipalView(usuario.getRol());
                vistaPrincipal.setVisible(true);
                
                this.dispose(); // Cerrar el login
            } else {
                JOptionPane.showMessageDialog(this, "El correo electrónico o la contraseña son incorrectos.", "Error de Acceso", JOptionPane.ERROR_MESSAGE);
            }
        } catch (BaseDatosException ex) {
            JOptionPane.showMessageDialog(this, "Error de conexión: " + ex.getMessage(), "Error en BD", JOptionPane.ERROR_MESSAGE);
        }
    }
}
