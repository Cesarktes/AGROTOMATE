import axios from "axios";

export const listarClientes = () => {
  return axios.get("http://localhost:8080/agt-app/clientes");
};

