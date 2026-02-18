package agt.inv.servicio;

import agt.inv.modelo.Producto;
import java.util.List;

public interface IProductoServicio {

    //Metodo para listar todos los objetos de Producto
    public List <Producto> listarProductos();

    //Metodo para bucar productos por id
    public Producto buscarProductoPorId(Long idProducto);

   // Metodo para guardar un producto. Se encarga de guarda o actualizar si idProducto=null se inserta, sino actualiza
    public Producto guardarProducto(Producto producto);

    public void eliminarProducto(Producto producto);


}
