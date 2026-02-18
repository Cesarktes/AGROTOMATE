import React from "react";
import "./Contacto.css";

export default function Contacto() {
  return (
    <section className="contacto-section" id="contacto">
      <div className="container">
        <h2 className="text-center mb-5">Contáctanos</h2>

        <div className="row">
          {/* FORMULARIO */}
          <div className="col-12 col-md-6 mb-4">
            <form className="contacto-form">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="correo@email.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Escribe tu mensaje"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* INFO DE CONTACTO */}
          <div className="col-12 col-md-6">
            <div className="contacto-info">
              <p><strong>Dirección:</strong> Chía, Cundinamarca</p>
              <p><strong>Teléfono:</strong> +57 300 123 4567</p>
              <p><strong>Email:</strong> contacto@agrotomate.com</p>

              <iframe
                title="Mapa Agrotomate"
                src="https://www.google.com/maps?q=Chía,Cundinamarca&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
