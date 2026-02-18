package agt.inv.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * Entidad que representa una venta (salida de inventario).
 * Registra el historial de ventas y controla la salida de productos.
 */


@Entity
@Table(name = "salidas")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Salida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSalida;
    // Fecha en que se realiza la venta
    private LocalDate fecha;
    // Cantidad vendida
    private int cantidad;
    // Valor unitario aplicado en esta venta (histórico)
    private double valorUnitario;
    private double valorTotal;

    // Relaciones

    // Producto vendido
    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    // Cliente que realiza la compra
    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    // Lógica de negocio


    // Calcula el valor total de la venta.

    public void calcularTotal() {
        this.valorTotal = this.cantidad * this.valorUnitario;
    }


}
