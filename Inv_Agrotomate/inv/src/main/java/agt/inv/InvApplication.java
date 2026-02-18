package agt.inv;

import agt.inv.modelo.Producto;
import agt.inv.modelo.Salida;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InvApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvApplication.class, args);

/*
		Salida mio = new Salida();

		mio.setCantidad(900);
		mio.setValorUnitario(100);

		int venta = 100;
		Producto producto = new Producto();

		producto.setStock(2000);

		producto.DescontarSalida(mio);

		System.out.println(producto.getStock());
*/


	}
}
