/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table, Alert, Badge } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getRequestNotificationToCourier from '../../services/getRequestNotificationToCourier';
export default function PickupsTable() {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRequestNotificationToCourier()
            .then(response => {
                setAlerts(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    let listPickups = alerts.filter(alert => alert.message.includes('domicilio ') === true)
    // console.log(listPickups)

    return (
        <div>
            <BreadCrumbsCeluparts />
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de Domicilios</CardTitle>
                    <hr />

                    {
                        listPickups.length === 0 ?
                            <Alert color="danger">
                                No hay domicilios pendientes
                            </Alert>
                            :
                            <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                <thead>
                                    <tr>
                                        <th>Mensaje</th>
                                        <th>Visto por mensajero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listPickups.map((alert, index) => (
                                        <tr key={index}>
                                            <td>{alert.message}</td>
                                            <td>{
                                                alert.wasReviewed ?
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <Badge color="success" pill>Si</Badge>
                                                    </div>
                                                    :
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <Badge color="danger" pill>No</Badge>
                                                    </div>
                                            }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                    }
                </CardBody>
            </Card>
        </div>
    )
}
