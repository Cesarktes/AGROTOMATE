import axios from "axios";

/**
 * Registra una compra (entrada de inventario)
 */
export const registrarCompra = (
  idProducto,
  idProveedor,
  cantidad,
  costoUnitario
) => {
  return axios.post(
    "http://localhost:8080/agt-app/entradas",
    null,
    {
      params: {
        idProducto,
        idProveedor,
        cantidad,
        costoUnitario
      }
    }
  );
};

/**
 * Lista todas las compras
 */
export const listarEntradas = () => {
  return axios.get("http://localhost:8080/agt-app/entradas");
};
