package agt.inv.servicio;

import agt.inv.modelo.Proveedor;
import java.util.List;

public interface IProveedorServicio {

    //Metodo para listar todos los objetos de proveedor
    public List<Proveedor> listarProveedores();

    //Metodo para bucar Proveedor por id
    public Proveedor buscarProveedorPorId(Long idProveedor);

    // Metodo para guardar un proveedor. Se encarga de guarda o actualizar si idCliente=null se inserta, sino actualiza
    public Proveedor guardarProveedor(Proveedor proveedor);

    public void eliminarProveedor(Proveedor proveedor);
}
