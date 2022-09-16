/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSiigoUsers from '../../services/getSiigoUsers'

export default function SiigoUsersTable() {
    const [siigoUsers, setSiigoUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoUsers()
            .then(response => {
                console.log(response.results)
                setSiigoUsers(response.results)
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
                        <CardTitle tag="h5">Lista de usuarios registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Identification</th>
                                    <th>Nombre de usuario</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siigoUsers.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.identification}</td>
                                        <td>{tdata.username}</td>
                                        <td>{tdata.first_name}</td>
                                        <td>{tdata.last_name}</td>
                                        <td>{tdata.email}</td>
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
