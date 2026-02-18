import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListadoProveedores() {
    const urlBase = "http://localhost:8080/agt-app/proveedores";

    const[proveedores, setProveedores] = useState([]);

    useEffect(() => {
        cargarProveedor();
    }, []);

    const cargarProveedor = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar proveedores");
        console.log(resultado.data);
        setProveedores(resultado.data);
    }
    const eliminarProveedor = async (id) => {
        await axios.delete(`${urlBase}/${id}`); //realiza la solicitud al backend
        cargarProveedor(); //recarga la vista despues de eliminar
    }

  return (
    <div>
        <div className="container text-center mb-4" >
            <h3>PROVEEDORES</h3>
        </div>
        <table className="table table-striped table-hover align-middle mx-auto" style={{ maxWidth: "90%" }}>
        <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Contacto</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Direccion</th>
            <th></th>
            
            </tr>
        </thead>
        <tbody>
            {
            //Iteramos el arreglo de proveedores
            proveedores.map((proveedor, indice) => (
                <tr key={indice}>
                <th scope="row">{proveedor.idProveedor}</th>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>{proveedor.direccion}</td>
                <td>
                    <div  style={{ display: 'flex', gap: '0.5rem'}}>
                        <Link to={`/proveedores/editar/${proveedor.idProveedor}`}
                        className='btn btn-warning btn-sm ' style={{ flexShrink: 0 }}>Editar</Link>
                        <button
                            onClick ={()=> eliminarProveedor(proveedor.idProveedor)}
                            className ='btn btn-danger btn-sm' style={{ flexShrink: 0 }}
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
