package agt.inv.repositorio;

import agt.inv.modelo.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntradaRepositorio extends JpaRepository<Entrada, Long> {
}
