/* eslint-disable */
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Calendar } from 'react-feather';
import React, { useEffect, useState } from 'react'
// import getRequestNotificationToAdmin from '../../services/getRequestNotificationToAdmin';
import getRequestNotificationToAdminFirstThree from '../../services/getRequestNotificationToAdminFirstThree'

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

const NotificationAdminDD = () => {

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRequestNotificationToAdminFirstThree()
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
        loading ? <div>Cargando...</div> :
        <div>
            <ListGroup flush>
                {
                    // alerts.length == 0 ? (
                    //     <ListGroupItem key={index}>
                    //     <div className="d-flex align-items-center gap-3 py-2">
                    //         <div
                    //         className={`circle-box md-box flex-shrink-0 bg-light-success text-success`}
                    //         >
                    //             <Calendar />
                    //         </div>
                    //         <div className='col-9'>
                    //             <h5 className="mb-0 fw-bold">No tienes notificaciones</h5>
                    //         </div>
                    //     </div>
                    // </ListGroupItem>
                    // ) : 
                    alerts.map((msg, index) => (
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

export default NotificationAdminDD;
