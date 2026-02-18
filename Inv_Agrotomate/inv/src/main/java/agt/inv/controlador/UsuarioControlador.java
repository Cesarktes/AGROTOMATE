package agt.inv.controlador;

import agt.inv.excepcion.RecursoNoEncontradoExcepcion;
import agt.inv.modelo.Usuario;
import agt.inv.servicio.IUsuarioServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/agt-app/
@RequestMapping("agt-app")
//para realizar las peticiones a react puerto 3000
@CrossOrigin(value = "http://localhost:3000")


public class UsuarioControlador {

    // Logger para mostrar información en consola (útil para depuración)
    private static final Logger logger =
            LoggerFactory.getLogger(UsuarioControlador.class);

    // Inyección de la capa de servicio
    @Autowired
    private IUsuarioServicio usuarioServicio;

    /**
     * Obtener todos los usuarios
     * URL: http://localhost:8080/agt-app/usuarios
     * Método: GET
     */

    @GetMapping("/usuarios")

    //traer el metodo de listarUsuarios de servicios
    public List<Usuario> obtenerUsuarios(){
        var usuarios  = usuarioServicio.listarUsuarios();
        // Muestra los usuarios en consola (debug)
        usuarios.forEach((usuario -> logger.info(usuario.toString())));
        return usuarios;
    }

    // metodo guardar Crear un nuevo usuario
    @PostMapping("/usuarios")
    public Usuario agregarUsuario(@RequestBody Usuario usuario){
        logger.info("Usuario a agregar: " + usuario);
        return usuarioServicio.guardarUsuario(usuario);
    }

    //metodo para buscar por id
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario>
    obtenerUsuarioPorId(@PathVariable Long id){
        Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);
        if(usuario == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el usuario id: " + id);
        return ResponseEntity.ok(usuario);
    }

    /**
     * Actualizar un usuario existente
     * URL: http://localhost:8080/agt-app/usuarios/{id}
     * Método: PUT
     * ⚠️ Nota importante:
     * La contraseña NO se actualiza aquí.
     * Esto se hace así para no afectar la autenticación
     * cuando la contraseña esté encriptada.
     */

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuarioRecibido){

        Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);

        if (usuario == null)
            throw new RecursoNoEncontradoExcepcion(
                    "El id recibido no existe: " + id);

        // Se actualizan solo los datos permitidos
        usuario.setNombre(usuarioRecibido.getNombre());
        usuario.setCorreo(usuarioRecibido.getCorreo());
        usuario.setRol(usuarioRecibido.getRol());

        // ❌ NO se modifica la contraseña aquí
        usuarioServicio.guardarUsuario(usuario);
        return ResponseEntity.ok(usuario);
    }

    //Metodo eliminar

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarUsuario
            (@PathVariable Long id){

        Usuario usuario = usuarioServicio.buscarUsuarioPorId(id);

        if(usuario == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);

        usuarioServicio.eliminarUsuario(usuario);

        // Respuesta tipo JSON: { "eliminado": true }
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
