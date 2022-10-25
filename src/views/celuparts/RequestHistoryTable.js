/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getRequestHistoryByIdRequest from '../../services/getRequestHistoryByIdRequest';
import getUsers from '../../services/getUsers';
import getUsersSimpleInfo from '../../services/getUsersSimpleInfo';

export default function RequestHistoryTable() {
    const [requestHistory, setRequestHistory] = useState([]);
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(function () {
        setLoading(true)
        getRequestHistoryByIdRequest({id: params.id})
            .then(response => {
                setLoading(false)
                setRequestHistory(response)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setRequestHistory])

    const handleBackPage = (e) => {
        navigate(-1)
    }

    return (
        loading ? <div>Cargando...</div> :
            <div>
                <Button className='btn btn-danger' onClick={handleBackPage}>
                   Atrás
                </Button>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Historial de solicitud</CardTitle>
                        <hr />
                        <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestHistory.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.status}</td>
                                        <td>
                                            {
                                                new Date(tdata.date).toLocaleDateString('es', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric" })
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
    )
}
