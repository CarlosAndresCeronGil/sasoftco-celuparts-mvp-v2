/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getSiigoPriceLists from '../../services/getSiigoPriceLists'

export default function SiigoPriceListsTable() {
    const [siigoPriceLists, setSiigoPriceLists] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoPriceLists()
            .then(response => {
                // console.log(response)
                setSiigoPriceLists(response)
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
                <BreadCrumbsCeluparts breadcrumbName="Lista de precios"/>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de precios registrados en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoPriceLists.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Nombre</th>
                                            <th>Estado</th>
                                            <th>Posición</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoPriceLists.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.active ? <div>Activo</div> : <div>Inactivo</div>}</td>
                                                <td>{tdata.position}</td>
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
