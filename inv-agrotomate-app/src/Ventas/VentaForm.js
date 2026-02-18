import { useEffect, useState } from "react";
import { registrarVenta } from "./VentaService";
import { listarProductos } from "../productos/productoService";
import { listarClientes } from "../clientes/clienteService";
import { useNavigate } from "react-router-dom";

const VentaForm = () => {

    const navigate = useNavigate();

  // ============================
  // Estados
  // ============================

  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [idCliente, setIdCliente] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // ============================
  // Cargar datos iniciales
  // ============================

  useEffect(() => {
    listarProductos().then(res => setProductos(res.data));
    listarClientes().then(res => setClientes(res.data));
  }, []);

  // ============================
  // Total visual (UX)
  // ============================

  const total =
    productoSeleccionado
      ? productoSeleccionado.precioVentaActual * cantidad
      : 0;

  // ============================
  // Enviar venta
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      await registrarVenta(
        productoSeleccionado.idProducto,
        idCliente,
        cantidad
      );

      setMensaje("✅ Venta registrada correctamente");
      setCantidad(1);

    } catch (err) {
      setError("❌ No fue posible registrar la venta");
    }
  };

  const stockInsuficiente =
  productoSeleccionado &&
  Number(cantidad) > productoSeleccionado.stock;

  // ============================
  // Render
  // ============================

  return (
    <div className="container mt-4">
      <h2>Registrar Venta</h2>

      <form onSubmit={handleSubmit}>

        {/* Producto */}
        <div className="mb-3">
          <label>Producto</label>
          <select
            className="form-select"
            onChange={(e) =>
              setProductoSeleccionado(
                productos.find(p => p.idProducto == e.target.value)
              )
            }
            required
          >
            <option value="">Seleccione un producto</option>
            {
              productos.map(p => (
                <option key={p.idProducto} value={p.idProducto}>
                  {p.nombre}
                </option>
              ))
            }
          </select>
        </div>

        {/* Precio */}
        {productoSeleccionado && (
        <>
            <p>
            <strong>Precio unitario:</strong> $
            {productoSeleccionado.precioVentaActual}
            </p>

            <p>
            <strong>Stock disponible:</strong>{" "}
            {productoSeleccionado.stock}
            </p>
        </>
        )}

        {/* Cantidad */}
        <div className="mb-3">
          <label>Cantidad</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>

        {/* Cliente */}
        <div className="mb-3">
          <label>Cliente</label>
          <select
            className="form-select"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            required
          >
            <option value="">Seleccione un cliente</option>
            {
              clientes.map(c => (
                <option key={c.idCliente} value={c.idCliente}>
                  {c.nombre}
                </option>
              ))
            }
          </select>
        </div>

        {/* Total */}
        <h5>Total: <strong>${total}</strong></h5>
        
        {stockInsuficiente && (
        <div className="alert alert-warning mt-3">
            ⚠️ La cantidad ingresada supera el stock disponible
        </div>
        )}

        <div className="mt-3">
        <button
            type="submit"
            className="btn btn-success me-2"
            disabled={stockInsuficiente}
        >
            Registrar Venta
        </button>

        <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/ventas")}
        >
            Cancelar
        </button>
        </div>

      </form>

      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default VentaForm;
