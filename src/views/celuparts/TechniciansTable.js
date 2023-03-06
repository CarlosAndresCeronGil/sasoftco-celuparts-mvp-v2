/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getTechnicians from '../../services/getTechnicians'

export default function TechniciansTable() {
    const [technicians, setTechnicians] = useState([])

    useEffect(function() {
        getTechnicians()
            .then((response) => {
                // console.log(response)
                setTechnicians(response)
            }
        )
    }, [])

    return (
        <div>
            <BreadCrumbsCeluparts breadcrumbName="Lista de técnicos "/>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de técnicos</CardTitle>

                    <hr/>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
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
                                    <td>
                                        {tdata.accountStatus === "Cerrada" ? (
                                            <div className='d-flex align-items-center'>
                                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3">{tdata.AccountStatus}</span>
                                                <span className="d-inline-block ms-3">{tdata.accountStatus}</span>
                                            </div>
                                        ) : tdata.accountStatus === "Inhabilitada" ? (
                                            <div className='d-flex align-items-center'>
                                                <span className="p-2 bg-warning rounded-circle d-inline-block ms-3">{tdata.AccountStatus}</span>
                                                <span className="d-inline-block ms-3">{tdata.accountStatus}</span>
                                            </div>
                                        ) : (
                                            <div className='d-flex align-items-center'>
                                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3">{tdata.AccountStatus}</span>
                                                <span className="d-inline-block ms-3">{tdata.accountStatus}</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
