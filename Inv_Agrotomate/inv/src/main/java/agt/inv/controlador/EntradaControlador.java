package agt.inv.controlador;

import agt.inv.modelo.Entrada;
import agt.inv.servicio.EntradaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST encargado de las compras (entradas de inventario).
 * Recibe solicitudes del frontend y delega la lógica al servicio.
 */
@RestController
@RequestMapping("/agt-app/entradas")
// Permite que todas las rutas tengan el prefijo /agt-app/entradas
@CrossOrigin(origins = "http://localhost:3000")
// Permite que React (localhost:3000) pueda consumir estos endpoints
public class EntradaControlador {

    // ============================
    // Inyección del servicio
    // ============================
    @Autowired
    private EntradaServicio entradaServicio;

    // ============================
    // Endpoint POST: Registrar una compra
    // ============================
    /**
     * Registra una compra (entrada de inventario) y actualiza el stock del producto.
     * URL: POST /agt-app/entradas
     *
     * @param idProducto    ID del producto comprado
     * @param idProveedor   ID del proveedor
     * @param cantidad      Cantidad comprada
     * @param costoUnitario Costo unitario del producto
     * @return Entrada registrada con HTTP 200 OK
     */
    @PostMapping
    public ResponseEntity<Entrada> registrarCompra(
            @RequestParam Long idProducto,
            @RequestParam Long idProveedor,
            @RequestParam int cantidad,
            @RequestParam double costoUnitario
    ) {
        // Delegamos la lógica al servicio
        Entrada entrada = entradaServicio.registrarCompra(
                idProducto,
                idProveedor,
                cantidad,
                costoUnitario
        );

        // Retornamos la entrada registrada
        return ResponseEntity.ok(entrada);
    }

    // ============================
    // Endpoint GET: Listar todas las compras
    // ============================
    /**
     * Devuelve la lista completa de compras registradas (entradas de inventario).
     * URL: GET /agt-app/entradas
     *
     * @return Lista de entradas con HTTP 200 OK
     */
    @GetMapping
    public ResponseEntity<List<Entrada>> listarEntradas() {
        // Llamamos al servicio para obtener todas las entradas
        List<Entrada> entradas = entradaServicio.listarTodasEntradas();

        // Retornamos la lista al frontend
        return ResponseEntity.ok(entradas);
    }
}
