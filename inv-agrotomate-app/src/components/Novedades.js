import React from "react";
import "./Novedades.css";

export default function Novedades() {
  return (
    <section className="features03 mb-5" id="novedades">
      <div className="container">
        <h2 className="text-center mb-4">Novedades</h2>

        <div className="row">
          {[
            {
              titulo: "Cosecha récord",
              fecha: "2025-12-10",
              texto: "Este año alcanzamos una producción histórica de tomates.",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1633397517223-9f900fc48e9e.jpeg",
            },
            {
              titulo: "Nueva variedad",
              fecha: "2025-12-08",
              texto: "Presentamos nuestro nuevo tomate Rayo de Sol.",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1764587492405-550cc80ec939.jpeg",
            },
            {
              titulo: "Reconocimiento",
              fecha: "2025-12-05",
              texto: "Premio a la calidad y sostenibilidad agrícola.",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1631292170835-dd50c1507537.jpeg",
            },
            {
              titulo: "Consejos",
              fecha: "2025-12-01",
              texto: "Ideas para aprovechar tomates frescos de temporada.",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1627740280088-8155f0a0f7aa.jpeg",
            },
          ].map((item, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="item-wrapper">
                <div className="item-img">
                  <img src={item.img} alt={item.titulo} />
                </div>

                <div className="item-content">
                  <h5 className="item-title">{item.titulo}</h5>
                  <small>{item.fecha}</small>
                  <p>{item.texto}</p>

                  <div className="item-footer">
                    <button className="btn btn-success w-100">
                      Leer más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
