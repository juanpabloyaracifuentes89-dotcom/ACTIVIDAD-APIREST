package com.proyecto.inventarios.controller;

import com.proyecto.inventarios.model.EstadoEquipo;
import com.proyecto.inventarios.service.EstadoEquipoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/estados-equipos")
public class EstadoEquipoController {

    private final EstadoEquipoService service;

    public EstadoEquipoController(EstadoEquipoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<EstadoEquipo>> listar() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<EstadoEquipo> crear(@RequestBody EstadoEquipo estadoEquipo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(estadoEquipo));
    }
}
