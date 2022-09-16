/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSiigoPriceLists from '../../services/getSiigoPriceLists'

export default function SiigoPriceListsTable() {
    const [siigoPriceLists, setSiigoPriceLists] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoPriceLists()
            .then(response => {
                console.log(response)
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
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de precios registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
                    </CardBody>
                </Card>
            </div>
        )
    )
}
