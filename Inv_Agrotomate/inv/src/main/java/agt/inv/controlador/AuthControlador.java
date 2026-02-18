package agt.inv.controlador;

import agt.inv.modelo.Usuario;
import agt.inv.servicio.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador de autenticación.
 * Se encarga del proceso de LOGIN del sistema.
 */
@RestController // indica que esta clase expone servicios REST
@RequestMapping("/auth") // ruta base para autenticación
@CrossOrigin(origins = "http://localhost:3000") // permite peticiones desde React
public class AuthControlador {

    @Autowired
    private UsuarioServicio usuarioServicio; // se inyecta la capa de servicio

    /**
     * Endpoint para iniciar sesión.
     *
     * @param usuario objeto recibido desde el frontend (correo y contraseña)
     * @return usuario autenticado (sin contraseña)
     */
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {

        // Se llama al servicio para validar credenciales
        return usuarioServicio.login(
                usuario.getCorreo(),      // correo ingresado
                usuario.getContrasena()   // contraseña ingresada
        );
    }
}


