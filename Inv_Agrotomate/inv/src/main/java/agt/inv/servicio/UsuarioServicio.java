package agt.inv.servicio;

import agt.inv.modelo.Usuario;
import agt.inv.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // anotacion para que nuestra clase servicio se pueda utilizar con spring
public class UsuarioServicio implements IUsuarioServicio {

    @Autowired  // anotacion para inyectar capa repositorio
    private UsuarioRepositorio usuarioRepositorio; // se inyecta la clase repositorio a nuestra clase servicio

    @Autowired
    private PasswordEncoder passwordEncoder; // Bean BCrypt definido en SecurityConfig

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    @Override
    public Usuario buscarUsuarioPorId(Long idUsuario) {
        return usuarioRepositorio.findById(idUsuario)
                .orElse(null);
    }

    @Override
    public Usuario guardarUsuario(Usuario usuario) {

        // 🔐 Validar correo SOLO si es nuevo usuario
        if (usuario.getIdUsuario() == null &&
                usuarioRepositorio.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // 🔐 Validar rol
        if (usuario.getRol() == null) {
            throw new RuntimeException("El rol es obligatorio");
        }

        // 🔐 Encriptar contraseña SOLO al crear el usuario
        // Si el id es null, significa que es un usuario nuevo
        if (usuario.getIdUsuario() == null) {
            usuario.setContrasena(
                    passwordEncoder.encode(usuario.getContrasena())
            );
        }

        return usuarioRepositorio.save(usuario);
    }

    @Override
    public void eliminarUsuario(Usuario usuario) {
        usuarioRepositorio.delete(usuario);
    }

    /**
     * 🔑 Lógica de autenticación (LOGIN)
     *
     * @param correo correo ingresado por el usuario
     * @param contrasena contraseña ingresada por el usuario
     * @return Usuario autenticado (SIN contraseña)
     */
    public Usuario login(String correo, String contrasena) {

        // 1️⃣ Buscar el usuario por correo
        Usuario usuario = usuarioRepositorio.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2️⃣ Comparar contraseña ingresada con la encriptada en la base de datos
        boolean passwordCorrecta = passwordEncoder.matches(
                contrasena,             // contraseña escrita por el usuario
                usuario.getContrasena() // contraseña encriptada almacenada
        );

        // 3️⃣ Si la contraseña no coincide, se lanza error
        if (!passwordCorrecta) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // 4️⃣ Por seguridad, nunca se envía la contraseña al frontend
        usuario.setContrasena(null);

        // 5️⃣ Usuario autenticado correctamente
        return usuario;
    }
}

