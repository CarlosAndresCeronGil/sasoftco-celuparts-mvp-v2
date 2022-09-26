/* eslint-disable */
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Calendar } from 'react-feather';
import React, { useEffect, useState } from 'react'
import getSingleUser from '../../services/getSingleUser';

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





const NotificationCustomerDD = () => {

    const [customerAlerts, setCustomerAlerts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getSingleUser({ id: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                console.log("response.requests", response[0].requests)
                response[0].requests.map(tdata => (
                    tdata.requestNotifications.length !== 0 ?
                        setCustomerAlerts(prev => [...prev, tdata.requestNotifications[0]])
                        : console.log("nothing")
                ))
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
                        customerAlerts.map((msg, index) => (
                            msg.notificationType === "to_customer" && index <= 2 ?
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
                            : null
                        ))
                    }
                </ListGroup>
            </div>
    );
};

export default NotificationCustomerDD;
