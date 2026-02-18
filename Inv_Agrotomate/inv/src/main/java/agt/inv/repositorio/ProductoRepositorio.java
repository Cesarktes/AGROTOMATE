package agt.inv.repositorio;

import agt.inv.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

// se extiende JpaRepository <Cle, tipo de dato del id de la clase>

public interface ProductoRepositorio extends JpaRepository <Producto, Long> {
}
