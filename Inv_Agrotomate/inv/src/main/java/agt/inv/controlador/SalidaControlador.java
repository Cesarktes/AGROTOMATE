package agt.inv.controlador;

import agt.inv.modelo.Salida;
import agt.inv.servicio.SalidaServicio;
import agt.inv.repositorio.SalidaRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agt-app/salidas")
@CrossOrigin(value = "http://localhost:3000")
public class SalidaControlador {

    @Autowired
    private SalidaRepositorio salidaRepositorio;

    @Autowired
    private SalidaServicio salidaServicio;

    @GetMapping
    public List<Salida> listarVentas() {
        return salidaRepositorio.findAll();
    }

    @PostMapping
    public Salida registrarVenta(
            @RequestParam Long idProducto,
            @RequestParam Long idCliente,
            @RequestParam int cantidad
    ) {
        return salidaServicio.registrarVenta(
                idProducto,
                idCliente,
                cantidad
        );
    }
}
