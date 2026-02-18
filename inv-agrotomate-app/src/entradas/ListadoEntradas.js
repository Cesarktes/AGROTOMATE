import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarEntradas } from "./EntradaService";

const ListadoEntradas = () => {
  // ============================
  // Estados
  // ============================
  const [entradas, setEntradas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // Cargar entradas al iniciar
  // ============================
  useEffect(() => {
    const cargarEntradas = async () => {
      try {
        const res = await listarEntradas();
        // Ajusta según tu backend: si devuelve { data: [...] } -> res.data
        setEntradas(res.data);
      } catch (err) {
        console.error("Error cargando entradas", err);
        setError("❌ No se pudieron cargar las compras");
      } finally {
        setCargando(false);
      }
    };

    cargarEntradas();
  }, []);

  // ============================
  // Render
  // ============================
  if (cargando) {
    return <p className="text-center mt-4">Cargando compras...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Compras</h2>
        <Link to="/entradas/nueva" className="btn btn-primary">
          Registrar Compra
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Costo Unit.</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {entradas.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay compras registradas
              </td>
            </tr>
          ) : (
            entradas.map((e) => (
              <tr key={e.idEntrada}>
                <td>{e.idEntrada}</td>
                <td>{e.fecha}</td>
                <td>{e.producto?.nombre}</td>
                <td>{e.proveedor?.nombre}</td>
                <td>{e.cantidad}</td>
                <td>${e.costoUnitario}</td>
                <td><strong>${e.valorTotal}</strong></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoEntradas;
