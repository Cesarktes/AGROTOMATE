import React from "react";
import "./Productos.css";

export default function Productos() {
  return (
    <section className="pricing02" id="productos">
      <div className="container">
        <h2 className="text-center mb-4">Nuestros productos</h2>

        <div className="row">
          {[
            {
              nombre: "Tomate Selecto de Calidad Premium",
              texto: "Destaca por su sabor equilibrado y gran versatilidad gourmet.",
              precio: "$9.50",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1760562796021-d8bbcb5bc318.jpeg",
            },
            {
              nombre: "Tomate  Primera  AAA",
              texto: "Seleccionado por su frescura,  sabor  intenso y excelente  presentación .",
              precio: "$8.00",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1638100345650-f26df74d980d.jpeg",
            },
            {
              nombre: "Tomate Segunda AA",
              texto: "Seleccionado por su frescura, corte limpio y gran adaptabilidad a todo tipo de preparaciones.",
              precio: "$7.50",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1679942345838-91212aedb6e2.jpeg",
            },
            {
              nombre: "Tomate Tercera A   ",
              texto: "Ideal por su  frescura, textura resistente y versatilidad en todo tipo de   preparaciones.",
              precio: "$5.25",
              img: "https://r.mobirisesite.com/2103754/assets/images/photo-1594567170531-bb0a139aaba3.jpeg",
            },
          ].map((prod, i) => (
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div className="item-wrapper">
                <div className="item-img">
                  <img src={prod.img} alt={prod.nombre} />
                </div>

                <div className="item-content">
                  <h5 className="item-title">{prod.nombre}</h5>
                  <p className="item-text">{prod.texto}</p>
                  <p>{prod.precio}</p>

                  <button className="btn btn-success w-100">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
