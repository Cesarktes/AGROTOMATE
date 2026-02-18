import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarCliente() {

    const urlBase = "http://localhost:8080/agt-app/clientes";

    let navegacion = useNavigate();

    //se define la constante id para recuperar el valor que se recibe de url
    const {id} = useParams();

    
    const [Cliente, setCliente]=useState({
        nombre:"",
        telefono:"",
        email:"",
        direccion:"",
    })

    const{nombre, telefono, email, direccion} = Cliente

    // peticion al back para recupera el objeto tipo producto
    useEffect(()=>{
        cargarCliente();
    }, [])

    // definir metodo cargarCliente
    const cargarCliente = async () => {
    const resultado = await axios.get(`${urlBase}/${id}`)
        setCliente(resultado.data);
    }

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setCliente({...Cliente, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/agt-app/clientes";
        console.log(Cliente)
        await axios.put(`${urlBase}/${id}`, Cliente);
        // Redirigimos a la pagina de inicio
        navegacion('/clientes');
    }

  return (

        <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Editar Cliente</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="nombre" 
                className="form-label">Nombre</label>
            <input type="text" className="form-control" 
            id="nombre" name='nombre' required={true}
            value={nombre} onChange={(e)=>onInputChange(e)}/>
        </div>
         <div className="mb-3">
            <label htmlFor="telefono" 
                className="form-label">Telefono</label>
            <input type="text" className="form-control" 
            id="telefono" name='telefono'
            value={telefono} onChange={(e)=>onInputChange(e)}/>
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
            value={direccion} onChange={(e)=>onInputChange(e)} />
        </div>

        <div className='text-center'>
            <button type="submit" 
                className="btn btn-warning btn-sm me-3">Guardar</button>
            <a href='/clientes' className='btn btn-danger btn-sm'>Regresar</a>    
        </div>
        </form>
    </div>
  )
}
