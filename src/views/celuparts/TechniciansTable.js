import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getTechnicians from '../../services/getTechnicians'

export default function TechniciansTable() {
    const [technicians, setTechnicians] = useState([])

    useEffect(function() {
        getTechnicians()
            .then((response) => {
                console.log(response)
                setTechnicians(response)
            }
        )
    }, [])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de técnicos</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Estado cuenta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {technicians.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idTechnician}</span>
                                    </td>
                                    <td>{tdata.names} {tdata.surnames}</td>
                                    <td>{tdata.phone}</td>
                                    <td>{tdata.email}</td>
                                    <td>{tdata.accountStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
