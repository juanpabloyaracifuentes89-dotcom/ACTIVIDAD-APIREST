package com.entidad.vista;

import com.entidad.dao.FuncionarioDAO;
import com.entidad.excepciones.BaseDatosException;
import com.entidad.modelo.Funcionario;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.util.List;

public class PrincipalView extends JFrame {
    private JTable tablaFuncionarios;
    private DefaultTableModel modeloTabla;
    private JButton btnNuevo, btnEditar, btnEliminar, btnActualizar;
    private FuncionarioDAO funcionarioDAO;
    private String rol;

    public PrincipalView() {
        this("ADMINISTRADOR"); // Por defecto, si no se especifica rol, entra como administrador
    }

    public PrincipalView(String rol) {
        this.rol = rol;
        funcionarioDAO = new FuncionarioDAO();
        setTitle("Gestión de Funcionarios - CRUD (" + rol + ")");
        setSize(800, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        iniciarComponentes();
        cargarDatos();
    }

    private void iniciarComponentes() {
        JPanel panelBotones = new JPanel(new FlowLayout());
        btnNuevo = new JButton("Nuevo");
        btnEditar = new JButton("Editar");
        btnEliminar = new JButton("Eliminar");
        btnActualizar = new JButton("Refrescar");

        // Aplicar restricciones basadas en el Rol de Usuario
        if ("DOCENTE".equalsIgnoreCase(rol)) {
            btnNuevo.setEnabled(false);
            btnEditar.setEnabled(false);
            btnEliminar.setEnabled(false);
            btnNuevo.setToolTipText("No tienes permisos para crear registros.");
            btnEditar.setToolTipText("No tienes permisos para editar registros.");
            btnEliminar.setToolTipText("No tienes permisos para eliminar registros.");
        }

        panelBotones.add(btnNuevo);
        panelBotones.add(btnEditar);
        panelBotones.add(btnEliminar);
        panelBotones.add(btnActualizar);

        // Panel inferior contenedor
        JPanel panelInferior = new JPanel(new BorderLayout());

        // Panel separado para el botón de Cerrar Sesión
        JPanel panelLogout = new JPanel(new FlowLayout(FlowLayout.CENTER));
        panelLogout.setBorder(BorderFactory.createEmptyBorder(5, 0, 10, 0)); // Margen arriba y abajo para separarlo

        JButton btnCerrarSesion = new JButton("Cerrar Sesión");
        btnCerrarSesion.setBackground(new Color(220, 53, 69)); // Color rojo elegante
        btnCerrarSesion.setForeground(Color.WHITE);
        btnCerrarSesion.setFocusPainted(false);
        btnCerrarSesion.setFont(btnCerrarSesion.getFont().deriveFont(Font.BOLD)); // Negrita
        panelLogout.add(btnCerrarSesion);

        panelInferior.add(panelBotones, BorderLayout.NORTH);
        panelInferior.add(panelLogout, BorderLayout.SOUTH);

        modeloTabla = new DefaultTableModel(new String[]{"ID", "Documento", "Nombres", "Apellidos", "Correo", "Teléfono"}, 0) {
            @Override
            public boolean isCellEditable(int row, int column) { return false; } // Que no se pueda editar escribiendo en la tabla
        };
        tablaFuncionarios = new JTable(modeloTabla);

        add(new JScrollPane(tablaFuncionarios), BorderLayout.CENTER);
        add(panelInferior, BorderLayout.SOUTH);

        // Evento para Cerrar Sesión
        btnCerrarSesion.addActionListener(e -> {
            this.dispose(); // Cierra esta ventana
            LoginView login = new LoginView();
            login.setVisible(true); // Reabre el Login
        });

        // Eventos de botones
        btnNuevo.addActionListener(e -> {
            FormularioView fv = new FormularioView(this, null, funcionarioDAO);
            fv.setVisible(true);
            cargarDatos();
        });

        btnEditar.addActionListener(e -> {
            int fila = tablaFuncionarios.getSelectedRow();
            if (fila == -1) {
                JOptionPane.showMessageDialog(this, "Seleccione un funcionario para editar.", "Aviso", JOptionPane.WARNING_MESSAGE);
                return;
            }
            int id = (int) modeloTabla.getValueAt(fila, 0);
            try {
                // Buscamos al funcionario en la BD o lo tomamos de la lista
                // Aquí, buscaremos el objeto completo desde listado local (o hacer un getByID en el DAO)
                List<Funcionario> lista = funcionarioDAO.listarFuncionarios();
                Funcionario seleccionado = lista.stream().filter(f -> f.getIdFuncionario() == id).findFirst().orElse(null);
                
                if (seleccionado != null) {
                    FormularioView fv = new FormularioView(this, seleccionado, funcionarioDAO);
                    fv.setVisible(true);
                    cargarDatos();
                }
            } catch (BaseDatosException ex) {
                JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        btnEliminar.addActionListener(e -> {
            int fila = tablaFuncionarios.getSelectedRow();
            if (fila == -1) {
                JOptionPane.showMessageDialog(this, "Seleccione un funcionario para eliminar.", "Aviso", JOptionPane.WARNING_MESSAGE);
                return;
            }
            int confirm = JOptionPane.showConfirmDialog(this, "¿Está seguro de eliminar este registro?", "Confirmar", JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                int id = (int) modeloTabla.getValueAt(fila, 0);
                try {
                    funcionarioDAO.eliminarFuncionario(id);
                    JOptionPane.showMessageDialog(this, "Eliminado exitosamente.");
                    cargarDatos();
                } catch (BaseDatosException ex) {
                    JOptionPane.showMessageDialog(this, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        btnActualizar.addActionListener(e -> cargarDatos());
    }

    private void cargarDatos() {
        modeloTabla.setRowCount(0); // Limpiar
        try {
            List<Funcionario> lista = funcionarioDAO.listarFuncionarios();
            for (Funcionario f : lista) {
                modeloTabla.addRow(new Object[]{
                    f.getIdFuncionario(), 
                    f.getNumeroDocumento(), 
                    f.getNombres(), 
                    f.getApellidos(), 
                    f.getCorreo(), 
                    f.getTelefono()
                });
            }
        } catch (BaseDatosException ex) {
            JOptionPane.showMessageDialog(this, "Error cargando la tabla: " + ex.getMessage(), "Error en BD", JOptionPane.ERROR_MESSAGE);
        }
    }
}
