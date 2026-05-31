package com.proyecto.inventarios.repository;

import com.proyecto.inventarios.model.EstadoEquipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoEquipoRepository extends JpaRepository<EstadoEquipo, Long> {
}
