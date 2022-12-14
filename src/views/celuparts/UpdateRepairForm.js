/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
    Card,
    Row,
    Col,
    Table,
    CardTitle,
    CardSubtitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import Swal from 'sweetalert2'
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import getSingleRepair from '../../services/getSingleRepair';
import putRepair from '../../services/putRepair';
import getRequestNotification from '../../services/getRequestNotification';
import putRequestNotification from '../../services/putRequestNotification';
import getTechnicianByEmail from '../../services/getTechnicianByEmail';
import getPartsInfo from '../../services/getPartsInfo';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import getSearchRepeatedPartsToRepair from '../../services/getSearchRepeatedPartsToRepair';
import postPartsToRepair from '../../services/postPartsToRepair';
import putPartsToRepair from '../../services/putPartsToRepair';
import getPartsToRepairByIdRepair from '../../services/getPartsToRepairByIdRepair';
import deletePartsToRepairByIdRequestAndPart from '../../services/deletePartsToRepairByIdRequestAndPart';

export default function UpdateRepairForm() {
    const [idTechnician, setIdTechnician] = useState({ idTechnician: 0 });
    const [deviceDiagnostic, setDeviceDiagnostic] = useState({ deviceDiagnostic: "" });
    const [repairStartDate, setRepairStartDate] = useState({ repairStartDate: new Date() });
    const [repairDate, setRepairDate] = useState({ repairDate: new Date() });
    const [repairQuote, setRepairQuote] = useState({ repairQuote: 0 });
    const [idRequest, setIdRequest] = useState({ idRequest: 0 });
    const [priceReviewedByAdmin, setPriceReviewedByAdmin] = useState({ priceReviewedByAdmin: false })

    const [isRepairDateNull, setIsRepairDateNull] = useState({ isRepairDateNull: false });
    const [isRepairStartDateNull, setIsRepairStartDateNull] = useState({ isRepairStartDateNull: false })

    const [nullFinishDateArrived, setNullFinishDateArrived] = useState(false)
    const [nullStartDateArrived, setNullStartDateArrived] = useState(false)

    const [notifications, setNotifications] = useState([])

    const [loading, setLoading] = useState(false);
    const [loadingPut, setLoadingPut] = useState(false);

    const [isRepairStarted, setIsRepairStarted] = useState(false)
    const [isRepairFinished, setIsRepairFinished] = useState(false)

    //Control de los checkbox de la tabla de partes
    const [listOfParts, setListOfParts] = useState([])
    const [listOfReplaceCheckedParts, setListOfReplaceCheckedParts] = useState([])
    const [listOfRepairCheckedParts, setListOfRepairCheckedParts] = useState([])
    const [listOfUncheckedParts, setListOfUncheckedParts] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    /*
    *   Usado para verificar que el usuario logeado sea tecnico, en caso que lo sea
    *   no mostrara el input de "Id de tecnico asociado" dado que lo tomara automaticamente
    */
    const [isTechnician, setIsTechnician] = useState(false)
    const [isUserAdmin, setIsUserAdmin] = useState(false)

    const postListOfRepairCheckedParts = () => {
        listOfRepairCheckedParts.map((repariPart) => (
            getSearchRepeatedPartsToRepair({
                idRepair: params.id,
                partName: repariPart
            })
                .then(responseSearchRepeated => {
                    // console.log("responseSearchRepeated status: ", responseSearchRepeated.status)
                    if (responseSearchRepeated.status == 404) {
                        postPartsToRepair({
                            idRepair: params.id,
                            part: repariPart,
                            toReplace: false,
                            toRepair: true
                        })
                            .catch(error => {
                                console.log("Error post partToRepair", error)
                            })
                    } else {
                        // console.log("Es nueva registro ", responseSearchRepeated)
                        putPartsToRepair({
                            idPartsToRepair: responseSearchRepeated[0].idPartsToRepair,
                            idRepair: responseSearchRepeated[0].idRepair,
                            part: responseSearchRepeated[0].part,
                            toReplace: false,
                            toRepair: true
                        })
                            .catch(error => {
                                console.log("Error put partsToRepair", error)
                            })
                    }
                })
        ))
    }

    const postListOfReplaceCheckedParts = () => {
        listOfReplaceCheckedParts.map((repariPart) => (
            getSearchRepeatedPartsToRepair({
                idRepair: params.id,
                partName: repariPart
            })
                .then(responseSearchRepeated => {
                    // console.log("responseSearchRepeated status: ", responseSearchRepeated.status)
                    if (responseSearchRepeated.status == 404) {
                        postPartsToRepair({
                            idRepair: params.id,
                            part: repariPart,
                            toReplace: true,
                            toRepair: false
                        })
                            .catch(error => {
                                console.log("Error post partToRepair", error)
                            })
                    } else {
                        // console.log("Es nueva registro ", responseSearchRepeated)
                        putPartsToRepair({
                            idPartsToRepair: responseSearchRepeated[0].idPartsToRepair,
                            idRepair: responseSearchRepeated[0].idRepair,
                            part: responseSearchRepeated[0].part,
                            toReplace: true,
                            toRepair: false
                        })
                            .catch(error => {
                                console.log("Error put partsToRepair", error)
                            })
                    }
                })
        ))
    }

    const postUnCheckedParts = () => {
        listOfUncheckedParts.map((uncheckedPart) => (
            deletePartsToRepairByIdRequestAndPart({
                idRepair: params.id,
                partName: uncheckedPart
            })
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("lista de UNCHECKED", listOfUncheckedParts)
        setLoadingPut(true);
        nullFinishDateArrived && nullStartDateArrived ? (
            //PRODUCTO REVISADO SIN SER ACEPTADA LA COTIZACION
            putRepair({
                idRepair: params.id,
                idRequest: idRequest.idRequest,
                idTechnician: idTechnician.idTechnician,
                repairDate: null,
                repairStartDate: null,
                deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
                repairQuote: repairQuote.repairQuote,
                priceReviewedByAdmin: isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin ? true : false
            })
                .then(data => {
                    postListOfRepairCheckedParts();
                    postListOfReplaceCheckedParts();
                    postUnCheckedParts();
                    isUserAdmin ? (
                        notifications.map(tdata => (
                            tdata.idRequest === idRequest.idRequest ? (
                                putRequestNotification({
                                    idRequestNotification: tdata.idRequestNotification,
                                    idRequest: tdata.idRequest,
                                    message: 'Tu dispositivo ya tiene precio de reparaci??n! haz click en "Mis reparaciones" para revisar',
                                    wasReviewed: false,
                                    notificationType: "to_customer"
                                })
                                    .then(response => {
                                        // console.log("Exito!", response)
                                    })
                                    .then(finalResponse => {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Exito!',
                                            text: 'Estado de reparaci??n actualizadisimo!',
                                        })
                                            .then(response => {
                                                navigate(-1)
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            ) : null
                        ))
                    ) : null
                    setLoadingPut(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingPut(false);
                })
        ) : nullFinishDateArrived && !nullStartDateArrived ? (
            putRepair({
                idRepair: params.id,
                idRequest: idRequest.idRequest,
                idTechnician: idTechnician.idTechnician,
                repairDate: null,
                repairStartDate: repairStartDate.repairStartDate,
                deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
                repairQuote: repairQuote.repairQuote,
                priceReviewedByAdmin: isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin ? true : false
            })
                .then(data => {
                    // console.log(data)
                    postListOfRepairCheckedParts();
                    postListOfReplaceCheckedParts();
                    postUnCheckedParts();
                    notifications.map(tdata => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: 'Tu dispositivo ya tiene precio de reparaci??n! haz click en "Mis reparaciones" para revisar',
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    // console.log("Exito!", response)
                                })
                                .finally(finalResponse => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Exito!',
                                        text: 'Estado de reparaci??n actualizadisimo!',
                                    })
                                        .then(response => {
                                            navigate(-1)
                                        })
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                    setLoadingPut(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingPut(false);
                })
        ) : nullStartDateArrived && !nullFinishDateArrived ? (
            putRepair({
                idRepair: params.id,
                idRequest: idRequest.idRequest,
                idTechnician: idTechnician.idTechnician,
                repairDate: repairDate.repairDate,
                repairStartDate: null,
                deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
                repairQuote: repairQuote.repairQuote,
                priceReviewedByAdmin: isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin ? true : false
            })
                .then(data => {
                    // console.log(data)
                    postListOfRepairCheckedParts();
                    postListOfReplaceCheckedParts();
                    postUnCheckedParts();
                    notifications.map(tdata => (
                        tdata.idRequest === idRequest.idRequest ? (
                            putRequestNotification({
                                idRequestNotification: tdata.idRequestNotification,
                                idRequest: tdata.idRequest,
                                message: 'Tu dispositivo ya tiene precio de reparaci??n! haz click en "Mis reparaciones" para revisar',
                                wasReviewed: false,
                                notificationType: "to_customer"
                            })
                                .then(response => {
                                    console.log("Exito!", response)
                                })
                                .finally(finalResponse => {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Exito!',
                                        text: 'Estado de reparaci??n actualizadisimo!',
                                    })
                                        .then(response => {
                                            navigate(-1)
                                        })
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        ) : null
                    ))
                    setLoadingPut(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingPut(false);
                })
        )
            :
            putRepair({
                idRepair: params.id,
                idRequest: idRequest.idRequest,
                idTechnician: idTechnician.idTechnician,
                repairDate: repairDate.repairDate,
                repairStartDate: repairStartDate.repairStartDate,
                deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
                repairQuote: repairQuote.repairQuote,
                priceReviewedByAdmin: isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin ? true : false
            })
                .then(data => {
                    postListOfRepairCheckedParts();
                    postListOfReplaceCheckedParts();
                    postUnCheckedParts();
                    setLoadingPut(false);
                })
                .finally(finalResponse => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: 'Estado de reparaci??n actualizadisimo!',
                    })
                        .then(response => {
                            navigate(-1)
                        })
                })
                .catch(error => {
                    console.log(error);
                    setLoadingPut(false);
                });
    }

    useEffect(function () {
        setLoading(true);
        //admin aux_admin
        JSON.parse(localStorage.getItem('user')).role === "admin" || JSON.parse(localStorage.getItem('user')).role === "aux_admin" ? setIsUserAdmin(true) : setIsUserAdmin(false);
        getSingleRepair({ id: params.id })
            .then(response => {
                // console.log("response single repair", response)
                setIdTechnician({ idTechnician: response[0].idTechnician })
                setDeviceDiagnostic({ deviceDiagnostic: response[0].deviceDiagnostic })
                setRepairQuote({ repairQuote: response[0].repairQuote })
                setIdRequest({ idRequest: response[0].idRequest })
                setPriceReviewedByAdmin({ priceReviewedByAdmin: response[0].priceReviewedByAdmin })

                if (response[0].repairDate == null) {
                    setIsRepairDateNull({ isRepairDateNull: true })
                    setRepairDate({ repairDate: new Date() })
                    setNullFinishDateArrived(true)
                }
                else {
                    setIsRepairDateNull({ isRepairDateNull: false })
                    setRepairDate({ repairDate: new Date(response[0].repairDate) })
                }

                if (response[0].repairStartDate == null) {
                    setIsRepairStartDateNull({ isRepairStartDateNull: true })
                    setRepairStartDate({ repairStartDate: new Date() })
                    setNullStartDateArrived(true)
                } else {
                    setIsRepairStartDateNull({ isRepairStartDateNull: false })
                    setRepairStartDate({ repairStartDate: new Date(response[0].repairStartDate) })
                }

                if (JSON.parse(localStorage.getItem('user')).role == "tecnico") {
                    getTechnicianByEmail({ email: JSON.parse(localStorage.getItem('user')).email })
                        .then(responseTechnicianInfo => {
                            setIdTechnician({ idTechnician: responseTechnicianInfo.idTechnician })
                        })
                    setIsTechnician(true)
                } else {
                    setIsTechnician(false)
                }

                getRequestNotification()
                    .then(response => {
                        setNotifications(response)
                        getPartsInfo()
                            .then(responsePartsInfo => {
                                setListOfParts(responsePartsInfo)
                                console.log("parts info ", responsePartsInfo)
                                getPartsToRepairByIdRepair({
                                    id: params.id,
                                })
                                    .then(responsePartsToRepairByIdRepair => {
                                        console.log(responsePartsToRepairByIdRepair)
                                        responsePartsToRepairByIdRepair.map((part) => (
                                            part.toRepair == true ? setListOfRepairCheckedParts(array => [...array, part.part]) : setListOfReplaceCheckedParts(array => [...array, part.part])
                                        ))
                                        setLoading(false)
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
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
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            }
            );
    }, [params.id])

    const handleIdTechnicianChange = (e) => {
        setIdTechnician((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleDeviceDiagnosticChange = (e) => {
        setDeviceDiagnostic((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleRepairQuoteChange = (e) => {
        setRepairQuote((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleStartRepairCheck = (e) => {
        setIsRepairStarted(!isRepairStarted)
        setRepairStartDate({ repairStartDate: new Date() })
        setNullStartDateArrived(!nullStartDateArrived)
    }

    const handleFinishRepairCheck = (e) => {
        setIsRepairFinished(!isRepairFinished)
        setRepairDate({ repairDate: new Date() })
        setNullFinishDateArrived(!nullFinishDateArrived)
    }

    const handleAddReplace = (e, partName) => {
        if (e.target.checked) {
            setListOfReplaceCheckedParts(array => [...array, partName])
            setListOfUncheckedParts(current => current.filter((name) => name != partName))
        } else {
            // console.log('?????? Checkbox is NOT checked');
            setListOfReplaceCheckedParts(current => current.filter((name) => name != partName))
            setListOfUncheckedParts(array => [...array, partName])
        }
    }

    const handleAddRepair = (e, partName) => {
        if (e.target.checked) {
            setListOfRepairCheckedParts(array => [...array, partName])
            setListOfUncheckedParts(current => current.filter((name) => name != partName))
        } else {
            // console.log('?????? Checkbox is NOT checked');
            setListOfRepairCheckedParts(current => current.filter((name) => name != partName))
            setListOfUncheckedParts(array => [...array, partName])
        }
    }

    const handleBackPage = (e) => {
        navigate(-1)
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Button className='btn btn-danger' onClick={handleBackPage}>
                    Atr??s
                </Button>
                <div>
                    <Row>
                        <Col>
                            <Card className='container'>
                                <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                    Actualizar estado de reparaci??n
                                </CardTitle>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-eyeglasses"> </i>
                                            <strong>Datos de la reparaci??n</strong>
                                        </CardSubtitle>
                                        {
                                            isTechnician ? null :
                                                (
                                                    <FormGroup>
                                                        <Label for="idTechnician">Id de tecnico asociado</Label>
                                                        <Input
                                                            id="idTechnician"
                                                            name="idTechnician"
                                                            placeholder="Ingrese el ID del t??cnico asociado a esta reparaci??n"
                                                            type="number"
                                                            value={idTechnician.idTechnician}
                                                            onChange={handleIdTechnicianChange}
                                                            required
                                                        />
                                                    </FormGroup>
                                                )
                                        }
                                        <FormGroup>
                                            <Label for="deviceDiagnostic">Diagnostico del dispositivo</Label>
                                            <Input
                                                id="deviceDiagnostic"
                                                name="deviceDiagnostic"
                                                placeholder="Ingrese el diagnostico del dispositivo reparado"
                                                type="textarea"
                                                value={deviceDiagnostic.deviceDiagnostic}
                                                onChange={handleDeviceDiagnosticChange}
                                                required
                                            />
                                        </FormGroup>

                                        {/* <FormGroup check>
                                            <Input disabled={!isRepairStartDateNull.isRepairStartDateNull} type='checkbox' onClick={handleStartRepairCheck} />
                                            <Label check>He empezado mi labor de reparaci??n</Label>
                                        </FormGroup> */}

                                        <FormGroup check>
                                            <Input disabled={!isRepairDateNull.isRepairDateNull || isRepairStartDateNull.isRepairStartDateNull} type='checkbox' onClick={handleFinishRepairCheck} />
                                            <Label check>He terminado mi reparaci??n exitosamente</Label>
                                        </FormGroup>

                                        <FormGroup>
                                            {/* {
                                                    listOfParts.map((part, index) => (
                                                        <div key={index}>{part.partName}</div>
                                                    ))
                                                } */}
                                            <Table striped responsive>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Parte</th>
                                                        <th scope="col">Reemplazar</th>
                                                        <th scope="col">Reparar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        listOfParts.map((part, index) => (
                                                            <tr key={index} className="border-top">
                                                                <td>{part.partName}</td>
                                                                <td>
                                                                    <Input type='checkbox'
                                                                    checked={listOfReplaceCheckedParts.some(x => x == part.partName)} 
                                                                    disabled={listOfRepairCheckedParts.some(x => x == part.partName)} 
                                                                    onChange={(e) => handleAddReplace(e, part.partName)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Input type='checkbox'
                                                                    checked={listOfRepairCheckedParts.some(x => x == part.partName)}
                                                                    disabled={listOfReplaceCheckedParts.some(x => x == part.partName)} 
                                                                    onChange={(e) => handleAddRepair(e, part.partName)} />
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </FormGroup>

                                        {
                                            JSON.parse(localStorage.getItem('user')).role == "admin" || JSON.parse(localStorage.getItem('user')).role == "aux_admin" ?
                                                <FormGroup>
                                                    <Label for="repairQuote">Cuota de reparaci??n</Label>
                                                    <Input
                                                        id="repairQuote"
                                                        name="repairQuote"
                                                        placeholder="Ingrese la cuota de reparaci??n del producto"
                                                        type="number"
                                                        value={repairQuote.repairQuote}
                                                        onChange={handleRepairQuoteChange}
                                                        required
                                                    />
                                                </FormGroup>
                                                : null
                                        }

                                        {
                                            loadingPut ? (
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="sr-only">Cargando...</span>
                                                </button>
                                            ) : (
                                                <Button color="primary">
                                                    Guardar
                                                </Button>
                                            )
                                        }
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    )
}
