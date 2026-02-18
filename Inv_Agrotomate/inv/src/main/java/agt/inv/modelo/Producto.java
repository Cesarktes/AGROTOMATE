package agt.inv.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Entidad que representa los productos del sistema Agrotomate.
 * Centraliza la información del producto y las reglas de negocio
 * relacionadas con el inventario (stock).
 */

@Entity //indica que esta clase representa una tabla en la base de datos
@Table(name = "productos")  //Nombre de la tabla en la base de datos
@Data //Genera getters, setters, equals y hashCode automáticamente con lombok
@NoArgsConstructor //Constructor vacío (requerido por JPA)
@AllArgsConstructor //Constructor con todos los atributos
@ToString

public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProducto;

    @Column(nullable = false, unique = true)
    private String codigo;

    @Column(nullable = false)
    public String nombre;

    private String descripcion;

    // Precio de referencia para ventas (NO histórico)
    @Column(nullable = false)
    private double precioVentaActual;

    @Column(nullable = false)
    private int stock;

    // Reglas de negocio básicas

    /**
     * Descuenta unidades del stock al realizar una venta.
     * Valida que la cantidad sea válida y que exista stock suficiente.
     *
     * @param cantidad cantidad a descontar
     */

    public void descontarUnidades(int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad a descontar debe ser mayor que cero");
        }
        if (cantidad > stock) {
            throw new IllegalStateException("Stock insuficiente para realizar la venta");
        }
        this.stock -= cantidad;
    }

    /**
     * Aumenta unidades del stock al registrar una entrada (compra).
     * Valida que la cantidad sea válida.
     * @param cantidad cantidad a aumentar
     */
    public void aumentarUnidades(int cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La cantidad a aumentar debe ser mayor que cero");
        }
        this.stock += cantidad;
    }

    /**
     * Verifica si existe stock suficiente para una operación.
     * No modifica el estado del producto
     * @param cantidad cantidad requerida
     * @return true si hay stock suficiente, false en caso contrario
     */
    public boolean stockSuficiente(int cantidad) {
        return cantidad > 0 && this.stock >= cantidad;
    }
}
