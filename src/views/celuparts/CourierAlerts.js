/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Alert,
    // UncontrolledAlert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getRequestNotificationToCourier from '../../services/getRequestNotificationToCourier';

export default function CourierAlerts() {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(false)
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

    return (
        <div>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-bell me-2"> </i>
                    Alertas de servicio a domicilio
                </CardTitle>
                <CardBody>
                    {
                        alerts.map((tdata, index) => (
                            tdata.notificationType === "to_courier" && tdata.hideNotification === false ?
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
                        ))
                    }
                </CardBody>
            </Card>
        </div>
    )
}
