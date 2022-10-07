/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getRequestNotificationToAdmin from '../../services/getRequestNotificationToAdmin';
import putRequestNotification from '../../services/putRequestNotification';

export default function AdminAlerts() {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRequestNotificationToAdmin()
            .then(response => {
                setAlerts(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
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
        getRequestNotificationToAdmin()
            .then(data => {
                setAlerts(data)
            })
            .catch(error => console.log(error))
    }, [ loading ])

    return (
        <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                <i className="bi bi-bell me-2"> </i>
                Alertas de solicitudes para vender productos
            </CardTitle>
            <CardBody>                    
                {
                    alerts.length == 0 ? (
                        <Alert color='danger'>
                            <p>No tienes notificaciones.</p>
                        </Alert>
                    ) : (

                    alerts.map((tdata, index) => (
                        tdata.notificationType === "to_admin" &&
                        tdata.wasReviewed === false ? 
                           <Alert color="success" key={index}>
                               {tdata.message}
                               <span className="float-end text-muted">
                                   Nueva
                               </span>
                           </Alert>
                           :
                           <Alert color="primary" key={index}>
                               {tdata.message}
                           </Alert>
                    )))
                }
            </CardBody>
        </Card>
    )
}
