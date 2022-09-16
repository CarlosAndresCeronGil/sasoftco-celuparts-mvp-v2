/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSiigoCostCenters from '../../services/getSiigoCostCenters'

export default function SiigoUsersTable() {
    const [siigoCostCenters, setSiigoCostCenters] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoCostCenters()
            .then(response => {
                console.log(response)
                setSiigoCostCenters(response)
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
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de centros de costo registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Identification</th>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siigoCostCenters.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.id}</td>
                                        <td>{tdata.code}</td>
                                        <td>{tdata.name}</td>
                                        <td>{tdata.active?<div>Activo</div>:<div>Inactivo</div>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    )
}
