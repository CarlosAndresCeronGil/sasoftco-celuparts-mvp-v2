import React, { useEffect, useState } from 'react'
import getRequestNotification from '../../services/getRequestNotification';
import {
    Alert,
    // UncontrolledAlert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import getRequestNotificationToTechnician from '../../services/getRequestNotificationToTechnician';

export default function TechnicianAlerts() {
    const [alerts, setAlerts] = useState([])

    useEffect(function () {
        getRequestNotificationToTechnician()
            .then(response => {
                console.log(response)
                setAlerts(response)
            })
            .catch(error => {
                console.log(error)
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
                        alerts?.map((tdata, index) => (
                            tdata.notificationType === "to_technician" && tdata.hideNotification === false ?
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
