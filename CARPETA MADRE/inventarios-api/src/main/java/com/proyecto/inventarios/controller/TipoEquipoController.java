package com.proyecto.inventarios.controller;

import com.proyecto.inventarios.model.TipoEquipo;
import com.proyecto.inventarios.service.TipoEquipoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tipos-equipos")
public class TipoEquipoController {

    private final TipoEquipoService service;

    public TipoEquipoController(TipoEquipoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TipoEquipo>> listar() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<TipoEquipo> crear(@RequestBody TipoEquipo tipoEquipo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(tipoEquipo));
    }
}
