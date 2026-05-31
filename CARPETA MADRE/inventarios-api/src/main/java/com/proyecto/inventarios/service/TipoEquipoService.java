package com.proyecto.inventarios.service;

import com.proyecto.inventarios.model.TipoEquipo;
import com.proyecto.inventarios.repository.TipoEquipoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TipoEquipoService {
    private final TipoEquipoRepository repository;

    public TipoEquipoService(TipoEquipoRepository repository) {
        this.repository = repository;
    }

    public List<TipoEquipo> obtenerTodos() {
        return repository.findAll();
    }

    public TipoEquipo crear(TipoEquipo tipoEquipo) {
        return repository.save(tipoEquipo);
    }
}
