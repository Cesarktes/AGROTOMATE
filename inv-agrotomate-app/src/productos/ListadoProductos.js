import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

//declaracion del componente ListadoProductos
export default function ListadoProductos() {
  
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
    const eliminarProducto = async (id) => {
        await axios.delete(`${urlBase}/${id}`); //realiza la solicitud al backend
        cargarProducto(); //recarga la vista despues de eliminar
    }


  return (
    <div>
        <div className="container text-center mb-4" >
            <h3>Modificar Productos</h3>
        </div>
        <table className="table table-striped table-hover align-middle mx-auto" style={{ maxWidth: "90%" }}>
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
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
                <th scope="row">{producto.idProducto}</th>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td >{producto.descripcion}</td>
                <td><NumericFormat value={producto.precioVentaActual}
                    displayType={'text'}
                    thousandSeparator=',' 
                    decimalScale={1} fixedDecimalScale={false}/>
                </td>
                <td><NumericFormat value={producto.stock}
                    displayType={'text'}
                    thousandSeparator=',' 
                    decimalScale={1} fixedDecimalScale={false}/>
                </td>
                <td>
                    <div  style={{ display: 'flex', gap: '0.5rem'}}>
                        <Link to={`/producto/editar/${producto.idProducto}`}
                        className='btn btn-warning btn-sm 'style={{ flexShrink: 0 }}>Editar</Link>
                        <button
                            onClick ={()=> eliminarProducto(producto.idProducto)}
                            className ='btn btn-danger btn-sm'style={{ flexShrink: 0 }}
                        > Eliminar </button>
                    </div>
                </td>

              
                </tr> 
            ))            
            }
        </tbody>
        </table>

    </div>

  )
}
     