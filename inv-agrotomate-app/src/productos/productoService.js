import axios from "axios";

export const listarProductos = () => {
  return axios.get("http://localhost:8080/agt-app/productos");
};

