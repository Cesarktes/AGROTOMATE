import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListadoClientes() {
  const urlBase = "http://localhost:8080/agt-app/clientes";

    const[clientes, setClientes] = useState([]);

    useEffect(() => {
        cargarCliente();
    }, []);

    const cargarCliente = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar clientes");
        console.log(resultado.data);
        setClientes(resultado.data);
    }
    const eliminarCliente = async (id) => {
        await axios.delete(`${urlBase}/${id}`); //realiza la solicitud al backend
        cargarCliente(); //recarga la vista despues de eliminar
    }

  return (
     <div>
    <div className="container text-center mb-4">
      <h3>CLIENTES</h3>
    </div>

    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mx-auto" style={{ maxWidth: "90%" }}>
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Email</th>
            <th scope="col">Direccion</th>
            <th scope="col">Fecha Registro</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map((cliente, indice) => (
              <tr key={indice}>
                <th scope="row">{cliente.idCliente}</th>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td >{cliente.direccion}</td>
                <td>{cliente.fechaRegistro}</td>
                <td>
                  <div  style={{ display: 'flex', gap: '0.5rem'}}>
                    <Link to={`/clientes/editar/${cliente.idCliente}`} 
                    className='btn btn-warning btn-sm ' style={{ flexShrink: 0 }}>Editar</Link>
                    <button onClick={() => eliminarCliente(cliente.idCliente)} 
                    className='btn btn-danger btn-sm' style={{ flexShrink: 0 }}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
)
}