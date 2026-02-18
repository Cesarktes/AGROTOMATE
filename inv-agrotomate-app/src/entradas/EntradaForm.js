import { useEffect, useState } from "react";
import { registrarCompra } from "./EntradaService";
import { listarProductos } from "../productos/productoService";
import { listarProveedores } from "../proveedores/ProveedorService"; 
import { useNavigate } from "react-router-dom";

const EntradaForm = () => {
  const navigate = useNavigate();

  // ============================
  // Estados
  // ============================
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [idProveedor, setIdProveedor] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [costoUnitario, setCostoUnitario] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  // ============================
  // Cargar productos y proveedores
  // ============================
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resProductos = await listarProductos();
        setProductos(resProductos.data); // ajustar a resProductos.data.data si tu backend lo devuelve así

        const resProveedores = await listarProveedores();
        setProveedores(resProveedores.data); // ajustar a resProveedores.data.data si aplica
      } catch (err) {
        console.error("Error cargando productos o proveedores", err);
        setError("❌ Error al cargar productos o proveedores");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // ============================
  // Total de la compra
  // ============================
  const total = cantidad && costoUnitario ? Number(cantidad) * Number(costoUnitario) : 0;

  // ============================
  // Registrar compra
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!productoSeleccionado || !idProveedor || !cantidad || !costoUnitario) {
      setError("❌ Todos los campos son obligatorios");
      return;
    }

    try {
      await registrarCompra(
        productoSeleccionado.idProducto,
        idProveedor,
        Number(cantidad),
        Number(costoUnitario)
      );

      setMensaje("✅ Compra registrada correctamente");
      setCantidad(1);
      setCostoUnitario("");
      setProductoSeleccionado(null);
      setIdProveedor("");
    } catch (err) {
      console.error(err);
      setError("❌ No fue posible registrar la compra");
    }
  };

  // ============================
  // Render
  // ============================
  if (cargando) {
    return <p className="text-center mt-4">Cargando productos y proveedores...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Registrar Compra</h2>

      <form onSubmit={handleSubmit}>
        {/* Producto */}
        <div className="mb-3">
          <label>Producto</label>
          <select
            className="form-select"
            onChange={(e) =>
              setProductoSeleccionado(
                productos.find(p => p.idProducto === Number(e.target.value))
              )
            }
            value={productoSeleccionado?.idProducto || ""}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map(p => (
              <option key={p.idProducto} value={p.idProducto}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Stock actual */}
        {productoSeleccionado && (
          <p>
            <strong>Stock actual:</strong> {productoSeleccionado.stock}
          </p>
        )}

        {/* Proveedor */}
        <div className="mb-3">
          <label>Proveedor</label>
          <select
            className="form-select"
            value={idProveedor}
            onChange={(e) => setIdProveedor(e.target.value)}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map(p => (
              <option key={p.idProveedor} value={p.idProveedor}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div className="mb-3">
          <label>Cantidad</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
        </div>

        {/* Costo unitario */}
        <div className="mb-3">
          <label>Costo unitario</label>
          <input
            type="number"
            className="form-control"
            min="0"
            step="0.01"
            value={costoUnitario}
            onChange={(e) => setCostoUnitario(Number(e.target.value))}
            required
          />
        </div>

        {/* Total */}
        <h5>Total compra: <strong>${total}</strong></h5>

        {/* Botones */}
        <div className="mt-3">
          <button type="submit" className="btn btn-success me-2">
            Registrar Compra
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/entradas")}
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Mensajes */}
      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default EntradaForm;
