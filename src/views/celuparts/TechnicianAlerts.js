/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getRequestNotificationToTechnician from '../../services/getRequestNotificationToTechnician';
import putRequestNotification from '../../services/putRequestNotification';

export default function TechnicianAlerts() {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRequestNotificationToTechnician()
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
        getRequestNotificationToTechnician()
            .then(data => {
                setAlerts(data)
            })
            .catch(error => console.log(error))
    }, [ loading ])

    return (
        <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                <i className="bi bi-bell me-2"> </i>
                Alertas de servicio a domicilio
            </CardTitle>
            <CardBody>
                {
                    alerts.length == 0 ? (
                        <Alert color='danger'>
                            <p>No tienes notificaciones.</p>
                        </Alert>
                    ) : (

                    alerts.map((tdata, index) => (
                        tdata.notificationType === "to_technician" ?
                            <div key={index}>
                                {/* <Alert
                                color='primary'
                                isOpen={visible}
                                toggle={onDismiss({id: tdata.idRequestNotification }).bind(null)}>
                                    {tdata.message}
                                </Alert> */}
                                <Alert
                                color='primary'>
                                    {tdata.message}
                                </Alert>
                            </div> : null
                    )))
                }
            </CardBody>
        </Card>
    )
}
