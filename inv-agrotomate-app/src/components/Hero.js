import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="header16 text-center text-white mb-5">
      <div className="container">
        <h1 className="hero-title">
          AGROTOMATE: El sabor de la frescura
        </h1>

        <p className="hero-text">
          Cultivamos tomates frescos y de calidad directamente del campo a tu mesa.
        </p>

        <a href="#productos" className="btn btn-success">
          Ver productos
        </a>
      </div>
    </section>
  );
}
