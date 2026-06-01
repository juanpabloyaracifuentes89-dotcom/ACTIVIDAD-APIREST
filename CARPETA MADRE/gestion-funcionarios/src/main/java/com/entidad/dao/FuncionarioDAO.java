package com.entidad.dao;

import com.entidad.excepciones.BaseDatosException;
import com.entidad.modelo.Funcionario;
import com.entidad.modelo.TipoDocumento;
import com.entidad.modelo.Departamento;
import com.entidad.modelo.Cargo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FuncionarioDAO {

    // ============================================
    // 1. LISTAR O LEER (Read)
    // ============================================
    public List<Funcionario> listarFuncionarios() throws BaseDatosException {
        List<Funcionario> lista = new ArrayList<>();
        // Mostramos solo los que tienen estado = TRUE (eliminación lógica)
        String sql = "SELECT * FROM funcionarios WHERE estado = 1";

        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Funcionario f = new Funcionario();
                f.setIdFuncionario(rs.getInt("id_funcionario"));
                f.setNombres(rs.getString("nombres"));
                f.setApellidos(rs.getString("apellidos"));
                f.setNumeroDocumento(rs.getString("numero_documento"));
                f.setIdTipoDocumento(rs.getInt("id_tipo_documento"));
                f.setCorreo(rs.getString("correo"));
                f.setTelefono(rs.getString("telefono"));
                f.setDireccion(rs.getString("direccion"));
                f.setFechaIngreso(rs.getDate("fecha_ingreso"));
                f.setIdDepartamento(rs.getInt("id_departamento"));
                f.setIdCargo(rs.getInt("id_cargo"));
                f.setEstado(rs.getBoolean("estado"));

                lista.add(f);
            }
        } catch (SQLException e) {
            throw new BaseDatosException("Error al listar los funcionarios: " + e.getMessage(), e);
        }
        return lista;
    }

    // ============================================
    // 2. CREAR (Create)
    // ============================================
    public void registrarFuncionario(Funcionario f) throws BaseDatosException {
        String sql = "INSERT INTO funcionarios (nombres, apellidos, numero_documento, id_tipo_documento, correo, telefono, direccion, fecha_ingreso, id_departamento, id_cargo, estado) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, f.getNombres());
            ps.setString(2, f.getApellidos());
            ps.setString(3, f.getNumeroDocumento());
            ps.setInt(4, f.getIdTipoDocumento());
            ps.setString(5, f.getCorreo());
            ps.setString(6, f.getTelefono());
            ps.setString(7, f.getDireccion());
            ps.setDate(8, new java.sql.Date(f.getFechaIngreso().getTime()));
            ps.setInt(9, f.getIdDepartamento());
            ps.setInt(10, f.getIdCargo());
            ps.setBoolean(11, f.isEstado());

            ps.executeUpdate();
        } catch (SQLException e) {
            throw new BaseDatosException("Error al registrar funcionario (¿DNI duplicado?): " + e.getMessage(), e);
        }
    }

    // ============================================
    // 3. EDITAR / ACTUALIZAR (Update)
    // ============================================
    public void actualizarFuncionario(Funcionario f) throws BaseDatosException {
        String sql = "UPDATE funcionarios SET nombres=?, apellidos=?, numero_documento=?, id_tipo_documento=?, correo=?, telefono=?, direccion=?, fecha_ingreso=?, id_departamento=?, id_cargo=? " +
                     "WHERE id_funcionario=?";

        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, f.getNombres());
            ps.setString(2, f.getApellidos());
            ps.setString(3, f.getNumeroDocumento());
            ps.setInt(4, f.getIdTipoDocumento());
            ps.setString(5, f.getCorreo());
            ps.setString(6, f.getTelefono());
            ps.setString(7, f.getDireccion());
            ps.setDate(8, new java.sql.Date(f.getFechaIngreso().getTime()));
            ps.setInt(9, f.getIdDepartamento());
            ps.setInt(10, f.getIdCargo());
            ps.setInt(11, f.getIdFuncionario());

            ps.executeUpdate();
        } catch (SQLException e) {
            throw new BaseDatosException("Error al actualizar la información del funcionario: " + e.getMessage(), e);
        }
    }

    // ============================================
    // 4. ELIMINAR (Delete) - Lógica y Física
    // ============================================
    public void eliminarFuncionario(int id) throws BaseDatosException {
        // En un software real es mejor no hacer un DELETE FROM, sino cambiar a estado inactivo (Eliminado lógico)
        String sql = "UPDATE funcionarios SET estado = 0 WHERE id_funcionario = ?";
        // Si quisieras físico: String sql = "DELETE FROM funcionarios WHERE id_funcionario = ?";

        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new BaseDatosException("Error al eliminar el funcionario en base de datos: " + e.getMessage(), e);
        }
    }

    // ============================================
    // METODOS AUXILIARES: PARA LLENAR LOS COMBO BOX (RELACIONES)
    // ============================================
    public List<TipoDocumento> listarTiposDocumento() throws BaseDatosException {
        List<TipoDocumento> lista = new ArrayList<>();
        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM tipos_documento");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(new TipoDocumento(rs.getInt("id_tipo_documento"), rs.getString("descripcion")));
            }
        } catch (SQLException e) {
            throw new BaseDatosException("Error al listar tipos de documento", e);
        }
        return lista;
    }

    public List<Departamento> listarDepartamentos() throws BaseDatosException {
        List<Departamento> lista = new ArrayList<>();
        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM departamentos");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(new Departamento(rs.getInt("id_departamento"), rs.getString("nombre")));
            }
        } catch (SQLException e) {
            throw new BaseDatosException("Error al listar departamentos", e);
        }
        return lista;
    }

    public List<Cargo> listarCargos() throws BaseDatosException {
        List<Cargo> lista = new ArrayList<>();
        try (Connection con = ConexionDB.obtenerConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM cargos");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                lista.add(new Cargo(rs.getInt("id_cargo"), rs.getString("nombre"), rs.getDouble("salario_base")));
            }
        } catch (SQLException e) {
            throw new BaseDatosException("Error al listar cargos", e);
        }
        return lista;
    }
}
