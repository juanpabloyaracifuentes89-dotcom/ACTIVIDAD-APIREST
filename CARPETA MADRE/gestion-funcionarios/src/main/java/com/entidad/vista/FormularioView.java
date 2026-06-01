package com.entidad.vista;

import com.entidad.dao.FuncionarioDAO;
import com.entidad.excepciones.BaseDatosException;
import com.entidad.modelo.Cargo;
import com.entidad.modelo.Departamento;
import com.entidad.modelo.Funcionario;
import com.entidad.modelo.TipoDocumento;

import javax.swing.*;
import java.awt.*;
import java.sql.Date;
import java.util.List;

public class FormularioView extends JDialog {
    private JTextField txtNombres, txtApellidos, txtDocumento, txtCorreo, txtTelefono, txtDireccion, txtFecha;
    private JComboBox<TipoDocumento> cbxTipoDoc;
    private JComboBox<Departamento> cbxDepartamento;
    private JComboBox<Cargo> cbxCargo;
    private JButton btnGuardar, btnCancelar;

    private Funcionario funcionarioActual;
    private FuncionarioDAO dao;

    public FormularioView(Frame parent, Funcionario funcionario, FuncionarioDAO dao) {
        super(parent, true);
        this.funcionarioActual = funcionario;
        this.dao = dao;

        setTitle(funcionario == null ? "Nuevo Funcionario" : "Editar Funcionario");
        setSize(400, 450);
        setLocationRelativeTo(parent);
        
        iniciarComponentes();
        cargarCombos();
        
        if (funcionario != null) {
            llenarDatosLocales();
        }
    }

    private void iniciarComponentes() {
        setLayout(new BorderLayout());

        JPanel panelCentro = new JPanel(new GridLayout(10, 2, 5, 5));
        panelCentro.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        txtNombres = new JTextField();
        txtApellidos = new JTextField();
        txtDocumento = new JTextField();
        txtCorreo = new JTextField();
        txtTelefono = new JTextField();
        txtDireccion = new JTextField();
        txtFecha = new JTextField("2024-01-01"); // valor por defecto

        cbxTipoDoc = new JComboBox<>();
        cbxDepartamento = new JComboBox<>();
        cbxCargo = new JComboBox<>();

        panelCentro.add(new JLabel("Nombres:")); panelCentro.add(txtNombres);
        panelCentro.add(new JLabel("Apellidos:")); panelCentro.add(txtApellidos);
        panelCentro.add(new JLabel("Tipo Doc:")); panelCentro.add(cbxTipoDoc);
        panelCentro.add(new JLabel("Núm Doc:")); panelCentro.add(txtDocumento);
        panelCentro.add(new JLabel("Fecha Ingreso (yyyy-mm-dd):")); panelCentro.add(txtFecha);
        panelCentro.add(new JLabel("Correo:")); panelCentro.add(txtCorreo);
        panelCentro.add(new JLabel("Teléfono:")); panelCentro.add(txtTelefono);
        panelCentro.add(new JLabel("Dirección:")); panelCentro.add(txtDireccion);
        panelCentro.add(new JLabel("Departamento:")); panelCentro.add(cbxDepartamento);
        panelCentro.add(new JLabel("Cargo:")); panelCentro.add(cbxCargo);

        add(panelCentro, BorderLayout.CENTER);

        JPanel panelBotones = new JPanel();
        btnGuardar = new JButton("Guardar");
        btnCancelar = new JButton("Cancelar");
        panelBotones.add(btnGuardar);
        panelBotones.add(btnCancelar);
        add(panelBotones, BorderLayout.SOUTH);

        btnCancelar.addActionListener(e -> dispose());
        btnGuardar.addActionListener(e -> guardarDatos());
    }

