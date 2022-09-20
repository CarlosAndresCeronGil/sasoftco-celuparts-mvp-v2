/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRepairs from '../../services/getRepairs';

export default function RepairTable() {
    const [repairs, setRepairs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        getRepairs()
            .then((response) => {
                setRepairs(response)
                console.log(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }, [setRepairs])

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de reparaciones</CardTitle>

                        <hr />

                        <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Técnico asociado</th>
                                    <th>Fecha de reparación</th>
                                    <th>Diagnositco del dispositivo</th>
                                    <th>Cuota de reparación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {repairs.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>
                                            <span className="text-muted">{tdata.idRepair}</span>
                                        </td>
                                        <td>
                                            { tdata.technician ? tdata.technician.names + " " + tdata.technician.surnames : 'Sin técnico asociado' }
                                        </td>
                                        {
                                            tdata.repairDate ? (
                                                <td>
                                                    {tdata.repairDate}
                                                </td>
                                            ) : (
                                                <td>
                                                    El producto aún no ha sido reparado
                                                </td>
                                            )
                                        }
                                        <td>{tdata.deviceDiagnostic}</td>
                                        <td>{tdata.repairQuote}</td>
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
