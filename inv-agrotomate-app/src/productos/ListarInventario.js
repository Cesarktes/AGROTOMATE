import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';


//declaracion del componente ListadoProductos
export default function ListarInventario() {
  
    const urlBase = "http://localhost:8080/agt-app/productos";

    //HOOK useState PARA GUARDAR LOS PRODUCTOS
    const[productos, setProductos] = useState([]);
    //useEffect → LLAMAR LA API AL CARGAR EL COMPONENTE
    useEffect(() => {
        cargarProducto();
    }, []);
    //FUNCIÓN cargarProducto() → HACE LA PETICIÓN A LA API
    const cargarProducto = async () => {
        const resultado = await axios.get(urlBase); //realiza la solicitud al backend
        console.log("Resultado cargar productos");
        console.log(resultado.data);
        setProductos(resultado.data); //contiene los datos devueltos por la API.
    }

  return (
    <div>
        <div className="container text-center mb-4" >
            <h3>Inventarios Agrotomate</h3>
        </div>
        <table className="table table-striped table-hover align-middle mx-auto" style={{ maxWidth: "90%" }}>
        <thead className='table-dark'>
            <tr>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio Actual</th>
            <th scope="col">Stock</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
            //Iteramos el arreglo de productos
            productos.map((producto, indice) => (
                <tr key={indice}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td><NumericFormat value={producto.precioVentaActual}
                    displayType={'text'}
                    thousandSeparator=',' 
                    decimalScale={1} 
                    fixedDecimalScale={false}/>
                </td>
                <td><NumericFormat value={producto.stock}
                    displayType={'text'}
                    thousandSeparator=',' 
                    decimalScale={1} 
                    fixedDecimalScale={false}/>
                </td>
                </tr> 
            ))            
            }
        </tbody>
        </table>

    </div>

  )
}
     