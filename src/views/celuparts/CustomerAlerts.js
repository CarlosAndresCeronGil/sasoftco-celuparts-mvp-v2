/* eslint-disable */
import React, { useEffect, useState } from 'react'
import getRequestNotification from '../../services/getRequestNotification';
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getSingleUser from '../../services/getSingleUser';

export default function CustomerAlerts() {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getSingleUser({ id: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                // console.log("response.requests", response[0].requests)
                response[0].requests.map(tdata => (
                    tdata.requestNotifications.length !== 0 ?
                        setAlerts(prev => [...prev, tdata.requestNotifications[0]])
                        : console.log("nothing")
                ))
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    console.log("alerts", alerts)

    return (
        loading ? <div>Cargando ...</div> :
        <div>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-bell me-2"> </i>
                    Alertas de tus solicitudes
                </CardTitle>
                <CardBody>
                    {

                        alerts.length == 0 ? (
                            <Alert color='danger'>
                                <p>No tienes notificaciones.</p>
                            </Alert>
                        ) : (
                            alerts.map((tdata, index) => (
                                tdata.notificationType === "to_customer" && tdata.wasReviewed === false ?
                                    <div key={index}>
                                        <Alert
                                            color='primary'>
                                            {tdata.message}
                                        </Alert>
                                    </div> : null
                            ))
                        )
                    }
                </CardBody>
            </Card>
        </div>
    )
}
