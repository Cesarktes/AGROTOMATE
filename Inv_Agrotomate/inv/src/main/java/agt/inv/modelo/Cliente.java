package agt.inv.modelo;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString

public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    @Column(nullable = false)
    private String nombre;
    private String telefono;
    private String email;
    private String direccion;

    @Column(name = "fecha_registro", nullable = false) // se usa para nombrar en bd la columna
    private LocalDate fechaRegistro;

    @PrePersist  //Se ejecuta automáticamente Justo ANTES de guardar en la base de datos
    protected void asignarFechaRegistro() {
        this.fechaRegistro = LocalDate.now();   //Se use la fecha del servidor
    }
}

