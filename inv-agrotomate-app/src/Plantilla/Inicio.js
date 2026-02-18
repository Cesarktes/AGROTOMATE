import React from "react";
import "./inicio.css";

import Hero from "../components/Hero";
import Novedades from "../components/Novedades";
import Productos from "../components/Productos";
import Equipo from "../components/Equipo";
import Contacto from "../components/Contacto";

/**
 * Página de inicio del sistema INV-AGROTOMATE
 * Contiene información institucional, novedades y productos.
 */
export default function Inicio() {
  return (
    <div className="landing-agrotomate">

      {/* ======= HERO ======= */}
      <Hero />

      {/* ======= CONTENIDO ======= */}
      <main>
        <Novedades />
        <Productos />
        <Equipo />
        <Contacto />
      </main>

      {/* ======= FOOTER ======= */}
      <footer className="footer2 text-center mt-5">
        <div className="container">
          <p>© 2025 AGROTOMATE - Todos los derechos reservados</p>
        </div>
      </footer>

    </div>
  );
}
