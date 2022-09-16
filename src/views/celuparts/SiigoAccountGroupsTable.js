/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSiigoAccountGroups from '../../services/getSiigoAccountGroups'

export default function SiigoAccountGroupsTable() {
    const [siigoAccountGroups, setSiigoAccountGroups] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoAccountGroups()
            .then(response => {
                console.log(response)
                setSiigoAccountGroups(response)
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
                        <CardTitle tag="h5">Lista de grupos de inventario registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Identification</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siigoAccountGroups.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.id}</td>
                                        <td>{tdata.name}</td>
                                        <td>{tdata.active ? <div>activo</div> : <div>Inactivo</div>}</td>
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
