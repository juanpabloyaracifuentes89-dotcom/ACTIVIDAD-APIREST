package com.proyecto.inventarios.service;

import com.proyecto.inventarios.model.Usuario;
import com.proyecto.inventarios.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario crear(Usuario usuario) {
        // 1. Validar que el rol corresponda a uno de los valores permitidos
        String rol = usuario.getRol();
        if (rol == null || (!rol.equals("ADMINISTRADOR") && !rol.equals("DOCENTE"))) {
            throw new IllegalArgumentException("El rol '" + rol + "' no está permitido. Valores válidos: ADMINISTRADOR, DOCENTE");
        }

        // 2. Validar que el email no esté en uso
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email '" + usuario.getEmail() + "' ya está registrado");
        }

        // 3. Encriptar la contraseña usando BCrypt antes de guardar
        String passwordEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordEncriptada);

        return usuarioRepository.save(usuario);
    }
}
