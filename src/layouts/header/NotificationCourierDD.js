/* eslint-disable */
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Calendar } from 'react-feather';
import React, { useEffect, useState } from 'react'
import getRequestNotificationToCourierFirstThree from '../../services/getRequestNotificationToCourierFirstThree'

const messages = [
    {
        id: 2,
        iconclass: <Calendar />,
        iconbg: 'success',
        title: 'Event Today',
        desc: 'Just a reminder that you have event.',
        time: '9:10 PM',
    },
];

const NotificationCourierDD = () => {

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRequestNotificationToCourierFirstThree()
            .then(response => {
                console.log(response)
                setAlerts(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        loading ? <div>Cargando...</div> :
            <div>
                <ListGroup flush>
                    {
                        alerts.map((msg, index) => (
                            msg.notificationType === "to_courier" &&
                            <ListGroupItem key={index}>
                                <div className="d-flex align-items-center gap-3 py-2">
                                    <div
                                        className={`circle-box md-box flex-shrink-0 bg-light-success text-success`}
                                    >
                                        <Calendar />
                                    </div>
                                    <div className='col-9'>
                                        <h5 className="mb-0 fw-bold">{msg.message}</h5>
                                    </div>
                                </div>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </div>
    );
};

export default NotificationCourierDD;
