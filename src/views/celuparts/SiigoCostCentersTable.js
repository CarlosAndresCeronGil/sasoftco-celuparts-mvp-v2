/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getSiigoCostCenters from '../../services/getSiigoCostCenters'

export default function SiigoUsersTable() {
    const [loading, setLoading] = useState(false)
    const [siigoCostCenters, setSiigoCostCenters] = useState([])

    useEffect(function () {
        setLoading(true)
        getSiigoCostCenters()
            .then(response => {
                // console.log(response)
                setSiigoCostCenters(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setLoading])

    return (
        loading ? <div> Cargando... </div> : (
            <div>
                <BreadCrumbsCeluparts breadcrumbName="Lista de centros de costos registrados en SIIGO" />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de centros de costo registrados en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoCostCenters?.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoCostCenters?.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.id}</td>
                                                <td>{tdata.code}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.active ? <div>Activo</div> : <div>Inactivo</div>}</td>
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
