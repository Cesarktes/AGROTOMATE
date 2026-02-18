import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarUsuario() {

    let navegacion = useNavigate();

    
    const [Usuario, setUsuario]=useState({
        nombre:"",
        correo:"",
        contrasena:"",
        rol:"",
    })

    const{nombre, correo, contrasena, rol} = Usuario

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setUsuario({...Usuario, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(Usuario)
        const urlBase = "http://localhost:8080/agt-app/usuarios";
        await axios.post(urlBase, Usuario);
        // Redirigimos a la pagina de inicio
        navegacion('/usuarios');
    }


  return (
       <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar Usuario</h3>
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
            <label htmlFor="correo" 
                className="form-label">Email</label>
            <input type="email" className="form-control" 
            id="correo" name='correo' required={true}
            value={correo} onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="contrasena" 
                className="form-label">Contraseña</label>
            <input type="password" className="form-control" 
            id="contrasena" name='contrasena' required
            value={contrasena} onChange={(e)=>onInputChange(e)} />
        </div>

        <div className="mb-3">
            <label htmlFor="rol" className="form-label">Rol del usuario</label>
            {/*lista desplegable*/}
            <select 
                id="rol" name="rol" className="form-select" required
                value={rol} onChange={(e)=>onInputChange(e)}>
            
                <option value="">Seleccione un rol</option>
                <option value="ADMIN">Administrador</option>
                <option value="SUPERVISOR">Supervisor</option>
                <option value="EMPLEADO">Empleado</option>
                <option value="CLIENTE">Cliente</option>

            </select>
        </div>



        <div className='text-center'>
            <button type="submit" 
                className="btn btn-warning btn-sm me-3">Agregar</button>
            <a href='/usuarios' className='btn btn-danger btn-sm'>Regresar</a>    
        </div>
        </form>
    </div>

  )
}

