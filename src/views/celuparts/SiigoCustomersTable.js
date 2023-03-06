/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getSiigoCustomers from '../../services/getSiigoCustomers'
// import { Link } from "react-router-dom";

export default function SiigoCustomersTable() {
    const [siigoCustomers, setSiigoCustomers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoCustomers()
            .then(response => {
                // console.log(response)
                setSiigoCustomers(response.results)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        loading ? <div> Cargando... </div> : (
            <div>
                {/* <Link to={`/home/siigo-customer-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nuevo cliente
                    </button>
                </Link> */}
                <BreadCrumbsCeluparts breadcrumbName="Lista de clientes registrados en SIIGO"/>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de clientes registrados en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoCustomers.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Tipo de identification</th>
                                            <th>Identificación</th>
                                            <th>Tipo de persona</th>
                                            <th>Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoCustomers.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.id_type.name}</td>
                                                <td>{tdata.identification}</td>
                                                <td>{tdata.person_type}</td>
                                                <td>{tdata.name.length >= 2 ? tdata.name.join(" ") : <div>{tdata.name}</div>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )
                        }
                    </CardBody>
                </Card>
            </div>
        )
    )
}
