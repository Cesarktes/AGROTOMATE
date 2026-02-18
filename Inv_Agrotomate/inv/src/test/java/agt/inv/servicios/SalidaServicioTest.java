package agt.inv.servicios;

import agt.inv.modelo.Cliente;
import agt.inv.modelo.Producto;
import agt.inv.modelo.Salida;
import agt.inv.repositorio.ClienteRepositorio;
import agt.inv.repositorio.ProductoRepositorio;
import agt.inv.repositorio.SalidaRepositorio;

import agt.inv.servicio.SalidaServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Prueba unitaria del servicio de ventas (SalidaServicio).
 *
 * Objetivo:
 * Verificar que una venta con stock suficiente:
 *  - Se registre correctamente
 *  - Descuente el stock del producto
 *  - Calcule correctamente el valor total
 *
 * Esta prueba NO usa base de datos real.
 * Se simulan los repositorios con Mockito.
 */
class SalidaServicioTest {

    // ============================
    // Dependencias simuladas (Mocks)
    // ============================

    @Mock
    private SalidaRepositorio salidaRepositorio;

    @Mock
    private ProductoRepositorio productoRepositorio;

    @Mock
    private ClienteRepositorio clienteRepositorio;

    // ============================
    // Servicio a probar
    // ============================

    @InjectMocks
    private SalidaServicio salidaServicio;

    // ============================
    // Datos de prueba
    // ============================

    private Producto producto;
    private Cliente cliente;

    /**
     * Se ejecuta antes de cada prueba.
     * Inicializa Mockito y prepara los objetos base.
     */
    @BeforeEach
    void setUp() {

        // Inicializa los mocks (@Mock y @InjectMocks)
        MockitoAnnotations.openMocks(this);

        // Producto de prueba
        producto = new Producto();
        producto.setIdProducto(1L);
        producto.setNombre("Tomate Chonto");
        producto.setPrecioVentaActual(3000);
        producto.setStock(50);

        // Cliente de prueba
        cliente = new Cliente();
        cliente.setIdCliente(1L);
        cliente.setNombre("Cliente Prueba");
    }

    /**
     * Caso de prueba:
     * Registrar una venta cuando el producto tiene stock suficiente.
     */
    @Test
    void registrarVenta_stockSuficiente_registraVentaCorrectamente() {

        // ============================
        // Arrange (Preparar escenario)
        // ============================

        // Simula que el producto existe en el repositorio
        when(productoRepositorio.findById(1L))
                .thenReturn(Optional.of(producto));

        // Simula que el cliente existe en el repositorio
        when(clienteRepositorio.findById(1L))
                .thenReturn(Optional.of(cliente));

        // Simula el guardado de la salida (devuelve el mismo objeto)
        when(salidaRepositorio.save(any(Salida.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // ============================
        // Act (Ejecutar acción)
        // ============================

        Salida salida = salidaServicio.registrarVenta(1L, 1L, 10);

        // ============================
        // Assert (Verificaciones)
        // ============================

        // La salida no debe ser nula
        assertNotNull(salida);

        // Se valida la cantidad vendida
        assertEquals(10, salida.getCantidad());

        // Se valida el precio unitario histórico
        assertEquals(3000, salida.getValorUnitario());

        // Se valida el valor total (10 * 3000)
        assertEquals(30000, salida.getValorTotal());

        // Se valida el descuento correcto del stock (50 - 10)
        assertEquals(40, producto.getStock());

        // ============================
        // Verificación de interacciones
        // ============================

        // Se verifica que el producto fue guardado
        verify(productoRepositorio).save(producto);

        // Se verifica que la salida fue guardada
        verify(salidaRepositorio).save(any(Salida.class));
    }

    /**
     * Caso de prueba:
     * Intentar registrar una venta cuando NO hay stock suficiente.
     * El sistema debe lanzar una excepción y no realizar la venta.
     */
    @Test
    void registrarVenta_stockInsuficiente_lanzaExcepcion() {

        // ============================
        // Arrange (Preparar escenario)
        // ============================

        // Producto con poco stock
        producto.setStock(5);

        when(productoRepositorio.findById(1L))
                .thenReturn(Optional.of(producto));

        when(clienteRepositorio.findById(1L))
                .thenReturn(Optional.of(cliente));

        // ============================
        // Act & Assert
        // ============================

        IllegalStateException exception = assertThrows(
                IllegalStateException.class,
                () -> salidaServicio.registrarVenta(1L, 1L, 10)
        );

        // Validar mensaje de la excepción
        assertEquals("Stock insuficiente para la venta", exception.getMessage());

        // ============================
        // Verificaciones
        // ============================

        // El stock NO debe cambiar
        assertEquals(5, producto.getStock());

        // NO se debe guardar la salida
        verify(salidaRepositorio, never()).save(any(Salida.class));

        // NO se debe guardar el producto
        verify(productoRepositorio, never()).save(any(Producto.class));
    }
}

