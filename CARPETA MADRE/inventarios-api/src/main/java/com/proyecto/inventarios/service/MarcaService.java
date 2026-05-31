package com.proyecto.inventarios.service;

import com.proyecto.inventarios.model.Marca;
import com.proyecto.inventarios.repository.MarcaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MarcaService {
    private final MarcaRepository repository;

    public MarcaService(MarcaRepository repository) {
        this.repository = repository;
    }

    public List<Marca> obtenerTodas() {
        return repository.findAll();
    }

    public Marca crear(Marca marca) {
        return repository.save(marca);
    }
}
