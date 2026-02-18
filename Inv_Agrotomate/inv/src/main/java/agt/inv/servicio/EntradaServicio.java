package agt.inv.servicio;

import agt.inv.modelo.Entrada;
import agt.inv.modelo.Producto;
import agt.inv.modelo.Proveedor;
import agt.inv.repositorio.EntradaRepositorio;
import agt.inv.repositorio.ProductoRepositorio;
import agt.inv.repositorio.ProveedorRepositorio;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Servicio encargado de gestionar las compras (entradas de inventario).
 * Aquí se implementa la lógica de negocio relacionada con las entradas.
 */
@Service
public class EntradaServicio {

    // ============================
    // Inyección de repositorios
    // ============================

    @Autowired
    private EntradaRepositorio entradaRepositorio;

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Autowired
    private ProveedorRepositorio proveedorRepositorio;

    // ============================
    // Listar todas las entradas
   // ============================
    public List<Entrada> listarTodasEntradas() {
        return entradaRepositorio.findAll();
    }

    // ============================
    // Registro de una compra
    // ============================

    /**
     * Registra una compra y actualiza el inventario del producto.
     *
     * @param idProducto    identificador del producto comprado
     * @param idProveedor   identificador del proveedor
     * @param cantidad      cantidad comprada
     * @param costoUnitario costo unitario de la compra
     * @return Entrada registrada
     */
    @Transactional
    public Entrada registrarCompra(Long idProducto,
                                   Long idProveedor,
                                   int cantidad,
                                   double costoUnitario) {

        // ============================
        // 1. Buscar producto
        // ============================

        Producto producto = productoRepositorio.findById(idProducto)
                .orElseThrow(() ->
                        new RuntimeException("Producto no encontrado")
                );

        // ============================
        // 2. Buscar proveedor
        // ============================

        Proveedor proveedor = proveedorRepositorio.findById(idProveedor)
                .orElseThrow(() ->
                        new RuntimeException("Proveedor no encontrado")
                );

        // ============================
        // 3. Validaciones de negocio
        // ============================

        if (cantidad <= 0) {
            throw new IllegalArgumentException(
                    "La cantidad comprada debe ser mayor que cero"
            );
        }

        if (costoUnitario <= 0) {
            throw new IllegalArgumentException(
                    "El costo unitario debe ser mayor que cero"
            );
        }

        // ============================
        // 4. Crear la entrada (compra)
        // ============================

        Entrada entrada = new Entrada();
        entrada.setFecha(LocalDate.now());     // Fecha automática
        entrada.setCantidad(cantidad);
        entrada.setCostoUnitario(costoUnitario);
        entrada.setProducto(producto);
        entrada.setProveedor(proveedor);

        // ============================
        // 5. Calcular valor total
        // ============================

        entrada.calcularTotal();

        // ============================
        // 6. Actualizar inventario
        // ============================

        // Se aumenta el stock del producto según la compra
        producto.aumentarUnidades(cantidad);

        // ============================
        // 7. Persistencia (transaccional)
        // ============================

        // Se guarda primero el producto actualizado
        productoRepositorio.save(producto);

        // Se guarda la entrada (histórico de compras)
        return entradaRepositorio.save(entrada);
    }
}
