package agt.inv.servicio;

import agt.inv.modelo.Producto;
import agt.inv.repositorio.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service  //anotacion para que nuestra clase servicio se pueda utilizar con sprint

public class ProductoServicio implements IProductoServicio{

    @Autowired  // anotacion para inyectar capa repositorio
    private ProductoRepositorio productoRepositorio; // se inyecta la clase repositorio a nuestra clase servicio

    @Override
    public List<Producto> listarProductos() {
        return productoRepositorio.findAll();  //retorna lista de objetos tipo producto
    }

    @Override  // busca productos por Id
    public Producto buscarProductoPorId(Long idProducto) {
        Producto producto = productoRepositorio.findById(idProducto).orElse(null); //sino encuentra el producto retorna null
        return producto;
    }

    @Override //guardar o actualiza un producto
    public Producto guardarProducto(Producto producto) {
        return productoRepositorio.save(producto);
    }

    @Override //elimina  producto
    public void eliminarProducto(Producto producto) {
        productoRepositorio.delete(producto);

    }
}
