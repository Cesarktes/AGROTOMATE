package agt.inv.servicio;


import agt.inv.modelo.Usuario;

import java.util.List;


public interface IUsuarioServicio {
    //Metodo para listar todos los objetos de Usuario
    public List<Usuario> listarUsuarios();

    //Metodo para bucar Usuarios por id
    public Usuario buscarUsuarioPorId(Long idUsuario);

    // Metodo para guardar un Usuario. Se encarga de guarda o actualizar si idCliente=null se inserta, sino actualiza
    public Usuario guardarUsuario(Usuario usuario);

    public void eliminarUsuario(Usuario usuario);
}
