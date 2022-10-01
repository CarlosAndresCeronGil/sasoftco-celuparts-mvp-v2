/* eslint-disable */
import React, { useEffect, useState } from 'react'
// import getRequestNotification from '../../services/getRequestNotification';
import {
    Alert,
    // UncontrolledAlert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getRequestNotificationToAdmin from '../../services/getRequestNotificationToAdmin';

export default function AdminAlerts() {
    const [alerts, setAlerts] = useState([])

    useEffect(function () {
        getRequestNotificationToAdmin()
            .then(response => {
                // console.log(response)
                setAlerts(response)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    console.log("alerts", alerts)

    return (
        <div>
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
                            tdata.notificationType === "to_admin" && tdata.wasReviewed === false ?
                                <div key={index}>
                                    <Alert
                                    color='primary'>
                                        { 
                                            tdata.message
                                        }
                                    </Alert>
                                </div> : null
                        )))
                    }
                </CardBody>
            </Card>
        </div>
    )
}
