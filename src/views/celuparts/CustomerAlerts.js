/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getRequestNotificationByIdUserDto from '../../services/getRequestNotificationByIdUserDto'
import putRequestNotification from '../../services/putRequestNotification';

export default function CustomerAlerts() {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true)
        getRequestNotificationByIdUserDto({ idUserDto: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                setLoading(false)
                setAlerts(response)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [])

    let wasNotRevieweds = alerts.filter(alert => alert.wasReviewed == false) 

    const updateAlerts = wasNotRevieweds.map(( alert ) => {
            return (
                {
                    ...alert,
                    wasReviewed: true
                }
            )
    })

    useEffect(() => {
        updateAlerts.forEach((alert) => {
            putRequestNotification(alert)
                .then(response => {
                    return
                })
                .catch(error => {
                    console.log(error)
                })
        })
        getRequestNotificationByIdUserDto({ idUserDto: JSON.parse(localStorage.getItem('user')).idUser })
        .then(data => {
                setAlerts(data)
            })
            .catch(error => console.log(error))
    }, [ loading ])

    console.log("alerts", alerts)

    return (
        loading ? <div>Cargando ...</div> :
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
                            tdata.notificationType === "to_customer" ?
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
    )
}
