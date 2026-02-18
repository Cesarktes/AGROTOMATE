package agt.inv.repositorio;

import agt.inv.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    /**
     * Verifica si ya existe un usuario con el correo dado.
     *
     * Se usa principalmente al CREAR usuarios
     * para evitar correos duplicados.
     *
     * Spring genera automáticamente:
     * SELECT COUNT(*) > 0 FROM usuarios WHERE correo = ?
     */
    boolean existsByCorreo(String correo);

    /**
     * Busca un usuario por correo electrónico.
     *
     * Se usa en el proceso de LOGIN.
     * Devuelve Optional para evitar nulls.
     *
     * Spring genera:
     * SELECT * FROM usuarios WHERE correo = ?
     */
    Optional<Usuario> findByCorreo(String correo);
}
