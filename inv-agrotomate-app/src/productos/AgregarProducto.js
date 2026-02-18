import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarProducto() {

    let navegacion = useNavigate();

    
    const [producto, setProducto]=useState({
        codigo:"",
        nombre:"",
        descripcion:"",
        precioVentaActual:0,
        stock:0
    })
    const{codigo, nombre, descripcion, precioVentaActual, stock} = producto

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setProducto({...producto, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/agt-app/productos";
        await axios.post(urlBase, producto);
        // Redirigimos a la pagina de inicio
        navegacion('/inventario');
    }


  return (

       <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar Producto</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="codigo" className="form-label">Código</label>
            <input type="text" className="form-control" 
            id="codigo" name='codigo' required={true}
            value={codigo} onChange={(e)=>onInputChange(e)}/> 
        </div>
        <div className="mb-3">
            <label htmlFor="nombre" 
                className="form-label">Nombre</label>
            <input type="text" className="form-control" 
            id="nombre" name='nombre' required={true}
            value={nombre} onChange={(e)=>onInputChange(e)}/>
        </div>
         <div className="mb-3">
            <label htmlFor="descripcion" 
                className="form-label">Descripcion</label>
            <input type="text" className="form-control" 
            id="descripcion" name='descripcion' 
            value={descripcion} onChange={(e)=>onInputChange(e)}/>
        </div>
         <div className="mb-3">
            <label htmlFor="precioVentaActual" 
                className="form-label">Valor Unitario</label>
            <input type="number" step="1" min="0" className="form-control" 
            id="precioVentaActual" name='precioVentaActual'
            value={precioVentaActual} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="stock" 
                className="form-label">Stock</label>
            <input type="number" min="0" step="1" className="form-control"     
            id="stock" name='stock'
            value={stock} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className='text-center'>
            <button type="submit" 
                className="btn btn-warning btn-sm me-3">Agregar</button>
            <a href='/inventario' className='btn btn-danger btn-sm'>Regresar</a>    
        </div>
        </form>
    </div>
  )
}
