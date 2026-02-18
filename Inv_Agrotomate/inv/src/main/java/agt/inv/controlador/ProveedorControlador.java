package agt.inv.controlador;

import agt.inv.excepcion.RecursoNoEncontradoExcepcion;
import agt.inv.modelo.Cliente;
import agt.inv.modelo.Proveedor;
import agt.inv.servicio.ProveedorServicio;
import agt.inv.servicio.IProveedorServicio;
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

public class ProveedorControlador {

    private static final Logger logger =
            LoggerFactory.getLogger(ProveedorControlador.class);

    // se inyecta capa servicio
    @Autowired
    private IProveedorServicio proveedorServicio;

    //http://localhost:8080/agt-app/proveedores
    @GetMapping("/proveedores")

    //traer el metodo de listarProveedores de servicios
    public List<Proveedor> obtenerProveedores() {
        var proveedores = proveedorServicio.listarProveedores();
        proveedores.forEach((proveedor -> logger.info(proveedor.toString()))); //muestra en consola resultado
        return proveedores;
    }

    // metodo guardar
    @PostMapping("/proveedores")
    public Proveedor agregarProveedor(@RequestBody Proveedor proveedor){
        logger.info("Proveedor a agregar: " + proveedor);
        return proveedorServicio.guardarProveedor(proveedor);
    }

    //metodo para buscar por id
    @GetMapping("/proveedores/{id}")
    public ResponseEntity<Proveedor>
    obtenerProveedorPorId(@PathVariable Long id){
        Proveedor proveedor = proveedorServicio.buscarProveedorPorId(id);
        if(proveedor == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el proveedor id: " + id);
        return ResponseEntity.ok(proveedor);
    }

    //Metodo actualizar
    @PutMapping("/proveedores/{id}")
    public ResponseEntity<Proveedor>
    actualizarProveedor(@PathVariable Long id,
                        @RequestBody Proveedor proveedorRecibido){
        Proveedor proveedor = proveedorServicio.buscarProveedorPorId(id);
        if (proveedor == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        proveedor.setNombre(proveedorRecibido.getNombre());
        proveedor.setContacto(proveedorRecibido.getContacto());
        proveedor.setTelefono(proveedorRecibido.getTelefono());
        proveedor.setEmail(proveedorRecibido.getEmail());
        proveedor.setDireccion(proveedorRecibido.getDireccion());
        proveedorServicio.guardarProveedor(proveedor);
        return ResponseEntity.ok(proveedor);
    }

    //Metodo eliminar
    @DeleteMapping("/proveedores/{id}")
    public ResponseEntity<Map<String, Boolean>>
    eliminarProveedor(@PathVariable Long id){
        Proveedor proveedor = proveedorServicio.buscarProveedorPorId(id);
        if(proveedor == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        proveedorServicio.eliminarProveedor(proveedor);
        // Json {"eliminado": "true"}
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
    }

