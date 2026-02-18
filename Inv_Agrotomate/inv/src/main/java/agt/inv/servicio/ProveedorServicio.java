package agt.inv.servicio;

import agt.inv.modelo.Proveedor;
import agt.inv.repositorio.ProveedorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ProveedorServicio implements IProveedorServicio {

    @Autowired  // anotacion para inyectar capa repositorio
    private ProveedorRepositorio proveedorRepositorio; // se inyecta la clase repositorio a nuestra clase servicio

    @Override
    public List<Proveedor> listarProveedores() {
        return proveedorRepositorio.findAll();
    }

    @Override
    public Proveedor buscarProveedorPorId(Long idProveedor) {
        Proveedor proveedor = proveedorRepositorio.findById(idProveedor).orElse(null);
        return proveedor;
    }

    @Override
    public Proveedor guardarProveedor(Proveedor proveedor) {
        return proveedorRepositorio.save(proveedor);
    }

    @Override
    public void eliminarProveedor(Proveedor proveedor) {
        proveedorRepositorio.delete(proveedor);
    }
}
