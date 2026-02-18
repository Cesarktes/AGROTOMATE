import { Link, useNavigate } from "react-router-dom";
import { logout, getUsuario } from "../auth/authService"; // servicio de autenticación

// MENU DESPLEGABLE TIPO HAMBURGUESA

export default function Navegacion() {

  // Se obtiene el usuario autenticado desde el localStorage
  // Si no hay sesión, usuario será null
  const usuario = getUsuario();

  // Hook para redireccionar rutas
  const navigate = useNavigate();

  // Método para cerrar sesión
  const cerrarSesion = () => {
    logout();              // elimina el usuario del localStorage
    navigate("/login");    // redirige a la pantalla de login
  };

  // ================================
  // VALIDACIONES DE ROL
  // ================================
  // Estas constantes facilitan la lectura del código
  // y evitan escribir usuario?.rol muchas veces
  const esAdmin = usuario?.rol === "ADMIN";
  const esEmpleado = usuario?.rol === "EMPLEADO";
  const esCliente = usuario?.rol === "CLIENTE";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/">
          Productos Frescos Agrotomate
        </Link>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">

            {/* INICIO: todos los roles */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>

            {/* PRODUCTOS: solo ADMIN */}
              {esAdmin && (
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button"
                    data-bs-toggle="dropdown">Productos</span>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/inventario">Ver Inventario</Link></li>
                    <li><Link className="dropdown-item" to="/producto">Productos</Link></li>
                    <li><Link className="dropdown-item" to="/agregarproducto">Crear Producto</Link></li>
                  </ul>
                </li>
              )}

              {/* INVENTARIO: ADMIN y EMPLEADO */}
                {(esAdmin || esEmpleado) && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/inventario">Inventario</Link>
                  </li>
                )}     

            {/* CLIENTES: solo ADMIN */}
            {esAdmin && (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button"
                  data-bs-toggle="dropdown">Clientes</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/clientes">Ver Clientes</Link></li>
                  <li><Link className="dropdown-item" to="/agregarcliente">Crear Cliente</Link></li>
                </ul>
              </li>
            )}

            {/* PROVEEDORES: solo ADMIN */}
            {esAdmin && (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button"
                  data-bs-toggle="dropdown">Proveedores</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/proveedores">Ver Proveedores</Link></li>
                  <li><Link className="dropdown-item" to="/agregarproveedor">Crear Proveedor</Link></li>
                </ul>
              </li>
            )}

            {/* USUARIOS: solo ADMIN */}
            {esAdmin && (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button"
                  data-bs-toggle="dropdown">Usuarios</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/usuarios">Ver Usuarios</Link></li>
                  <li><Link className="dropdown-item" to="/agregarusuario">Crear Usuario</Link></li>
                </ul>
              </li>
            )}

            {/* VENTAS: ADMIN y EMPLEADO */}
            {(esAdmin || esEmpleado) && (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button"
                  data-bs-toggle="dropdown">Ventas</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/ventas">Ver Ventas</Link></li>
                  <li><Link className="dropdown-item" to="/ventas/nueva">Registrar Venta</Link></li>
                </ul>
              </li>
            )}

            {/* COMPRAS: ADMIN y EMPLEADO */}
            {(esAdmin || esEmpleado) && (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button"
                  data-bs-toggle="dropdown">Compras</span>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/entradas">Ver Compras</Link></li>
                  <li><Link className="dropdown-item" to="/entradas/nueva">Registrar Compra</Link></li>
                </ul>
              </li>
            )}
            
            {/* COMPRA CLIENTE: solo CLIENTE  PENDIENTE POR IMPLEMENTAR*/}
            {esCliente && (
              <li className="nav-item">
                <Link className="nav-link" to="tienda/CompraCliente">
                  Realizar compra
                </Link>
              </li>
            )}   

            {/* 
              MENU LOGIN / LOGOUT
              - Si NO hay usuario → muestra Login
              - Si hay usuario → muestra nombre y Logout
            */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button"
                data-bs-toggle="dropdown">
                {usuario ? usuario.nombre : "Login"}
              </span>

              <ul className="dropdown-menu">
                {!usuario && (
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Ingresar al sistema
                    </Link>
                  </li>
                )}

                {usuario && (
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={cerrarSesion}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                )}
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
