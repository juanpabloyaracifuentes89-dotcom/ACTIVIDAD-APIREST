package com.proyecto.inventarios.service;

import com.proyecto.inventarios.model.EstadoEquipo;
import com.proyecto.inventarios.repository.EstadoEquipoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EstadoEquipoService {
    private final EstadoEquipoRepository repository;

    public EstadoEquipoService(EstadoEquipoRepository repository) {
        this.repository = repository;
    }

    public List<EstadoEquipo> obtenerTodos() {
        return repository.findAll();
    }

    public EstadoEquipo crear(EstadoEquipo estadoEquipo) {
        return repository.save(estadoEquipo);
    }
}
