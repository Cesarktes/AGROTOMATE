package agt.inv.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * Entidad que representa una compra (entrada de inventario).
 * Registra el historial de compras a proveedores.
 */

@Entity
@Table(name = "entradas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEntrada;

    @Column(nullable = false)
    private LocalDate fecha;
    @Column(nullable = false)
    private int cantidad;
    @Column(nullable = false)
    private double costoUnitario;
    @Column(nullable = false)
    private double valorTotal;

    // Relaciones

    //Producto comprado
    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    //Proveedor del producto
    @ManyToOne
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor proveedor;

    // Reglas de negocio

    // Calcula el valor total de la compra

    public void calcularTotal() {
        this.valorTotal = this.cantidad * this.costoUnitario;
    }

}

