/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { Button, Card, CardBody, CardTitle, Table, Form } from "reactstrap";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// import getRequests from '../../services/getRequests';
import { Link } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
import DatePickerActionBar from '../../components/DatePickerActionBar';
import getRequestRepairs from '../../services/getRequestRepairs';
import ComponentCard from '../../components/ComponentCard';
import getSingleRequest from '../../services/getSingleRequest';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getAllBrandsDistinct from '../../services/getAllBrandsDistinct';
import { LocalizationProvider, MobileDatePicker, DatePicker, esES } from '@mui/x-date-pickers';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';

import {
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  FormControl,
  SvgIcon,
} from '@mui/material';

export default function RepairRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [currentAutoDiagnosis, setCurrentAutoDiagnosis] = useState('');
  const [currentDeliveryAddress, setCurrentDeliveryAddress] = useState('');
  const [currentPickUpAddress, setCurrentPickUpAdress] = useState('');
  const [currentEquipmentData, setCurrentEquipmentData] = useState('');
  const [currentImeiOrSerial, setCurrentImeiOrSerial] = useState('');
  const [currentClientPhone, setCurrentClientPhone] = useState('');
  const [currentRepairQuote, setCurrentRepairQuote] = useState('');
  const [currentDeliveryDate, setCurrentDeliveryDate] = useState('');

  const [modal, setModal] = useState(false);

  //Variables para los filtrados
  const [initialDate, setInitialDate] = useState({ initialDate: null });
  const [finalDate, setFinalDate] = useState({ finalDate: null });
  const [requestStatus, setRequestStatus] = useState('');
  const [userDtoIdNumber, setUserDtoIdNumber] = useState('');
  const [userDtoName, setUserDtoName] = useState('');
  const [userDtoSurname, setUserDtoSurname] = useState('');
  const [equipmentBrand, setEquipmentBrand] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [listOfBrands, setListOfBrands] = useState([]);

  //Variables auxiliares
  const [formattedInitialDate, setFormattedInitialDate] = useState('0001-1-1');
  const [formattedFinallDate, setFormattedFinalDate] = useState('0001-1-1');

  useEffect(
    function () {
      let initialDateString = localStorage.getItem('initialDate') || null;
      var initialDateAux;
      if (initialDateString != null) {
        setInitialDate({ initialDate: new Date(initialDateString) });
        initialDateAux = new Date(initialDateString);
      }

      let finalDateString = localStorage.getItem('finalDate') || null;
      var finalDateAux;
      if (finalDateString != null) {
        setFinalDate({ finalDate: new Date(finalDateString) });
        finalDateAux = new Date(finalDateString);
      }

      setRequestStatus(localStorage.getItem('requestStatus') || '');
      setUserDtoIdNumber(localStorage.getItem('userDtoIdNumber') || '');
      setUserDtoName(localStorage.getItem('userDtoNames') || '');
      setUserDtoSurname(localStorage.getItem('userDtoSurnames') || '');
      setEquipmentBrand(localStorage.getItem('equipmentBrand') || '');
      setEquipmentModel(localStorage.getItem('equipmentModel') || '');

      setLoading(true);
      getRequestRepairs({
        page,
        initialDate:
          initialDateString != null
            ? `${initialDateAux.getFullYear()}-${
                initialDateAux.getMonth() + 1
              }-${initialDateAux.getDate()}`
            : '0001-1-1',
        finalDate:
          finalDateString != null
            ? `${finalDateAux.getFullYear()}-${
                finalDateAux.getMonth() + 1
              }-${finalDateAux.getDate()}`
            : '0001-1-1',
        requestStatus: localStorage.getItem('requestStatus') || '',
        userDtoIdNumber: localStorage.getItem('userDtoIdNumber') || '',
        userDtoName: localStorage.getItem('userDtoNames') || '',
        userDtoSurname: localStorage.getItem('userDtoSurnames') || '',
        equipmentBrand: localStorage.getItem('equipmentBrand') || '',
        equipmentModel: localStorage.getItem('equipmentModel') || '',
      })
        .then((response) => {
          setRequests(response);
          getAllBrandsDistinct()
            .then((responseAllBrandsDistinct) => {
              setListOfBrands(responseAllBrandsDistinct);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
    [page, setRequests],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    //Se consulta desde una fecha inicial hasta una fecha final
    setLoading(true);
    localStorage.setItem('userDtoIdNumber', e.target.elements.userDtoIdNumber.value);
    localStorage.setItem('userDtoNames', e.target.elements.userDtoNames.value);
    localStorage.setItem('userDtoSurnames', e.target.elements.userDtoSurnames.value);
    localStorage.setItem('equipmentModel', e.target.elements.equipmentModel.value);

    const initialDateSubmit = { initialDate: initialDate.initialDate?.toDate() };
    const finalDateSubmit = { finalDate: finalDate.finalDate?.toDate() };

    getRequestRepairs({
      page: 1,
      initialDate:
        initialDateSubmit.initialDate != null
          ? `${initialDateSubmit.initialDate.getFullYear()}-${
              initialDateSubmit.initialDate.getMonth() + 1
            }-${initialDateSubmit.initialDate.getDate()}`
          : formattedInitialDate,
      finalDate:
        finalDateSubmit.finalDate != null
          ? `${finalDateSubmit.finalDate.getFullYear()}-${
              finalDateSubmit.finalDate.getMonth() + 1
            }-${finalDateSubmit.finalDate.getDate()}`
          : formattedFinallDate,
      requestStatus: requestStatus,
      userDtoIdNumber: userDtoIdNumber,
      userDtoName: userDtoName,
      userDtoSurname: userDtoSurname,
      equipmentBrand: equipmentBrand,
      equipmentModel: equipmentModel,
    })
      .then((response) => {
        setRequests(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleNext = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const handlePrevious = () => {
    setPage((currentPage) => currentPage - 1);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleViewClick = ({
    autoDiagnosis,
    deliveryAddress,
    pickUpAddress,
    equipmentData,
    imeiOrSerial,
    clientPhone,
    repairQuote,
    deliveryDate,
  }) => {
    setModal(!modal);
    setCurrentAutoDiagnosis(autoDiagnosis);
    setCurrentDeliveryAddress(deliveryAddress);
    setCurrentPickUpAdress(pickUpAddress);
    setCurrentEquipmentData(equipmentData);
    setCurrentImeiOrSerial(imeiOrSerial);
    setCurrentClientPhone(clientPhone);
    setCurrentRepairQuote(repairQuote);
    setCurrentDeliveryDate(deliveryDate != null ? deliveryDate : 'Sin definir');
  };

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

    localStorage.removeItem('initialDate');
    localStorage.removeItem('finalDate');

    localStorage.removeItem('requestStatus');
    localStorage.removeItem('userDtoIdNumber');
    localStorage.removeItem('userDtoNames');
    localStorage.removeItem('userDtoSurnames');
    localStorage.removeItem('equipmentBrand');
    localStorage.removeItem('equipmentModel');

    localStorage.removeItem('responseTable');
  };

  const handleChangeInitialDate = (date) => {
    // setFormattedInitialDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    setInitialDate({ initialDate: date });
    if (date != null) {
      let initialDateString = date.toISOString();
      localStorage.setItem('initialDate', initialDateString);
    } else {
      localStorage.removeItem('initialDate');
    }
  };

  const handleChangeFinalDate = (date) => {
    // setFormattedFinalDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    setFinalDate({ finalDate: date });
    if (date != null) {
      let finalDateString = date.toISOString();
      localStorage.setItem('finalDate', finalDateString);
    } else {
      localStorage.removeItem('finalDate');
    }
  };

  return loading ? (
    <div>Cargando...</div>
  ) : (
    <div className="display-8 small">
      <BreadCrumbsCeluparts />
      <ComponentCard title="Lista de reparaciones registradas en el sistema">
        <Form onSubmit={handleSubmit}>
          <div className="container">
            <FormGroup>
              <Row className="mb-3">
                <Col md="6">
                  <Row className="mb-3">
                    <Col style={{ fontWeight: 'bold' }}>
                      <SvgIcon>
                        <SavedSearchIcon />
                      </SvgIcon>
                      Consultar por fechas
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="mb-2">
                      <LocalizationProvider
                        adapterLocale="es"
                        dateAdapter={AdapterDayjs}
                        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
                      >
                        <DatePicker
                          label="Desde"
                          value={initialDate.initialDate}
                          onChange={(newValue) => {
                            setInitialDate({ initialDate: newValue });
                          }}
                          components={{
                            ActionBar: DatePickerActionBar,
                          }}
                          componentsProps={{
                            actionBar: {
                              actions: ['clear'],
                            },
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>
                    </Col>
                    <Col md="6" className="mb-3">
                      <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: '100%' }}
                          label="Hasta"
                          components={{
                            ActionBar: DatePickerActionBar,
                          }}
                          componentsProps={{
                            actionBar: {
                              actions: ['clear'],
                            },
                          }}
                          value={finalDate.finalDate}
                          onChange={(newValue) => {
                            setFinalDate({ finalDate: newValue });
                          }}
                          renderInput={(params) => <TextField fullWidth {...params} />}
                        />
                      </LocalizationProvider>
                    </Col>
                  </Row>
                </Col>
                <Col md="6">
                  <Row className="mb-3">
                    <Col style={{ fontWeight: 'bold' }}>
                      <SvgIcon>
                        <PersonSearchIcon />
                      </SvgIcon>
                      Consultar por clientes
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" className="mb-2">
                      <TextField
                        className="form-control"
                        id="userDtoIdNumber"
                        label="Id"
                        value={userDtoIdNumber}
                        onChange={(e) => setUserDtoIdNumber(e.target.value)}
                      />
                    </Col>
                    <Col md="4" className="mb-2">
                      <TextField
                        className="form-control"
                        id="userDtoNames"
                        label="Nombres"
                        value={userDtoName}
                        onChange={(e) => setUserDtoName(e.target.value)}
                      />
                    </Col>
                    <Col md="4">
                      <TextField
                        fullWidth
                        className="form-control"
                        id="userDtoSurnames"
                        label="Apellidos"
                        value={userDtoSurname}
                        onChange={(e) => setUserDtoSurname(e.target.value)}
                        type="text"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <Row className="mb-3">
                    <Col style={{ fontWeight: 'bold' }}>
                      <SvgIcon>
                        <ScreenSearchDesktopIcon />
                      </SvgIcon>
                      Consultar por equipos
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="mb-3">
                      <FormControl fullWidth>
                        <InputLabel shrink id="equipmentBrand">
                          Marca
                        </InputLabel>
                        <Select
                          id="equipmentBrand"
                          name="equipmentBrand"
                          displayEmpty
                          value={equipmentBrand}
                          input={<OutlinedInput notched label="Marca" />}
                          onChange={(e) => {
                            setEquipmentBrand(e.target.value);
                            localStorage.setItem('equipmentBrand', e.target.value);
                          }}
                        >
                          <MenuItem value="">Sin Filtro</MenuItem>
                          {listOfBrands.map((brand, index) => (
                            <MenuItem value={brand} key={index}>
                              {brand}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Col>
                    <Col md="6" className="mb-3">
                      <TextField
                        fullWidth
                        label="Modelo"
                        id="equipmentModel"
                        value={equipmentModel}
                        onChange={(e) => setEquipmentModel(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md="6" className="mb-3">
                  <Row className="mb-3">
                    <Col style={{ fontWeight: 'bold' }}>
                      <SvgIcon>
                        <ContentPasteSearchIcon />
                      </SvgIcon>
                      Consultar por estado de solicitud
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormControl fullWidth>
                        <InputLabel shrink id="equipmentBrand">
                          Estado
                        </InputLabel>
                        <Select
                          id="requestStatus"
                          name="requestStatus"
                          displayEmpty
                          value={requestStatus || ''}
                          input={<OutlinedInput notched label="Estado" />}
                          onChange={(e) => {
                            setRequestStatus(e.target.value);
                            localStorage.setItem('requestStatus', e.target.value);
                          }}
                        >
                          <MenuItem value="">Sin Filtro</MenuItem>
                          <MenuItem value="Iniciada">Iniciada</MenuItem>
                          <MenuItem value="En proceso de recogida">En proceso de recogida</MenuItem>
                          <MenuItem value="Recibida tecnico">Recibida técnico</MenuItem>
                          <MenuItem value="Revisado">Revisado</MenuItem>
                          <MenuItem value="En reparacion">En reparación</MenuItem>
                          <MenuItem value="Reparado pendiente de pago">
                            Reparado, pendiente de pago
                          </MenuItem>
                          <MenuItem value="En camino">En camino</MenuItem>
                          <MenuItem value="Terminada">Terminada</MenuItem>
                          <MenuItem value="En devolucion">En devolución</MenuItem>
                          <MenuItem value="Devuelto sin reparacion">
                            Devuelto sin reparación
                          </MenuItem>
                          <MenuItem value="Retoma">Retoma</MenuItem>
                          <MenuItem value="Abandonada">Abandonada</MenuItem>
                          <MenuItem value="Anulado por IMEI">Anulado por IMEI</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FormGroup>
            <Button>Consultar</Button>
            <Button className="m-1" onClick={handleCleanFilters}>
              Limpiar
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
              <th>Datos equipo</th>
              <th>Estado de cotización</th>
              <th>Estado de solicitud</th>
              <th>Técnico asociado</th>
              <th>Cuota de reparación</th>
              <th>Tiempo de servicio de reparación</th>
              <th>Fecha de entrega</th>
              <th>Actualizar estado Solicitud</th>
              {JSON.parse(localStorage.getItem('user')).role === 'mensajero' ? null : (
                <th>Actualizar estado Reparación</th>
              )}
              {JSON.parse(localStorage.getItem('user')).role === 'admin' ||
              JSON.parse(localStorage.getItem('user')).role === 'aux_admin' ? (
                <th>Actualizar pago reparación</th>
              ) : null}
              <th>Detalles de la solicitud</th>
            </tr>
          </thead>
          <tbody>
            {requests.requests.map((tdata, index) =>
              tdata.requestType === 'Reparacion' ? (
                <tr key={index} className="border-top">
                  <td>
                    {tdata.userDto.names} {tdata.userDto.surnames}
                  </td>
                  <td>{`${new Date(tdata.requestDate).getFullYear()}-${
                    new Date(tdata.requestDate).getMonth() + 1
                  }-${new Date(tdata.requestDate).getDate()}`}</td>
                  <td>
                    {tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}
                  </td>
                  {/* <td>{tdata.pickUpAddress}</td>
                                        <td>{tdata.deliveryAddress}</td> */}
                  <td>{tdata.statusQuote}</td>
                  <td>{tdata.requestStatus[0].status}</td>
                  <td>
                    {tdata.repairs[0].technician != null
                      ? tdata.repairs[0].technician.names +
                        ' ' +
                        tdata.repairs[0].technician.surnames
                      : 'Sin técnico asociado'}
                  </td>
                  <td>{tdata.repairs[0].repairQuote}</td>
                  <td>
                    {tdata.repairs[0].repairTime != null
                      ? tdata.repairs[0].repairTime
                      : 'Sin registrar'}
                  </td>
                  <td>
                    {tdata.homeServices[0]?.deliveryDate != null
                      ? new Date(tdata.homeServices[0].deliveryDate).toLocaleDateString('es', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })
                      : 'Sin definir'}
                  </td>
                  <td>
                    {tdata.statusQuote == 'Pendiente' ? (
                      <td>
                        <button type="button" className="btn btn-secondary" disabled>
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </td>
                    ) : (
                      <td>
                        <Link
                          to={`/home/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}
                        >
                          <Button type="button" className="btn" color="primary">
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </Link>
                      </td>
                    )}
                  </td>
                  {JSON.parse(localStorage.getItem('user')).role === 'mensajero' ? null : (
                    <td>
                      {tdata.requestStatus[0].status === 'Iniciada' ||
                      tdata.requestStatus[0].status === 'En proceso de recogida' ||
                      tdata.requestStatus[0].status === 'Recibida tecnico' ||
                      tdata.requestStatus[0].status === 'En devolucion' ||
                      tdata.requestStatus[0].status === 'Devuelto sin reparacion' ||
                      tdata.requestStatus[0].status === 'Abandonada' ||
                      tdata.requestStatus[0].status === 'Terminada' ||
                      tdata.requestStatus[0].status === 'Anulado por IMEI' ||
                      tdata.requestStatus[0].status === 'En camino' ? (
                        <button type="button" className="btn btn-secondary" disabled>
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      ) : (
                        <Link to={`/home/update-repair-form/${tdata.repairs[0].idRepair}`}>
                          <Button type="button" className="btn" color="primary">
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </Link>
                      )}
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem('user')).role === 'admin' ||
                  JSON.parse(localStorage.getItem('user')).role === 'aux_admin' ? (
                    <td>
                      {tdata.requestStatus[0].status === 'Iniciada' ||
                      tdata.requestStatus[0].status === 'En proceso de recogida' ||
                      tdata.requestStatus[0].status === 'Recibida tecnico' ||
                      tdata.requestStatus[0].status === 'En devolucion' ||
                      tdata.requestStatus[0].status === 'Devuelto sin reparacion' ||
                      tdata.requestStatus[0].status === 'Abandonada' ||
                      tdata.requestStatus[0].status === 'Terminada' ||
                      tdata.requestStatus[0].status === 'En camino' ? (
                        <button className="btn btn-secondary" type="button" disabled>
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      ) : (
                        <Link
                          to={`/home/repair-payment-form/${tdata.repairs[0].repairPayments[0].idRepairPayment}`}
                        >
                          <Button className="btn" color="primary">
                            <i className="bi bi-pencil-fill"></i>
                          </Button>
                        </Link>
                      )}
                    </td>
                  ) : null}
                  <td>
                    <Button
                      className="btn"
                      color="info"
                      type="button"
                      onClick={() =>
                        handleViewClick({
                          autoDiagnosis: tdata.autoDiagnosis,
                          deliveryAddress: tdata.deliveryAddress,
                          pickUpAddress: tdata.pickUpAddress,
                          equipmentData:
                            tdata.equipment.equipmentBrand + ' ' + tdata.equipment.modelOrReference,
                          imeiOrSerial: tdata.equipment.imeiOrSerial,
                          clientPhone: tdata.userDto.phone,
                          repairQuote: tdata.repairs[0].repairQuote,
                          deliveryDate: tdata.homeServices[0]?.deliveryDate,
                        })
                      }
                    >
                      <i className="bi bi-search"></i>
                    </Button>
                  </td>
                </tr>
              ) : null,
            )}
            {/* TERMINA EL MAP */}
          </tbody>
        </Table>
        {
          <div>
            Página número: {requests.currentPage} de {requests.pages === 0 ? 1 : requests.pages}
          </div>
        }
        <div className="d-flex justify-content-between">
          {requests.currentPage === 1 ? (
            <button className="btn btn-celuparts-dark-blue" disabled>
              Anterior
            </button>
          ) : (
            <Button className="btn" color="primary" onClick={handlePrevious}>
              Anterior
            </Button>
          )}
          {requests.currentPage === requests.pages ||
          requests.currentPage === requests.pages + 1 ? (
            <button className="btn btn-celuparts-dark-blue" disabled>
              Siguiente
            </button>
          ) : (
            <Button className="btn" color="primary" onClick={handleNext}>
              Siguiente
            </Button>
          )}
        </div>
        <Modal isOpen={modal} toggle={handleViewClick.bind(null)}>
          <ModalHeader toggle={handleViewClick.bind(null)}>Detalles de la solicitud</ModalHeader>
          <ModalBody>
            <div>
              <span className="fw-bold">Dispositivo:</span>
            </div>
            {currentEquipmentData}
            <hr />
            <div>
              <span className="fw-bold">Imei o serial del Dispositivo:</span>
            </div>
            {currentImeiOrSerial}
            <hr />
            <div>
              <span className="fw-bold">Dirección de recogida:</span>
            </div>
            {currentPickUpAddress}
            <hr />
            <div>
              <span className="fw-bold">Dirección de entrega:</span>
            </div>
            {currentDeliveryAddress}
            <hr />
            <div>
              <span className="fw-bold">Fecha de entrega:</span>
            </div>
            {currentDeliveryDate != 'Sin definir'
              ? new Date(currentDeliveryDate).toLocaleDateString('es', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              : 'Sin definir'}
            <hr />
            <div>
              <span className="fw-bold">Teléfono cliente:</span>
            </div>
            {currentClientPhone}
            <hr />
            <div>
              <span className="fw-bold">Detalle de la solicitud:</span>
            </div>
            {currentAutoDiagnosis}
            <hr />
            <div>
              <span className="fw-bold">Cuota de reparación:</span>
            </div>
            {currentRepairQuote}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleViewClick.bind(null)}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
      </ComponentCard>
    </div>
  );
}
