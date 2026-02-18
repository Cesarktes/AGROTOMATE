package agt.inv.servicio;

import agt.inv.modelo.Cliente;
import agt.inv.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //anotacion para que nuestra clase servicio se pueda utilizar con sprint

public class ClienteServicio implements IClienteServicio{

    @Autowired  // anotacion para inyectar capa repositorio
    private ClienteRepositorio clienteRepositorio; // se inyecta la clase repositorio a nuestra clase servicio

    @Override
    public List<Cliente> listarClientes() {
        return clienteRepositorio.findAll();
    }

    @Override
    public Cliente buscarClientePorId(Long idCliente) {
        Cliente cliente = clienteRepositorio.findById(idCliente).orElse(null); //sino encuentra el cliente retorna null
        return cliente;
    }

    @Override
    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepositorio.save(cliente);
    }

    @Override
    public void eliminarCliente(Cliente cliente) {
        clienteRepositorio.delete(cliente);

    }
}
