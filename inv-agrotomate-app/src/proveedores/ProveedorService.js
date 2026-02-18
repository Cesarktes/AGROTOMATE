import axios from "axios";

export const listarProveedores = () => {
  return axios.get("http://localhost:8080/agt-app/proveedores");
};