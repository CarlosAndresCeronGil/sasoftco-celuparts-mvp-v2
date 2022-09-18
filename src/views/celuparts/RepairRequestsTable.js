/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Table, Form } from "reactstrap";
// import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getRequestRepairs from '../../services/getRequestRepairs';

export default function RepairRequestsTable() {
    const [requests, setRequests] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const [initialDate, setInitialDate] = useState({ initialDate: null })
    const [finalDate, setFinalDate] = useState({ finalDate: null })

    useEffect(function () {
        setLoading(true)
        getRequestRepairs({ page })
            .then((response) => {
                setRequests(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [page, setRequests])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (initialDate.initialDate !== null && finalDate.finalDate !== null) {
            //Se consulta desde una fecha inicial hasta una fecha final
            setLoading(true)

            const selectedInitialDate = initialDate.initialDate
            const selectedFinalDate = finalDate.finalDate

            const formattedInitialDate = `${selectedInitialDate.getFullYear()}-${selectedInitialDate.getMonth() + 1}-${selectedInitialDate.getDate()}`
            const formattedFinallDate = `${selectedFinalDate.getFullYear()}-${selectedFinalDate.getMonth() + 1}-${selectedFinalDate.getDate()}`
            console.log("desde: " + formattedInitialDate + " hasta: " + formattedFinallDate)

            getRequestRepairs({ page: 1, initialDate: formattedInitialDate, finalDate: formattedFinallDate })
                .then((response) => {
                    setRequests(response)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
        } else if (initialDate.initialDate !== null && finalDate.finalDate === null) {
            //Se consulta desde una fecha inicial pero sin especificar fecha final
            setLoading(true)

            const selectedInitialDate = initialDate.initialDate

            const formattedInitialDate = `${selectedInitialDate.getFullYear()}-${selectedInitialDate.getMonth() + 1}-${selectedInitialDate.getDate()}`
            console.log("desde: " + formattedInitialDate)

            getRequestRepairs({ page: 1, initialDate: formattedInitialDate })
                .then((response) => {
                    setRequests(response)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
        } else if (initialDate.initialDate === null && finalDate.finalDate !== null) {
            //Se consulta desde una fecha final sin especificar fecha inicial
            setLoading(true)

            const selectedFinalDate = finalDate.finalDate

            const formattedFinallDate = `${selectedFinalDate.getFullYear()}-${selectedFinalDate.getMonth() + 1}-${selectedFinalDate.getDate()}`
            console.log(" hasta: " + formattedFinallDate)

            getRequestRepairs({ page: 1, finalDate: formattedFinallDate })
                .then((response) => {
                    setRequests(response)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })
        }
    }

    const handleNext = () => {
        setPage(currentPage => currentPage + 1);
    }

    const handlePrevious = () => {
        setPage(currentPage => currentPage - 1);
    }

    return (
        loading ? <div>Cargando...</div> :
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de reparaciones registradas en el sistema</CardTitle>
                        <Form onSubmit={handleSubmit}>
                            Consultar por fechas
                            <div className='d-flex-column justify-content-start'>
                                Desde:
                                <DatePicker
                                    id='initialDate'
                                    dateFormat="yyyy-MM-dd"
                                    value={initialDate.initialDate}
                                    selected={initialDate.initialDate}
                                    onChange={(date) => setInitialDate({ initialDate: date })}
                                    showDisabledMonthNavigation
                                />
                                Hasta:
                                <DatePicker
                                    id='finalDate'
                                    dateFormat="yyyy-MM-dd"
                                    value={finalDate.finalDate}
                                    selected={finalDate.finalDate}
                                    onChange={(date) => setFinalDate({ finalDate: date })}
                                    showDisabledMonthNavigation
                                />
                            </div>
                            <Button>
                                Consultar
                            </Button>
                        </Form>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Nombre cliente</th>
                                    <th>Fecha solicitud</th>
                                    <th>Dispositivo</th>
                                    <th>Dirección recogida</th>
                                    <th>Dirección entrega</th>
                                    <th>Estado de cotización</th>
                                    <th>Estado de solicitud</th>
                                    <th>Actualizar estado Solicitud</th>
                                    {
                                        JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                            null
                                        ) : (
                                            <th>Actualizar estado Reparación</th>
                                        )
                                    }
                                    {
                                        JSON.parse(localStorage.getItem('user')).role === "admin" ? (
                                            <th>Actualizar pago reparación</th>
                                        ) : (
                                            null
                                        )
                                    }
                                    <td>Observaciones del cliente</td>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.requests.map((tdata, index) => (
                                    tdata.requestType === "Reparacion" ? (
                                        <tr key={index} className="border-top">
                                            <td>{tdata.userDto.names} {tdata.userDto.surnames}</td>
                                            <td>{`${new Date(tdata.requestDate).getFullYear()}-${new Date(tdata.requestDate).getMonth() + 1}-${new Date(tdata.requestDate).getDate()}`}</td>
                                            <td>{tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}</td>
                                            <td>{tdata.pickUpAddress}</td>
                                            <td>{tdata.deliveryAddress}</td>
                                            <td>{tdata.statusQuote}</td>
                                            <td>{tdata.requestStatus[0].status}</td>
                                            <td>
                                                <Link to={`/home/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}>
                                                    <Button type='button' className="btn" color='primary'>Actualizar</Button>
                                                </Link>
                                            </td>
                                            {
                                                JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                                    null
                                                ) : (
                                                    <td>
                                                        {
                                                            tdata.requestStatus[0].status === 'Iniciada' ||
                                                                tdata.requestStatus[0].status === 'En proceso de recogida' ||
                                                                tdata.requestStatus[0].status === 'Recibida tecnico' ||
                                                                tdata.requestStatus[0].status === 'En devolucion' ||
                                                                tdata.requestStatus[0].status === 'Devuelto sin reparacion' ||
                                                                tdata.requestStatus[0].status === 'Abandonada' ||
                                                                tdata.requestStatus[0].status === 'Terminada' ||
                                                                tdata.requestStatus[0].status === 'En camino' ? (
                                                                <button type='button' className="btn btn-secondary" disabled>Actualizar</button>
                                                            ) : (
                                                                <Link to={`/home/update-repair-form/${tdata.repairs[0].idRepair}`}>
                                                                    <Button type='button' className="btn btn-celuparts-black">Actualizar</Button>
                                                                </Link>
                                                            )
                                                        }
                                                    </td>
                                                )
                                            }
                                            {
                                                JSON.parse(localStorage.getItem('user')).role === "admin" ? (
                                                    <td>
                                                        {
                                                            tdata.requestStatus[0].status === 'Iniciada' ||
                                                                tdata.requestStatus[0].status === 'En proceso de recogida' ||
                                                                tdata.requestStatus[0].status === 'Recibida tecnico' ||
                                                                tdata.requestStatus[0].status === 'En devolucion' ||
                                                                tdata.requestStatus[0].status === 'Devuelto sin reparacion' ||
                                                                tdata.requestStatus[0].status === 'Abandonada' ||
                                                                tdata.requestStatus[0].status === 'Terminada' ||
                                                                tdata.requestStatus[0].status === 'En camino' ? (
                                                                <button className='btn btn-secondary' type='button' disabled>
                                                                    Actualizar
                                                                </button>
                                                            ) : (
                                                                <Link to={`/home/repair-payment-form/${tdata.repairs[0].repairPayments[0].idRepairPayment}`}>
                                                                    <Button className='btn' color='secondary' type='button'>
                                                                        Actualizar
                                                                    </Button>
                                                                </Link>
                                                            )
                                                        }
                                                    </td>
                                                ) : (
                                                    null
                                                )
                                            }
                                            <td>
                                                <Link to={`/home/equipment-detail/${tdata.idRequest}`}>
                                                    <Button className='btn' color='info' type='button'>
                                                        Ver
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        null
                                    )
                                ))}
                            </tbody>
                        </Table>
                        {
                            <div>
                                Página número: {requests.currentPage} de {requests.pages}
                            </div>
                        }
                        <div className='d-flex justify-content-between'>
                            {
                                requests.currentPage === 1 ?
                                    <button className="btn btn-celuparts-dark-blue" disabled>Anterior</button>
                                    : <Button className="btn" color='primary' onClick={handlePrevious}>Anterior</Button>
                            }
                            {
                                requests.currentPage === requests.pages ?
                                    <button className="btn btn-celuparts-dark-blue" disabled>Siguiente</button>
                                    : <Button className="btn" color='primary' onClick={handleNext}>Siguiente</Button>
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
    )
}
