package agt.inv.repositorio;

import agt.inv.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

// se extiende JpaRepository <Cle, tipo de dato del id de la clase

public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
}
