/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Table,
    FormText,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import getRequestRetomas from '../../services/getRequestRetomas';
import 'react-datepicker/dist/react-datepicker.css';
import ComponentCard from '../../components/ComponentCard';

export default function RetomaRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const [currentAutoDiagnosis, setCurrentAutoDiagnosis] = useState('')
    const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState('')
    const [currentPickUpAddress, setCurrentPickUpAdress] = useState('')
    const [currentEquipmentData, setCurrentEquipmentData] = useState('')

    const [modal, setModal] = useState(false);

    const [initialDate, setInitialDate] = useState({ initialDate: null })
    const [finalDate, setFinalDate] = useState({ finalDate: null })

    useEffect(function () {
        setLoading(true)
        getRequestRetomas({ page })
            .then((response) => {
                setRequests(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setRequests, page])

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

            getRequestRetomas({ page: 1, initialDate: formattedInitialDate, finalDate: formattedFinallDate })
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

            getRequestRetomas({ page: 1, initialDate: formattedInitialDate })
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

            getRequestRetomas({ page: 1, finalDate: formattedFinallDate })
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

    const handleViewClick = ({ autoDiagnosis, deliveryAddress, pickUpAddress, equipmentData }) => {
        setModal(!modal);
        setCurrentAutoDiagnosis(autoDiagnosis)
        setCurrentDeliveryAddress(deliveryAddress)
        setCurrentPickUpAdress(pickUpAddress)
        setCurrentEquipmentData(equipmentData)
    }

    return (
        loading ? (
            <div>Cargando...</div>
        ) :
            <div>
                <ComponentCard title="Lista de retomas registradas en el sistema">
                    <Form onSubmit={handleSubmit}>
                        <div className='container'>
                            <FormGroup>
                                <Row>
                                    <Label sm="2">Consultar por fechas</Label>
                                    <Label sm="1">Desde</Label>
                                    <Col sm="4">
                                        <DatePicker
                                            id='initialDate'
                                            dateFormat="yyyy-MM-dd"
                                            value={initialDate.initialDate}
                                            selected={initialDate.initialDate}
                                            onChange={(date) => setInitialDate({ initialDate: date })}
                                            showDisabledMonthNavigation
                                        />
                                    </Col>
                                    <Label sm="1">Hasta</Label>
                                    <Col sm="4">
                                        <DatePicker
                                            id='finalDate'
                                            dateFormat="yyyy-MM-dd"
                                            value={finalDate.finalDate}
                                            selected={finalDate.finalDate}
                                            onChange={(date) => setFinalDate({ finalDate: date })}
                                            showDisabledMonthNavigation
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Button>
                                Consultar
                            </Button>
                        </div>
                    </Form>
                    {/* <Form onSubmit={handleSubmit}>
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
                    </Form> */}
                </ComponentCard>
                <ComponentCard title="Resultados">
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Nombre cliente</th>
                                <th>Fecha solicitud</th>
                                {/* <th>Dispositivo</th>
                                <th>Dirección recogida</th>
                                <th>Dirección entrega</th> */}
                                <th>Estado de cotización</th>
                                <th>Estado de solicitud</th>
                                <th>Actualizar estado Solicitud</th>
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                        null
                                    ) : (
                                        <th>Actualizar diagnostico para retoma</th>
                                    )
                                }
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "admin" ? (
                                        <th>Actualizar pago retoma</th>
                                    ) : (
                                        null
                                    )
                                }
                                <th>Detalles de la solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.requests?.map((tdata, index) => (
                                tdata.requestType === "Retoma" ? (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.userDto.names} {tdata.userDto.surnames}</td>
                                        <td>{`${new Date(tdata.requestDate).getFullYear()}-${new Date(tdata.requestDate).getMonth() + 1}-${new Date(tdata.requestDate).getDate()}`}</td>
                                        {/* <td>{tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}</td>
                                        <td>{tdata.pickUpAddress}</td>
                                        <td>{tdata.deliveryAddress}</td> */}
                                        <td>{tdata.statusQuote}</td>
                                        <td>{tdata.requestStatus[0].status}</td>
                                        <td>
                                            <Link to={`/home/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}>
                                                <Button className="btn" color='primary'>Actualizar</Button>
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
                                                            <button className="btn btn-secondary" disabled>Actualizar</button>
                                                        ) : (
                                                            <Link to={`/home/update-retoma-form/${tdata.retoma[0].idRetoma}`}>
                                                                <Button className="btn" color='primary'>Actualizar</Button>
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
                                                            <Link to={`/home/retoma-payment-form/${tdata.retoma[0].retomaPayments[0].idRetomaPayment}`}>
                                                                <Button className='btn' color='primary' type='button'>
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
                                            <Button className='btn' color='info' type='button' onClick={() => handleViewClick({
                                                autoDiagnosis: tdata.autoDiagnosis,
                                                deliveryAddress: tdata.deliveryAddress,
                                                pickUpAddress: tdata.pickUpAddress,
                                                equipmentData: tdata.equipment.equipmentBrand + " " + tdata.equipment.modelOrReference
                                            }).bind(null)} >
                                                Detalles
                                            </Button>
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
                            Página número: { requests.currentPage } de { requests.pages === 0 ? 1 : requests.pages }
                        </div>
                    }
                    <div className='d-flex justify-content-between'>
                        {
                            requests.currentPage === 1 ?
                                <button className="btn btn-celuparts-dark-blue" disabled>Anterior</button>
                                : <Button className="btn" color='primary' onClick={handlePrevious}>Anterior</Button>
                        }
                        {
                            
                            requests.currentPage === requests.pages || requests.currentPage === requests.pages + 1 ?
                                <button className="btn btn-celuparts-dark-blue" disabled>Siguiente</button>
                                : <Button className="btn" color='primary' onClick={handleNext}>Siguiente</Button>
                        }
                    </div>
                    <Modal isOpen={modal} toggle={handleViewClick.bind(null)}>
                        <ModalHeader toggle={handleViewClick.bind(null)}>
                            Detalles de la solicitud
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <span className='fw-bold'>
                                    Dispositivo:
                                </span>
                            </div>
                            {currentEquipmentData}
                            <hr />
                            <div>
                                <span className='fw-bold'>
                                    Dirección de recogida:
                                </span>
                            </div>
                            {currentPickUpAddress}
                            <hr />
                            <div>
                                <span className='fw-bold'>
                                    Dirección de entrega:
                                </span>
                            </div>
                            {currentDeliveryAddress}
                            <hr />
                            <div>
                                <span className='fw-bold'>
                                    Detalle de la solicitud:
                                </span>
                            </div>
                            {currentAutoDiagnosis}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleViewClick.bind(null)}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </ComponentCard>
            </div>
    )
}
