package agt.inv.controlador;

import agt.inv.excepcion.RecursoNoEncontradoExcepcion;

import agt.inv.modelo.Producto;
import agt.inv.servicio.IProductoServicio;
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

public class ProductoControlador {
    private static final Logger logger =
            LoggerFactory.getLogger(ProductoControlador.class);

// se inyecta capa servicio
    @Autowired
    private IProductoServicio productoServicio;

    //http://localhost:8080/agt-app/productos
    @GetMapping("/productos")

    //traer el metodo de listarProductos de servicios
    public List<Producto> obtenerProductos(){
        var productos  = productoServicio.listarProductos();
        productos.forEach((producto -> logger.info(producto.toString()))); //muestra en consola resultado
        return productos;
    }
    // metodo para crear o actualizar un Producto
    @PostMapping("/productos")
    public Producto agregarProducto(@RequestBody Producto producto){
        logger.info("Producto a agregar: " + producto);
        return productoServicio.guardarProducto(producto);
    }

    //metodo para buscar por id
    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto>
    obtenerProductoPorId(@PathVariable Long id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el Producto id: " + id);
        return ResponseEntity.ok(producto);
    }

    //Metodoactualizar
    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto>
    actualizarProducto(@PathVariable Long id,
                       @RequestBody Producto productoRecibido){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if (producto == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        producto.setCodigo(productoRecibido.getCodigo());
        producto.setNombre(productoRecibido.getNombre());
        producto.setDescripcion(productoRecibido.getDescripcion());
        producto.setPrecioVentaActual(productoRecibido.getPrecioVentaActual());
        producto.setStock(productoRecibido.getStock());
        productoServicio.guardarProducto(producto);
        return ResponseEntity.ok(producto);
    }

    //Metodo eliminar
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String, Boolean>>
    eliminarCliente(@PathVariable Long id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null)
            throw new RecursoNoEncontradoExcepcion("El id recibido no existe: " + id);
        productoServicio.eliminarProducto(producto);
        // Json {"eliminado": "true"}
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}


// clase Logger del paquete slf4j