import axios from "axios";

/**
 * Registra una venta en el backend Agrotomate
 */
export const registrarVenta = (idProducto, idCliente, cantidad) => {

  return axios.post(
    "http://localhost:8080/agt-app/salidas",
    null,
    {
      params: {
        idProducto,
        idCliente,
        cantidad
      }
    }
  );
};


