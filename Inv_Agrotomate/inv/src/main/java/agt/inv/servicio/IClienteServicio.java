package agt.inv.servicio;

import agt.inv.modelo.Cliente;
import java.util.List;


public interface IClienteServicio {
    //Metodo para listar todos los objetos de Cliente
    public List<Cliente> listarClientes();

    //Metodo para bucar Clientes por id
    public Cliente buscarClientePorId(Long idCliente);

    // Metodo para guardar un Cliente. Se encarga de guarda o actualizar si idCliente=null se inserta, sino actualiza
    public Cliente guardarCliente(Cliente cliente);

    public void eliminarCliente(Cliente cliente);
}


