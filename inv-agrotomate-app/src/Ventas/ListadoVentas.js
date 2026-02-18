import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Componente que lista todas las ventas registradas
 */
const ListadoVentas = () => {

  // ============================
  // Estado
  // ============================

  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ============================
  // Cargar ventas al iniciar
  // ============================

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/agt-app/salidas"
      );
      setVentas(response.data);
    } catch (error) {
      console.error("Error cargando ventas", error);
    } finally {
      setCargando(false);
    }
  };

  // ============================
  // Render
  // ============================

  if (cargando) {
    return <p className="text-center mt-4">Cargando ventas...</p>;
  }

  return (
    <div className="container mt-4">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Ventas</h2>

        <Link to="/ventas/nueva" className="btn btn-primary">
          Registrar Venta
        </Link>
      </div>

      {/* Tabla */}
      <table className="table table-bordered table-hover">

        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>Valor Unit.</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {ventas.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay ventas registradas
              </td>
            </tr>
          ) : (
            ventas.map((venta) => (
              <tr key={venta.idSalida}>
                <td>{venta.idSalida}</td>
                <td>{venta.fecha}</td>
                <td>{venta.producto?.nombre}</td>
                <td>{venta.cliente?.nombre}</td>
                <td>{venta.cantidad}</td>
                <td>${venta.valorUnitario}</td>
                <td><strong>${venta.valorTotal}</strong></td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default ListadoVentas;
