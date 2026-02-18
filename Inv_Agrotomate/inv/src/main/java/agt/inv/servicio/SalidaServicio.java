package agt.inv.servicio;

import agt.inv.modelo.Cliente;
import agt.inv.modelo.Producto;
import agt.inv.modelo.Salida;
import agt.inv.repositorio.ClienteRepositorio;
import agt.inv.repositorio.ProductoRepositorio;
import agt.inv.repositorio.SalidaRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalidaServicio implements ISalidaServicio {

    @Autowired
    private SalidaRepositorio salidaRepositorio;

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Transactional
    public Salida registrarVenta(Long idProducto, Long idCliente, int cantidad) {

        Producto producto = productoRepositorio.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!producto.stockSuficiente(cantidad)) {
            throw new IllegalStateException("Stock insuficiente para la venta");
        }

        Cliente cliente = clienteRepositorio.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Salida salida = new Salida();
        salida.setFecha(LocalDate.now());
        salida.setCantidad(cantidad);
        salida.setProducto(producto);
        salida.setCliente(cliente);

        // Precio histórico
        salida.setValorUnitario(producto.getPrecioVentaActual());

        // Cálculo total
        salida.calcularTotal();

        // Descuento de stock
        producto.descontarUnidades(cantidad);

        // Persistencia
        productoRepositorio.save(producto);
        return salidaRepositorio.save(salida);
    }
}


