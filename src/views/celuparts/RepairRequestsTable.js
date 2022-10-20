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
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';

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
    const [currentClientPhone, setCurrentClientPhone] = useState('')

    const [modal, setModal] = useState(false);

    //Variables para los filtrados
    const [initialDate, setInitialDate] = useState({ initialDate: null })
    const [finalDate, setFinalDate] = useState({ finalDate: null })
    const [requestStatus, setRequestStatus] = useState('')
    const [userDtoIdNumber, setUserDtoIdNumber] = useState('')
    const [userDtoName, setUserDtoName] = useState('')
    const [userDtoSurname, setUserDtoSurname] = useState('')
    const [equipmentBrand, setEquipmentBrand] = useState('')
    const [equipmentModel, setEquipmentModel] = useState('')

    //Variables auxiliares
    const [formattedInitialDate, setFormattedInitialDate] = useState('0001-1-1')
    const [formattedFinallDate, setFormattedFinalDate] = useState('0001-1-1')

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
        //Se consulta desde una fecha inicial hasta una fecha final
        setLoading(true)

        console.log("desde: " + formattedInitialDate + " hasta: " + formattedFinallDate)

        getRequestRepairs({ page: 1, initialDate: formattedInitialDate, finalDate: formattedFinallDate, requestStatus: requestStatus, userDtoIdNumber: userDtoIdNumber, userDtoName: userDtoName, userDtoSurname: userDtoSurname, equipmentBrand: equipmentBrand, equipmentModel: equipmentModel })
            .then((response) => {
                setRequests(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
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

    const handleViewClick = ({ autoDiagnosis, deliveryAddress, pickUpAddress, equipmentData, imeiOrSerial, clientPhone }) => {
        setModal(!modal);
        setCurrentAutoDiagnosis(autoDiagnosis)
        setCurrentDeliveryAddress(deliveryAddress)
        setCurrentPickUpAdress(pickUpAddress)
        setCurrentEquipmentData(equipmentData)
        setCurrentImeiOrSerial(imeiOrSerial)
        setCurrentClientPhone(clientPhone)
    }

    return (
        loading ? <div>Cargando...</div> :
            <div>
                <BreadCrumbsCeluparts />
                <ComponentCard title="Lista de reparaciones registradas en el sistema">
                    <Form onSubmit={handleSubmit}>
                        <div className='container'>
                            <FormGroup>
                                <Row>
                                    <Label sm="2">Consultar por fechas</Label>
                                    <Label sm="1">Desde</Label>
                                    <Col sm="4">
                                        <div className="customDatePickerWidth">
                                            <DatePicker
                                                className='form-control'
                                                id='initialDate'
                                                dateFormat="yyyy-MM-dd"
                                                value={initialDate.initialDate}
                                                selected={initialDate.initialDate}
                                                onChange={(date) => {
                                                    setFormattedInitialDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
                                                    setInitialDate({ initialDate: date })
                                                }}
                                                showDisabledMonthNavigation
                                            />
                                        </div>
                                    </Col>
                                    <Label sm="1">Hasta</Label>
                                    <Col sm="4">
                                        <DatePicker
                                            className='form-control'
                                            id='finalDate'
                                            dateFormat="yyyy-MM-dd"
                                            value={finalDate.finalDate}
                                            selected={finalDate.finalDate}
                                            onChange={(date) => {
                                                setFormattedFinalDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
                                                setFinalDate({ finalDate: date })
                                            }}
                                            showDisabledMonthNavigation
                                        />
                                    </Col>
                                </Row>
                                <Row className='mt-2'>
                                    <Label sm="2">Consultar por clientes</Label>
                                    <Label sm="1">Id</Label>
                                    <Col sm="2">
                                        <div className="userDtoIdNumber">
                                            <Input
                                                className='form-control'
                                                id='userDtoIdNumber'
                                                value={userDtoIdNumber}
                                                onChange={(e) => setUserDtoIdNumber(e.target.value)}
                                                type='text'
                                            />
                                        </div>
                                    </Col>
                                    <Label sm="2">Nombres</Label>
                                    <Col sm="2">
                                        <div className="userDtoNames">
                                            <Input
                                                className='form-control'
                                                id='userDtoNames'
                                                value={userDtoName}
                                                onChange={(e) => setUserDtoName(e.target.value)}
                                                type='text'
                                            />
                                        </div>
                                    </Col>
                                    <Label sm="1">Apellidos</Label>
                                    <Col sm="2">
                                        <div className="userDtoSurnames">
                                            <Input
                                                className='form-control'
                                                id='userDtoSurnames'
                                                value={userDtoSurname}
                                                onChange={(e) => setUserDtoSurname(e.target.value)}
                                                type='text'
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='mt-2'>
                                    <Label sm="2">Consultar por equipos</Label>
                                    <Label sm="1">Marca</Label>
                                    <Col sm="2">
                                        <div className="equipmentBrand">
                                            <Input
                                                className='form-control'
                                                id='equipmentBrand'
                                                value={equipmentBrand}
                                                onChange={(e) => setEquipmentBrand(e.target.value)}
                                                type='text'
                                            />
                                        </div>
                                    </Col>
                                    <Label sm="1">Modelo</Label>
                                    <Col sm="2">
                                        <div className="equipmentModel">
                                            <Input
                                                className='form-control'
                                                id='equipmentModel'
                                                value={equipmentModel}
                                                onChange={(e) => setEquipmentModel(e.target.value)}
                                                type='text'
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='mt-2'>
                                    <Label sm="2">Consultar por estado de solicitud</Label>
                                    <Label sm="1">Estado</Label>
                                    <Col sm="2">
                                        <div className="requestStatus">
                                            <Input
                                                className='form-control'
                                                id='requestStatus'
                                                value={requestStatus || ''}
                                                onChange={(e) => setRequestStatus(e.target.value)}
                                                type='select'
                                            >
                                                <option value=''>SIN FILTRO</option>
                                                <option>Iniciada</option>
                                                <option>En proceso de recogida</option>
                                                <option value="Recibida tecnico">Recibida técnico</option>
                                                <option>Revisado</option>
                                                <option value="En reparacion">En reparación</option>
                                                <option value="Reparado pendiente de pago">Reparado, pendiente de pago</option>
                                                <option>En camino</option>
                                                <option>Terminada</option>
                                                <option value="En devolucion">En devolución</option>
                                                <option value="Devuelto sin reparacion">Devuelto sin reparación</option>
                                                <option>Retoma</option>
                                                <option>Abandonada</option>
                                                <option>Anulado por IMEI</option>
                                            </Input>
                                        </div>
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
                                    JSON.parse(localStorage.getItem('user')).role === "admin" || JSON.parse(localStorage.getItem('user')).role === "aux_admin" ? (
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
                                            JSON.parse(localStorage.getItem('user')).role === "admin" || JSON.parse(localStorage.getItem('user')).role === "aux_admin" ? (
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
                                                imeiOrSerial: tdata.equipment.imeiOrSerial,
                                                clientPhone: tdata.userDto.phone
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
                            Página número: {requests.currentPage} de {requests.pages === 0 ? 1 : requests.pages}
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
                                    Imei o serial del Dispositivo:
                                </span>
                            </div>
                            {currentImeiOrSerial}
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
                                    Teléfono cliente:
                                </span>
                            </div>
                            {currentClientPhone}
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
