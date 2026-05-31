package com.proyecto.inventarios.service;

import com.proyecto.inventarios.model.Inventario;
import com.proyecto.inventarios.repository.InventarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {
    private final InventarioRepository repository;

    public InventarioService(InventarioRepository repository) {
        this.repository = repository;
    }

    public List<Inventario> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Inventario> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Inventario crear(Inventario inventario) {
        return repository.save(inventario);
    }
}
