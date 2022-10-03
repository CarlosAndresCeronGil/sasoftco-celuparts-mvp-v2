/* eslint-disable */
import React, { useEffect, useState } from 'react'
// import { Button, Card, CardBody, CardTitle, Table, Form } from "reactstrap";
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Table,
    FormText,
    Button,
    InputGroup,
    InputGroupText,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormFeedback,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
// import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getRequestRepairs from '../../services/getRequestRepairs';
import ComponentCard from '../../components/ComponentCard';
import getSingleRequest from '../../services/getSingleRequest';

export default function RepairRequestsTable() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    // const [listOfAutoDiagnosis, setListOfAutoDiagnosis] = useState([])
    const [currentAutoDiagnosis, setCurrentAutoDiagnosis] = useState('')
    const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState('')
    const [currentPickUpAddress, setCurrentPickUpAdress] = useState('')
    const [currentEquipmentData, setCurrentEquipmentData] = useState('')
    const [currentImeiOrSerial, setCurrentImeiOrSerial] = useState('')

    const [modal, setModal] = useState(false);

    const [initialDate, setInitialDate] = useState({ initialDate: null })
    const [finalDate, setFinalDate] = useState({ finalDate: null })

    useEffect(function () {
        setLoading(true)
        getRequestRepairs({ page })
            .then((response) => {
                console.log(response)
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

    const toggle = () => {
        setModal(!modal);
    };

    const handleViewClick = ({ autoDiagnosis, deliveryAddress, pickUpAddress, equipmentData, imeiOrSerial }) => {
        setModal(!modal);
        setCurrentAutoDiagnosis(autoDiagnosis)
        setCurrentDeliveryAddress(deliveryAddress)
        setCurrentPickUpAdress(pickUpAddress)
        setCurrentEquipmentData(equipmentData)
        setCurrentImeiOrSerial(imeiOrSerial)
    }

    return (
        loading ? <div>Cargando...</div> :
            <div>
                {/* <Card> */}
                {/* <CardBody> */}
                <ComponentCard title="Lista de reparaciones registradas en el sistema">
                    <Form onSubmit={handleSubmit}>
                        <div className='container'>
                            {/* <div className='row'>
                                    <label className='col-3 col-sm-2 form-label align-self-center'>
                                        Consultar por fechas:
                                    </label>
                                    <label className='px-1 col-1 form-label align-self-center'>
                                        Desde:
                                    </label>
                                    <div className='col-2 form-label align-self-center'>
                                        <DatePicker
                                            id='initialDate'
                                            dateFormat="yyyy-MM-dd"
                                            value={initialDate.initialDate}
                                            selected={initialDate.initialDate}
                                            onChange={(date) => setInitialDate({ initialDate: date })}
                                            showDisabledMonthNavigation
                                        />
                                    </div>
                                    <label className='px-1 col-1 form-label align-self-center'>
                                        Hasta:
                                    </label>
                                    <div className='col-2 form-label align-self-center'>
                                        <DatePicker
                                            id='finalDate'
                                            dateFormat="yyyy-MM-dd"
                                            value={finalDate.finalDate}
                                            selected={finalDate.finalDate}
                                            onChange={(date) => setFinalDate({ finalDate: date })}
                                            showDisabledMonthNavigation
                                        />

                                    </div>
                                    <div className='col-sm-3 form-label align-self-center'>
                                        <Button>
                                            Consultar
                                        </Button>
                                    </div>
                                </div> */}
                            <FormGroup>
                                <Row>
                                    <Label sm="2">Consultar por fechas</Label>
                                    <Label sm="1">Desde</Label>
                                    <Col sm="4">
                                        <div className="customDatePickerWidth">
                                            <DatePicker
                                            wrapperClassName='w-50'
                                                id='initialDate'
                                                dateFormat="yyyy-MM-dd"
                                                value={initialDate.initialDate}
                                                selected={initialDate.initialDate}
                                                onChange={(date) => setInitialDate({ initialDate: date })}
                                                showDisabledMonthNavigation
                                            />
                                        </div>
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
                </ComponentCard>
                {/* <Card> */}
                {/* <CardBody> */}
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
                                <th>Detalles de la solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.requests.map((tdata, index) => (
                                tdata.requestType === "Reparacion" ? (
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
                                                                <Button type='button' className="btn" color='primary'>Actualizar</Button>
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
                                                                <Button className='btn' color='primary'>
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
                                                equipmentData: tdata.equipment.equipmentBrand + " " + tdata.equipment.modelOrReference,
                                                imeiOrSerial: tdata.equipment.imeiOrSerial
                                            }).bind(null)} >
                                                Detalles
                                            </Button>
                                        </td>
                                    </tr>
                                ) : (
                                    null
                                )
                            ))}
                            {/* TERMINA EL MAP */}
                        </tbody>
                    </Table>
                    {
                        <div>
                            Página número: {requests.currentPage} de { requests.pages === 0 ? 1 : requests.pages }
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
                            <div>
                                <span className='fw-bold'>
                                    Dirección de recogida:
                                </span>
                            </div>
                            {currentPickUpAddress}
                            <div>
                                <span className='fw-bold'>
                                    Dirección de entrega:
                                </span>
                            </div>
                            {currentDeliveryAddress}
                            <div>
                                <span className='fw-bold'>
                                    Detalle de la solicitud:
                                </span>
                            </div>
                            {currentAutoDiagnosis}
                            <div>
                                <span className='fw-bold'>
                                    Imei o serial del Dispositivo:
                                </span>
                            </div>
                            {currentImeiOrSerial}
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
