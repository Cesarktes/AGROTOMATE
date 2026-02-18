import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarProveedor() {

    let navegacion = useNavigate();

    
    const [Proveedor, setProveedor]=useState({
        nombre:"",
        contacto:"",
        telefono:"",
        email:"",
        direccion:"",
    })

    const{nombre, contacto, telefono, email, direccion} = Proveedor

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setProveedor({...Proveedor, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/agt-app/proveedores";
        await axios.post(urlBase, Proveedor);
        // Redirigimos a la pagina de inicio
        navegacion('/proveedores');
    }


  return (
    
       <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar Proveedor</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="nombre" 
                className="form-label">Nombre</label>
            <input type="text" className="form-control" 
            id="nombre" name='nombre' required={true}
            value={nombre} onChange={(e)=>onInputChange(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="contacto" 
                className="form-label">Contacto</label>
            <input type="text" className="form-control" 
            id="contacto" name='contacto' required={true}
            value={contacto} onChange={(e)=>onInputChange(e)}/>
        </div>
         <div className="mb-3">
            <label htmlFor="telefono" 
                className="form-label">Telefono</label>
            <input type="text" className="form-control" 
            id="telefono" name='telefono'
            value={telefono} onChange={(e)=>onInputChange(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="email" 
                className="form-label">Email</label>
            <input type="email" className="form-control" 
            id="email" name='email' required={true}
            value={email} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="direccion" 
                className="form-label">Direccion</label>
            <input type="text" className="form-control" 
            id="direccion" name='direccion' 
            value={direccion} onChange={(e)=>onInputChange(e)}/>
        </div>

        <div className='text-center'>
            <button type="submit" 
                className="btn btn-warning btn-sm me-3">Agregar</button>
            <a href='/proveedores' className='btn btn-danger btn-sm'>Regresar</a>    
        </div>
        </form>
    </div>

  )
}
