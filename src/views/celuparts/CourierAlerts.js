/* eslint-disable */
import React, { useEffect, useState } from 'react'
import getRequestNotification from '../../services/getRequestNotification';
import getSingleRequestNotification from '../../services/getSingleRequestNotification';
import {
    Alert,
    // UncontrolledAlert,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import putRequestNotification from '../../services/putRequestNotification';

export default function CourierAlerts() {
    const [alerts, setAlerts] = useState([])
    const [visible, setVisible] = useState(true);

    useEffect(function () {
        getRequestNotification()
            .then(response => {
                console.log(response)
                setAlerts(response)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // const onDismiss = () => {
    //     setVisible(false);
    // };

    // const onDismiss = (id) => {
    //     console.log("entro")
    //     getSingleRequestNotification(id)
    //         .then(data => {
    //             putRequestNotification({
    //                 idRequestNotification: data.idRequestNotification,
    //                 idRequest: data.idRequest,
    //                 message: data.message,
    //                 hideNotification: true,
    //                 notificationType: data.notificationType
    //             })
    //                 .catch(error => {
    //                     console.log(error)
    //                 })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //     setVisible(false);
    // };

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
