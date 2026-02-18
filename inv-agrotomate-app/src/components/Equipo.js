import React from "react";
import "./Equipo.css";

export default function Equipo() {
  const equipo = [
    {
      nombre: "Jaider Giraldo",
      rol: "Gerente agrícola",
      img: "https://r.mobirisesite.com/2103754/assets/images/photo-1658335786123-b4b2b56a8c1d.jpeg",
    },
    {
      nombre: "Lina Cardozo",
      rol: "Ingeniera agrónoma",
      img: "https://r.mobirisesite.com/2103754/assets/images/photo-1567468219153-4b1dea5227ea.jpeg",
    },
    {
      nombre: "Alejandro Cruz",
      rol: "Logística y transporte",
      img: "https://r.mobirisesite.com/2103754/assets/images/photo-1607556114526-058f5efdf49e.jpeg",
    },
    {
      nombre: "Cesar Cortes",
      rol: "Control de calidad",
      img: "https://mobirise.com/extensions/planm5/assets/images/image14.jpg",
    },
  ];

  return (
    <section className="equipo-section" id="equipo">
      <div className="container">
        <h2 className="text-center mb-5">Nuestro equipo</h2>

        <div className="row">
          {equipo.map((persona, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="equipo-card">
                <img
                  src={persona.img}
                  alt={persona.nombre}
                  className="equipo-img"
                />
                <h5 className="mt-3">{persona.nombre}</h5>
                <p className="text-muted">{persona.rol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
    