    private void cargarCombos() {
        try {
            List<TipoDocumento> td = dao.listarTiposDocumento();
            td.forEach(cbxTipoDoc::addItem);

            List<Departamento> dp = dao.listarDepartamentos();
            dp.forEach(cbxDepartamento::addItem);

            List<Cargo> cg = dao.listarCargos();
            cg.forEach(cbxCargo::addItem);
        } catch (BaseDatosException e) {
            JOptionPane.showMessageDialog(this, "Error al cargar las listas desplegables: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void llenarDatosLocales() {
        txtNombres.setText(funcionarioActual.getNombres());
        txtApellidos.setText(funcionarioActual.getApellidos());
        txtDocumento.setText(funcionarioActual.getNumeroDocumento());
        txtCorreo.setText(funcionarioActual.getCorreo());
        txtTelefono.setText(funcionarioActual.getTelefono());
        txtDireccion.setText(funcionarioActual.getDireccion());
        if(funcionarioActual.getFechaIngreso() != null){
            txtFecha.setText(funcionarioActual.getFechaIngreso().toString());
        }

        // Seleccionar en ComboBox el item correcto (un workaround simple)
        for(int i=0; i<cbxTipoDoc.getItemCount(); i++) {
            if(cbxTipoDoc.getItemAt(i).getIdTipoDocumento() == funcionarioActual.getIdTipoDocumento()) {
                cbxTipoDoc.setSelectedIndex(i); break;
            }
        }
        for(int i=0; i<cbxDepartamento.getItemCount(); i++) {
            if(cbxDepartamento.getItemAt(i).getIdDepartamento() == funcionarioActual.getIdDepartamento()) {
                cbxDepartamento.setSelectedIndex(i); break;
            }
        }
        for(int i=0; i<cbxCargo.getItemCount(); i++) {
            if(cbxCargo.getItemAt(i).getIdCargo() == funcionarioActual.getIdCargo()) {
                cbxCargo.setSelectedIndex(i); break;
            }
        }
    }

    private void guardarDatos() {
        try {
            // Validaciones básicas que podrían saltar excepciones si vacíos
            if(txtNombres.getText().isEmpty() || txtDocumento.getText().isEmpty()) {
                JOptionPane.showMessageDialog(this, "Nombres y Documento obligatorios");
                return;
            }

            Funcionario f = (funcionarioActual == null) ? new Funcionario() : funcionarioActual;
            f.setNombres(txtNombres.getText());
            f.setApellidos(txtApellidos.getText());
            f.setNumeroDocumento(txtDocumento.getText());
            f.setCorreo(txtCorreo.getText());
            f.setTelefono(txtTelefono.getText());
            f.setDireccion(txtDireccion.getText());
            
            try {
                f.setFechaIngreso(Date.valueOf(txtFecha.getText()));
            } catch(IllegalArgumentException ex) {
                JOptionPane.showMessageDialog(this, "Formato de fecha inválido. use yyyy-mm-dd");
                return;
            }

            TipoDocumento td = (TipoDocumento) cbxTipoDoc.getSelectedItem();
            Departamento dp = (Departamento) cbxDepartamento.getSelectedItem();
            Cargo cp = (Cargo) cbxCargo.getSelectedItem();

            if (td != null) f.setIdTipoDocumento(td.getIdTipoDocumento());
            if (dp != null) f.setIdDepartamento(dp.getIdDepartamento());
            if (cp != null) f.setIdCargo(cp.getIdCargo());
            
            f.setEstado(true);

            if (funcionarioActual == null) {
                dao.registrarFuncionario(f);
                JOptionPane.showMessageDialog(this, "Funcionario Creado Exitosamente.");
            } else {
                dao.actualizarFuncionario(f);
                JOptionPane.showMessageDialog(this, "Funcionario Actualizado Exitosamente.");
            }
            dispose();
        } catch (BaseDatosException ex) {
            JOptionPane.showMessageDialog(this, "Excepción en BD: " + ex.getMessage(), "Excepción Manejada", JOptionPane.ERROR_MESSAGE);
        }
    }
}
