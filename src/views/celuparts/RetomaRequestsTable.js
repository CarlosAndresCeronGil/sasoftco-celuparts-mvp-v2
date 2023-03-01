/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
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
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getAllBrandsDistinct from '../../services/getAllBrandsDistinct';
import getEquipmentInvoice from '../../services/getEquipmentInvoice';

export default function RetomaRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const [currentAutoDiagnosis, setCurrentAutoDiagnosis] = useState('')
    const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState('')
    const [currentPickUpAddress, setCurrentPickUpAdress] = useState('')
    const [currentEquipmentData, setCurrentEquipmentData] = useState('')
    const [currentImeiOrSerial, setCurrentImeiOrSerial] = useState('')
    const [currentClientPhone, setCurrentClientPhone] = useState('')
    const [currentDeliveryDate, setCurrentDeliveryDate] = useState('')

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
    const [listOfBrands, setListOfBrands] = useState([])

    //Variables auxiliares
    const [formattedInitialDate, setFormattedInitialDate] = useState('0001-1-1')
    const [formattedFinallDate, setFormattedFinalDate] = useState('0001-1-1')

    useEffect(function () {
        let initialDateString = localStorage.getItem("initialDateRetoma") || null;
        var initialDateAux;
        if(initialDateString != null) {
            setInitialDate({ initialDate: new Date(initialDateString) });
            initialDateAux = new Date(initialDateString);
        }

        let finalDateString = localStorage.getItem("finalDateRetoma") || null;
        var finalDateAux;
        if(finalDateString != null) {
            setFinalDate({ finalDate: new Date(finalDateString) });
            finalDateAux = new Date(finalDateString);
        }

        setRequestStatus(localStorage.getItem("requestStatusRetoma") || "");
        setUserDtoIdNumber(localStorage.getItem("userDtoIdNumberRetoma") || "");
        setUserDtoName(localStorage.getItem("userDtoNamesRetoma") || "");
        setUserDtoSurname(localStorage.getItem("userDtoSurnamesRetoma") || "");
        setEquipmentBrand(localStorage.getItem("equipmentBrandRetoma") || "");
        setEquipmentModel(localStorage.getItem("equipmentModelRetoma") || "");

        setLoading(true)
        getRequestRetomas({
            page,
            initialDate: initialDateString != null ? `${initialDateAux.getFullYear()}-${initialDateAux.getMonth() + 1}-${initialDateAux.getDate()}` : '0001-1-1',
            finalDate: finalDateString != null ? `${finalDateAux.getFullYear()}-${finalDateAux.getMonth() + 1}-${finalDateAux.getDate()}` : '0001-1-1',
            requestStatus: localStorage.getItem("requestStatusRetoma") || "",
            userDtoIdNumber: localStorage.getItem("userDtoIdNumberRetoma") || "",
            userDtoName: localStorage.getItem("userDtoNamesRetoma") || "",
            userDtoSurname: localStorage.getItem("userDtoSurnamesRetoma") || "",
            equipmentModel: localStorage.getItem("equipmentModelRetoma") || "",
            equipmentBrand: localStorage.getItem("equipmentBrandRetoma") || ""
        })
            .then((response) => {
                // Se obtiene el ultimo resultado de la ultima busqueda
                const responseGetItem = localStorage.getItem("responseTableRetoma")
                const myResponse = JSON.parse(responseGetItem)

                // Si la no hay ultima busqueda se devuelve la response, en caso contrario se deja la anterior busqueda
                myResponse != null && page == 1 ? setRequests(myResponse) : setRequests(response);
                getAllBrandsDistinct()
                    .then(responseAllBrandDistinct => {
                        setListOfBrands(responseAllBrandDistinct)
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                    })
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setRequests, page])

    const handleSubmit = (e) => {
        e.preventDefault()
        //Se consulta desde una fecha inicial hasta una fecha final
        setLoading(true)
        localStorage.setItem("userDtoIdNumberRetoma", e.target.elements.userDtoIdNumber.value)
        localStorage.setItem("userDtoNamesRetoma", e.target.elements.userDtoNames.value)
        localStorage.setItem("userDtoSurnamesRetoma", e.target.elements.userDtoSurnames.value)
        localStorage.setItem("equipmentModelRetoma", e.target.elements.equipmentModel.value)

        getRequestRetomas({
            page: 1,
            initialDate: initialDate.initialDate != null ? `${initialDate.initialDate.getFullYear()}-${initialDate.initialDate.getMonth() + 1}-${initialDate.initialDate.getDate()}` : formattedInitialDate,
            finalDate: finalDate.finalDate != null ? `${finalDate.finalDate.getFullYear()}-${finalDate.finalDate.getMonth() + 1}-${finalDate.finalDate.getDate()}` : formattedFinallDate,
            requestStatus: requestStatus, userDtoIdNumber: userDtoIdNumber, userDtoName: userDtoName, userDtoSurname: userDtoSurname, equipmentBrand: equipmentBrand, equipmentModel: equipmentModel
        })
            .then((response) => {
                setRequests(response)

                // Se manda el response al localstorage
                const responseString = JSON.stringify(response)
                localStorage.setItem("responseTableRetoma", responseString)

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

    const handleViewClick = ({ autoDiagnosis, deliveryAddress, pickUpAddress, equipmentData, imeiOrSerial, clientPhone, deliveryDate }) => {
        setModal(!modal);
        setCurrentAutoDiagnosis(autoDiagnosis)
        setCurrentDeliveryAddress(deliveryAddress)
        setCurrentPickUpAdress(pickUpAddress)
        setCurrentEquipmentData(equipmentData)
        setCurrentImeiOrSerial(imeiOrSerial)
        setCurrentClientPhone(clientPhone)
        setCurrentDeliveryDate(deliveryDate != null ? deliveryDate : 'Sin definir')
    }

    const handleCleanFilters = () => {
        setInitialDate({ initialDate: null });
        setFinalDate({ finalDate: null });
        setFormattedInitialDate('0001-1-1');
        setFormattedFinalDate('0001-1-1');
        setRequestStatus('');
        setUserDtoIdNumber('');
        setUserDtoName('');
        setUserDtoSurname('');
        setEquipmentBrand('');
        setEquipmentModel('');

        setPage(1);

        localStorage.removeItem("initialDateRetoma");
        localStorage.removeItem("finalDateRetoma");

        localStorage.removeItem("requestStatusRetoma")
        localStorage.removeItem("userDtoIdNumberRetoma")
        localStorage.removeItem("userDtoNamesRetoma")
        localStorage.removeItem("userDtoSurnamesRetoma");
        localStorage.removeItem("equipmentBrandRetoma");
        localStorage.removeItem("equipmentModelRetoma");

        localStorage.removeItem("responseTableRetoma");
    }

    const handleChangeInitialDate = (date) => {
        // setFormattedInitialDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setInitialDate({ initialDate: date })
        if(date != null) {
            let initialDateString = date.toISOString();
            localStorage.setItem("initialDateRetoma", initialDateString);
        } else {
            localStorage.removeItem("initialDateRetoma")
        }
    }

    const handleChangeFinalDate = (date) => {
        // setFormattedFinalDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        setFinalDate({ finalDate: date })
        if(date != null) {
            let finalDateString = date.toISOString();
            localStorage.setItem("finalDateRetoma", finalDateString);
        } else {
            localStorage.removeItem("finalDateRetoma");
        }
    }

    const handleViewEquipmentInvoice = (e, { idEquipment }) => {
        e.preventDefault()
        // console.log(idEquipment)
        getEquipmentInvoice({ id: idEquipment })
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        loading ? (
            <div>Cargando...</div>
        ) :
            <div>
                <BreadCrumbsCeluparts />
                <ComponentCard title="Lista de retomas registradas en el sistema">
                    <Form onSubmit={handleSubmit}>
                        <div className='container'>
                            <FormGroup>
                                <Row>
                                    <Label sm="2">Consultar por fechas</Label>
                                    <Label sm="1">Desde</Label>
                                    <Col sm="4">
                                        <DatePicker
                                            className='form-control'
                                            id='initialDate'
                                            dateFormat="yyyy-MM-dd"
                                            value={initialDate.initialDate}
                                            selected={initialDate.initialDate}
                                            onChange={(date) => handleChangeInitialDate(date)}
                                            isClearable
                                            showDisabledMonthNavigation
                                        />
                                    </Col>
                                    <Label sm="1">Hasta</Label>
                                    <Col sm="4">
                                        <DatePicker
                                            id='finalDate'
                                            className='form-control'
                                            dateFormat="yyyy-MM-dd"
                                            value={finalDate.finalDate}
                                            selected={finalDate.finalDate}
                                            onChange={(date) => handleChangeFinalDate(date)}
                                            isClearable
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
                                                onChange={(e) => {
                                                    setEquipmentBrand(e.target.value)
                                                    localStorage.setItem("equipmentBrandRetoma", e.target.value)
                                                }}
                                                type='select'
                                            >
                                                <option value=''>SIN FILTRO</option>
                                                {
                                                    listOfBrands.map((brand, index) => (
                                                        <option key={index}>{brand}</option>
                                                    ))
                                                }
                                            </Input>
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
                                                onChange={(e) => {
                                                    setRequestStatus(e.target.value)
                                                    localStorage.setItem("requestStatusRetoma", e.target.value)
                                                }}
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
                            <Button className='m-1' onClick={handleCleanFilters}>
                                Limpiar
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
                                <th>Datos equipo</th>
                                <th>Estado de cotización</th>
                                <th>Estado de solicitud</th>
                                <th>Valor de retoma</th>
                                <th>Actualizar estado Solicitud</th>
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                        null
                                    ) : (
                                        <th>Actualizar diagnostico para retoma</th>
                                    )
                                }
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "admin" || JSON.parse(localStorage.getItem('user')).role === "aux_admin" ? (
                                        <th>Actualizar pago retoma</th>
                                    ) : (
                                        null
                                    )
                                }
                                <th>Detalles de la solicitud</th>
                                <th>Ver factura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.requests.map((tdata, index) => (
                                tdata.requestType === "Retoma" ? (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.userDto.names} {tdata.userDto.surnames}</td>
                                        <td>{`${new Date(tdata.requestDate).getFullYear()}-${new Date(tdata.requestDate).getMonth() + 1}-${new Date(tdata.requestDate).getDate()}`}</td>
                                        <td>{tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}</td>
                                        {/*<td>{tdata.pickUpAddress}</td>
                                        <td>{tdata.deliveryAddress}</td> */}
                                        <td>{tdata.statusQuote}</td>
                                        <td>{tdata.requestStatus[0].status}</td>
                                        <td>{tdata.retoma[0].retomaQuote}</td>
                                        <td>
                                            <Link to={`/home/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}>
                                                <Button className="btn" color='primary'><i className="bi bi-pencil-fill"></i></Button>
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
                                                            <button className="btn btn-secondary" disabled><i className="bi bi-pencil-fill"></i></button>
                                                        ) : (
                                                            <Link to={`/home/update-retoma-form/${tdata.retoma[0].idRetoma}`}>
                                                                <Button className="btn" color='primary'><i className="bi bi-pencil-fill"></i></Button>
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
                                                            tdata.requestStatus[0].status === 'Anulado por IMEI' ||
                                                            tdata.requestStatus[0].status === 'En camino' ? (
                                                            <button className='btn btn-secondary' type='button' disabled>
                                                                <i className="bi bi-pencil-fill"></i>
                                                            </button>
                                                        ) : (
                                                            <Link to={`/home/retoma-payment-form/${tdata.retoma[0].retomaPayments[0].idRetomaPayment}`}>
                                                                <Button className='btn' color='primary' type='button'>
                                                                    <i className="bi bi-pencil-fill"></i>
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
                                                clientPhone: tdata.userDto.phone,
                                                deliveryDate: tdata.homeServices[0].deliveryDate
                                            })} >
                                                <i className="bi bi-search"></i>
                                            </Button>
                                        </td>
                                        <td>
                                            <a href="#">
                                                <button
                                                    type="button"
                                                    title={`Ver factura de ${tdata.equipment.equipmentBrand} ${tdata.equipment.modelOrReference}`}
                                                    className="btn btn-outline-info"
                                                    onClick={(e) => handleViewEquipmentInvoice(e, { idEquipment: tdata.equipment.idEquipment })}
                                                >
                                                    Ver Factura
                                                </button>
                                            </a>
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
                                    Fecha de entrega:
                                </span>
                            </div>
                            {
                                currentDeliveryDate != "Sin definir" ?
                                    new Date(currentDeliveryDate).toLocaleDateString('es', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" })
                                    : "Sin definir"
                            }
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
