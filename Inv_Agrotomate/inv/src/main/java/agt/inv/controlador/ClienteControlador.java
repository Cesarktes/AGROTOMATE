package agt.inv.controlador;

import agt.inv.excepcion.RecursoNoEncontradoExcepcion;
import agt.inv.modelo.Cliente;
import agt.inv.modelo.Usuario;
import agt.inv.servicio.ClienteServicio;
import agt.inv.servicio.IClienteServicio;
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

public class ClienteControlador {
    private static final Logger logger =
            LoggerFactory.getLogger(ClienteControlador.class);

    // se inyecta capa servicio
    @Autowired
    private IClienteServicio clienteServicio;

    //http://localhost:8080/agt-app/clientes
    @GetMapping("/clientes")

    //traer el metodo de listarClientes de servicios
    public List<Cliente> obtenerClientes(){
        var clientes  = clienteServicio.listarClientes();
        clientes.forEach((cliente -> logger.info(cliente.toString()))); //muestra en consola resultado
        return clientes;
    }

    // metodo guardar
    @PostMapping("/clientes")
    public Cliente agregarCliente(@RequestBody Cliente cliente){
        logger.info("Cliente a agregar: " + cliente);
        return clienteServicio.guardarCliente(cliente);
    }

    //metodo para buscar por id
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente>
    obtenerClientePorId(@PathVariable Long id){
        Cliente cliente = clienteServicio.buscarClientePorId(id);
        if(cliente == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el cliente id: " + id);
        return ResponseEntity.ok(cliente);
    }

    //Metodo actualizar
    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente>
    actualizarCliente(@PathVariable Long id,
                       @RequestBody Cliente clienteRecibido){
        Cliente cliente = clienteServicio.buscarClientePorId(id);
        if (cliente == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        cliente.setNombre(clienteRecibido.getNombre());
        cliente.setTelefono(clienteRecibido.getTelefono());
        cliente.setEmail(clienteRecibido.getEmail());
        cliente.setDireccion(clienteRecibido.getDireccion());
        clienteServicio.guardarCliente(cliente);
        return ResponseEntity.ok(cliente);
    }

    //Metodo eliminar
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String, Boolean>>
    eliminarCliente(@PathVariable Long id){
        Cliente cliente = clienteServicio.buscarClientePorId(id);
        if(cliente == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        clienteServicio.eliminarCliente(cliente);
        // Json {"eliminado": "true"}
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
