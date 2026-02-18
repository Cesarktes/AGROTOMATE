import axios from "axios";

/**
 * URL base del backend para autenticación
 * Aquí se consumen los endpoints /auth/*
 */
const URL_BASE = "http://localhost:8080/auth";

/**
 * Función para iniciar sesión
 * Envía correo y contraseña al backend
 */
export const login = async (correo, contrasena) => {

  // Se envía una petición POST al endpoint /auth/login
  const response = await axios.post(`${URL_BASE}/login`, {
    correo,       // correo digitado por el usuario
    contrasena,   // contraseña digitada por el usuario
  });

  // Se guarda el usuario autenticado en el navegador
  // LocalStorage permite mantener la sesión aunque se recargue la página
  localStorage.setItem("usuario", JSON.stringify(response.data));

  // Se retorna el usuario autenticado
  return response.data;
};

/**
 * Función para cerrar sesión
 * Elimina la información del usuario almacenada
 */
export const logout = () => {
  localStorage.removeItem("usuario");
};

/**
 * Obtiene el usuario autenticado almacenado
 * Se usa para validar sesión y roles
 */
export const getUsuario = () => {
  return JSON.parse(localStorage.getItem("usuario"));
};
