import ListadoClientes from "./clientes/ListadoClientes";
import ListadoProductos from "./productos/ListadoProductos";
import ListarInventario from "./productos/ListarInventario";
import ListadoProveedores from "./proveedores/ListadoProveedores";
import ListadoUsuarios from "./usuarios/ListadoUsuarios";
import Navegacion from "./Plantilla/Navegacion";
import Inicio from "./Plantilla/Inicio";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgregarProducto from "./productos/AgregarProducto";
import AgregarCliente from "./clientes/AgregarCliente";
import AgregarProveedor from "./proveedores/AgregarProveedor";
import AgregarUsuario from "./usuarios/AgregarUsuario";
import EditarProducto from "./productos/EditarProducto";
import EditarCliente from "./clientes/EditarCliente";
import EditarProveedor from "./proveedores/EditarProveedor";
import EditarUsuario from "./usuarios/EditarUsuario";

import VentaForm from "./Ventas/VentaForm";
import ListadoVentas from "./Ventas/ListadoVentas";
import EntradaForm from "./entradas/EntradaForm";
import ListadoEntradas from "./entradas/ListadoEntradas";
import Login from "./auth/Login";
import CompraCliente from "./tienda/CompraTiendaForms";



function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Navegacion/>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/inventario" element={<ListarInventario/>} />
          <Route path="/producto" element={<ListadoProductos/>} />
          <Route path="/producto/editar/:id" element={<EditarProducto/>} />
          <Route path="/agregarproducto" element={<AgregarProducto/>} />
          <Route path="/clientes" element={<ListadoClientes/>} />
          <Route path="/agregarcliente" element={<AgregarCliente/>} />
          <Route path="/clientes/editar/:id" element={<EditarCliente/>} />
          <Route path="/proveedores" element={<ListadoProveedores/>} />
          <Route path="/agregarproveedor" element={<AgregarProveedor/>} />
          <Route path="/proveedores/editar/:id" element={<EditarProveedor/>} />
          <Route path="/usuarios" element={<ListadoUsuarios/>} />
          <Route path="/agregarusuario" element={<AgregarUsuario/>} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario/>} />
          <Route path="/ventas" element={<ListadoVentas />} />
          <Route path="/ventas/nueva" element={<VentaForm />} />
          <Route path="/entradas" element={<ListadoEntradas />} />
          <Route path="/entradas/nueva" element={<EntradaForm />} />
          {/*<Route path="/tienda/CompraCliente" element={<CompraCliente />} />    PENDIENTE X IMPLEMENTAR*/}

        </Routes>
      </BrowserRouter>
     
    </div>

    
  );
}

export default App;
