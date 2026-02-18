package agt.inv.servicios;

import agt.inv.modelo.Entrada;
import agt.inv.modelo.Producto;
import agt.inv.modelo.Proveedor;
import agt.inv.repositorio.EntradaRepositorio;
import agt.inv.repositorio.ProductoRepositorio;
import agt.inv.repositorio.ProveedorRepositorio;

import agt.inv.servicio.EntradaServicio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Prueba unitaria del servicio de compras (EntradaServicio).
 * Valida el correcto registro de una entrada de inventario.
 */
class EntradaServicioTest {

    // ============================
    // Repositorios simulados
    // ============================

    @Mock
    private EntradaRepositorio entradaRepositorio;

    @Mock
    private ProductoRepositorio productoRepositorio;

    @Mock
    private ProveedorRepositorio proveedorRepositorio;

    // ============================
    // Servicio a probar
    // ============================

    @InjectMocks
    private EntradaServicio entradaServicio;

    // ============================
    // Datos de prueba
    // ============================

    private Producto producto;
    private Proveedor proveedor;

    /**
     * Se ejecuta antes de cada prueba.
     * Inicializa mocks y datos base.
     */
    @BeforeEach
    void setUp() {

        // Inicializa Mockito
        MockitoAnnotations.openMocks(this);

        // Producto de prueba
        producto = new Producto();
        producto.setIdProducto(1L);
        producto.setNombre("Tomate Chonto");
        producto.setStock(20); // stock inicial

        // Proveedor de prueba
        proveedor = new Proveedor();
        proveedor.setIdProveedor(1L);
        proveedor.setNombre("Proveedor Prueba");
    }

    /**
     * Caso de prueba:
     * Registrar una compra válida y aumentar el stock del producto.
     */
    @Test
    void registrarCompra_datosValidos_registraEntradaCorrectamente() {

        // ============================
        // Arrange (Preparar escenario)
        // ============================

        when(productoRepositorio.findById(1L))
                .thenReturn(Optional.of(producto));

        when(proveedorRepositorio.findById(1L))
                .thenReturn(Optional.of(proveedor));

        // Simula el guardado de la entrada
        when(entradaRepositorio.save(any(Entrada.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // ============================
        // Act (Ejecutar acción)
        // ============================

        Entrada entrada = entradaServicio.registrarCompra(
                1L,   // idProducto
                1L,   // idProveedor
                10,   // cantidad comprada
                1500  // costo unitario
        );

        // ============================
        // Assert (Verificaciones)
        // ============================

        // La entrada no debe ser nula
        assertNotNull(entrada);

        // Validar cantidad y costo
        assertEquals(10, entrada.getCantidad());
        assertEquals(1500, entrada.getCostoUnitario());

        // Validar total (10 * 1500)
        assertEquals(15000, entrada.getValorTotal());

        // Validar aumento de stock (20 + 10)
        assertEquals(30, producto.getStock());

        // ============================
        // Verificación de persistencia
        // ============================

        verify(productoRepositorio).save(producto);
        verify(entradaRepositorio).save(any(Entrada.class));
    }
    /**
     * Caso de prueba:
     * Intentar registrar una compra con cantidad inválida.
     * El sistema debe lanzar una excepción y no registrar la entrada.
     */
    @Test
    void registrarCompra_cantidadInvalida_lanzaExcepcion() {

        // ============================
        // Arrange
        // ============================

        when(productoRepositorio.findById(1L))
                .thenReturn(Optional.of(producto));

        when(proveedorRepositorio.findById(1L))
                .thenReturn(Optional.of(proveedor));

        // ============================
        // Act & Assert
        // ============================

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> entradaServicio.registrarCompra(
                        1L,   // idProducto
                        1L,   // idProveedor
                        0,    // cantidad inválida
                        1500  // costo válido
                )
        );

        assertEquals(
                "La cantidad comprada debe ser mayor que cero",
                exception.getMessage()
        );

        // ============================
        // Verificaciones
        // ============================

        // El stock NO debe cambiar
        assertEquals(20, producto.getStock());

        // No se guarda ni producto ni entrada
        verify(entradaRepositorio, never()).save(any(Entrada.class));
        verify(productoRepositorio, never()).save(any(Producto.class));
    }
    @Test
    void registrarCompra_costoInvalido_lanzaExcepcion() {

        when(productoRepositorio.findById(1L))
                .thenReturn(Optional.of(producto));

        when(proveedorRepositorio.findById(1L))
                .thenReturn(Optional.of(proveedor));

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> entradaServicio.registrarCompra(
                        1L,
                        1L,
                        5,
                        0   // costo inválido
                )
        );

        assertEquals(
                "El costo unitario debe ser mayor que cero",
                exception.getMessage()
        );

        assertEquals(20, producto.getStock());

        verify(entradaRepositorio, never()).save(any(Entrada.class));
        verify(productoRepositorio, never()).save(any(Producto.class));
    }
}
