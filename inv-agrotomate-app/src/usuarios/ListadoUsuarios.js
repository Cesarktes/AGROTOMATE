import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListadoUsuarios() {
  const urlBase = "http://localhost:8080/agt-app/usuarios";

    const[usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarUsuario();
    }, []);

    const cargarUsuario = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar usuarios");
        console.log(resultado.data);
        setUsuarios(resultado.data);
    }
    const eliminarUsuario = async (id) => {
        await axios.delete(`${urlBase}/${id}`); //realiza la solicitud al backend
        cargarUsuario(); //recarga la vista despues de eliminar
    }

  return (
    <div>
        <div className="container text-center mb-4" >
            <h3>USUARIOS</h3>
        </div>
        <table className="table table-striped table-hover align-middle mx-auto" style={{ maxWidth: "90%" }}>
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
            //Iteramos el arreglo de usuarios
            usuarios.map((usuario, indice) => (
                <tr key={indice}>
                <th scope="row">{usuario.idUsuario}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>                
                <td>{usuario.rol}</td>
                <td>
                    <div>
                        <Link to={`/usuarios/editar/${usuario.idUsuario}`}
                        className='btn btn-warning btn-sm me-3'>Editar</Link>
                        <button
                            onClick ={()=> eliminarUsuario(usuario.idUsuario)}
                            className ='btn btn-danger btn-sm'
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
