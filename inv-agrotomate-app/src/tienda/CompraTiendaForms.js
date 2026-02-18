// ============================
// IMPORTACIONES
// ============================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listarProductos } from "../productos/productoService";
import { registrarVenta } from "../Ventas/VentaService";
import { getUsuario } from "../auth/authService"; 
// 👆 obtenemos el usuario autenticado



const CompraCliente = () => {

  const navigate = useNavigate();

  // ============================
  // USUARIO AUTENTICADO
  // ============================

  const usuario = getUsuario();
  // ⚠️ Este usuario debe tener rol CLIENTE
  // Debe contener el idCliente asociado


  // ============================
  // ESTADOS DEL COMPONENTE
  // ============================

  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [cantidad, setCantidad] = useState(1);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");


  // ============================
  // CARGAR PRODUCTOS DISPONIBLES
  // ============================

  useEffect(() => {
    listarProductos()
      .then(res => {
        // Opcional: solo mostrar productos con stock > 0
        const disponibles = res.data.filter(p => p.stock > 0);
        setProductos(disponibles);
      })
      .catch(() => {
        setError("No fue posible cargar los productos");
      });
  }, []);


  // ============================
  // CALCULAR TOTAL (SOLO VISUAL)
  // ============================

  const total =
    productoSeleccionado
      ? productoSeleccionado.precioVentaActual * cantidad
      : 0;


  // ============================
  // VALIDAR STOCK
  // ============================

  const stockInsuficiente =
    productoSeleccionado &&
    Number(cantidad) > productoSeleccionado.stock;


  // ============================
  // ENVIAR COMPRA
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!productoSeleccionado) {
      setError("Debe seleccionar un producto");
      return;
    }

    try {

      await registrarVenta(
        productoSeleccionado.idProducto,
        usuario.id,   // 👈 el cliente autenticado
        cantidad
      );

      setMensaje("✅ Compra realizada con éxito");

      setCantidad(1);
      setProductoSeleccionado(null);

    } catch (err) {
      setError("❌ No fue posible realizar la compra");
    }
  };


  // ============================
  // RENDER
  // ============================

  return (
    <div className="container mt-4">

      <h2>Tienda Agrotomate</h2>

      <p>
        Bienvenido <strong>{usuario.nombre}</strong>
      </p>

      <form onSubmit={handleSubmit}>

        {/* ============================
            SELECCIÓN DE PRODUCTO
           ============================ */}
        <div className="mb-3">
          <label>Producto</label>

          <select
            className="form-select"
            value={productoSeleccionado?.idProducto || ""}
            onChange={(e) =>
              setProductoSeleccionado(
                productos.find(
                  p => p.idProducto === Number(e.target.value)
                )
              )
            }
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


        {/* ============================
            INFORMACIÓN DEL PRODUCTO
           ============================ */}
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


        {/* ============================
            CANTIDAD
           ============================ */}
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


        {/* ============================
            TOTAL
           ============================ */}
        <h5>
          Total: <strong>${total}</strong>
        </h5>


        {/* ============================
            MENSAJE STOCK INSUFICIENTE
           ============================ */}
        {stockInsuficiente && (
          <div className="alert alert-warning mt-3">
            ⚠️ La cantidad supera el stock disponible
          </div>
        )}


        {/* ============================
            BOTONES
           ============================ */}
        <div className="mt-3">

          <button
            type="submit"
            className="btn btn-success me-2"
            disabled={stockInsuficiente}
          >
            Comprar
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>

        </div>

      </form>


      {/* ============================
          MENSAJES DE RESULTADO
         ============================ */}
      {mensaje && (
        <div className="alert alert-success mt-3">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

    </div>
  );
};

export default CompraCliente;
