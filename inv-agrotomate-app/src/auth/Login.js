import { useState } from "react";
import { login } from "./authService";
import { useNavigate } from "react-router-dom";

/**
 * Componente Login
 * Permite autenticar al usuario en el sistema
 */
function Login() {

  // Estados para capturar los datos del formulario
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Estado para mostrar errores de autenticación
  const [error, setError] = useState("");

  // Hook para redireccionar a otra ruta
  const navigate = useNavigate();

  /**
   * Método que se ejecuta al enviar el formulario
   */
  const onSubmit = async (e) => {
    e.preventDefault(); // evita recargar la página
    setError("");       // limpia errores anteriores

    try {
      // Se llama al servicio de login
      await login(correo, contrasena);

      // Si el login es exitoso, redirige al inicio
      navigate("/");
    } catch (err) {
      // Si ocurre un error (401 / 500), se muestra mensaje
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>

      {/* Mensaje de error */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit}>

        {/* Campo correo */}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        {/* Campo contraseña */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">
          Ingresar
        </button>

      </form>
    </div>
  );
}

export default Login;
