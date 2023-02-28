/* eslint-disable */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Row, Col, CardTitle, CardBody, Button, Form, Label, Input } from 'reactstrap';
import { TextField, MenuItem, Alert, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlaceIcon from '@mui/icons-material/Place';
import AddCardIcon from '@mui/icons-material/AddCard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletIcon from '@mui/icons-material/Tablet';
import WatchIcon from '@mui/icons-material/Watch';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import NumbersIcon from '@mui/icons-material/Numbers';

import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import Swal from 'sweetalert2';

import Combobox from 'react-widgets/Combobox';
import 'react-widgets/styles.css';

import { useNavigate } from 'react-router-dom';
import postRequest from '../../services/postRequest';
import postEquipment from '../../services/postEquipment';
import postRequestStatus from '../../services/postRequestStatus';
import postRepair from '../../services/postRepair';
import postRepairPayment from '../../services/postRepairPayment';
import postHomeService from '../../services/postHomeService';
import postRequestNotification from '../../services/postRequestNotification';
import postRequestHistory from '../../services/postRequestHistory';

import getRequestWithUserInfo from '../../services/getRequestWithUserInfo';
import getCellphoneBrands from '../../services/getCellphoneBrands';
import getComputerBrands from '../../services/getComputerBrands';
import getTypeOfEquipments from '../../services/getTypeOfEquipments';
import getVerifyImei from '../../services/getVerifyImei';

import { Checkbox } from '@blueprintjs/core';
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getUserLastRepairRequestInfo from '../../services/getUserLastRepairRequestInfo';
import ComponentCard from '../../components/ComponentCard';
import getSmartWatchesBrands from '../../services/getSmartWatchesBrands';
import getTabletsBrands from '../../services/getTabletsBrands';

export default function RequestRepairForm() {
  //Variables del formulario
  const [typeOfEquipment, setTypeOfEquipment] = useState({ typeOfEquipment: '1' });
  const [imei, setImei] = useState('');
  const [serial, setSerial] = useState('');
  const [verifyResponse, setVerifyResponse] = useState('');
  const [isSameAddresses, setIsSameAddresses] = useState(false);
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [equipmentBrand, setEquipmentBrand] = useState('');

  /*Datos donde iran la lista de marcas de celulares, computadoras, smartwatches y
    tabletas mas populares y tipos de dispositivo*/
  const [cellphoneList, setCellphoneList] = useState([]);
  const [computersList, setComputersList] = useState([]);
  const [tabletsList, setTabletsList] = useState([]);
  const [smartWatchesList, setSmartWatchesList] = useState([]);
  const [typeOfEquipmentList, setTypeOfEquipmentList] = useState([]);

  /**Este objeto pondra la ultima direccion registrada por el cliente para que sea llenado este
   * campo automaticamente
   */
  const handleSameAddresses = () => {
    setIsSameAddresses(!isSameAddresses);
  };

  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  //Variables para las fechas, finish date empieza en un día despues al día actual
  const [startDate, setStartDate] = useState(new Date());

  // const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [finishDate, setFinishDate] = useState(tomorrow);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  //Variables para permitir que se haga un registro en una hora correcta
  const isSelectedDateToday = new Date().getDate() === startDate.getDate();
  const isSelectedDateInFuture = +startDate > +new Date();
  let minTimeHour = new Date().getHours();
  if (!isSelectedDateToday) minTimeHour = 0;

  const date = new Date();
  let currentMins = date.getMinutes();
  let currentHour = date.getHours();
  if (isSelectedDateInFuture) {
    currentHour = 0;
    currentMins = 0;
  }

  const navigate = useNavigate();

  useEffect(function () {
    setLoadingPage(true);
    date.getHours() >= 17 && setStartDate(addDays(startDate, 1));
    getTypeOfEquipments()
      .then((typeOfEquipmentResponse) => {
        setTypeOfEquipmentList(typeOfEquipmentResponse);
        getCellphoneBrands()
          .then((cellphonesResponse) => {
            setCellphoneList(cellphonesResponse);
            getComputerBrands()
              .then((computersResponse) => {
                setComputersList(computersResponse);
                setEquipmentBrand(computersResponse[0].brandName);
                getTabletsBrands().then((tablestsResponse) => {
                  setTabletsList(tablestsResponse);
                  getSmartWatchesBrands().then((smartWatchesResponse) => {
                    setSmartWatchesList(smartWatchesResponse);
                    getUserLastRepairRequestInfo({
                      id: JSON.parse(localStorage.getItem('user')).idUser,
                    })
                      .then((lastRequestInfoResponse) => {
                        setPickUpAddress(lastRequestInfoResponse[0].requests[0].pickUpAddress);
                        setDeliveryAddress(lastRequestInfoResponse[0].requests[0].deliveryAddress);
                        setLoadingPage(false);
                      })
                      .catch((error) => {
                        console.log(error);
                        setLoadingPage(false);
                      });
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setLoadingPage(false);
              });
          })
          .catch((error) => {
            console.log(error);
            setLoadingPage(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoadingPage(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log("Entro al handleSubmit")

    const formData = new FormData();
    //formData.append("typeOfEquipment", e.target.elements.typeOfEquipment.value)
    formData.append('idTypeOfEquipment', e.target.elements.typeOfEquipment.value);
    formData.append('equipmentBrand', equipmentBrand);
    formData.append('modelOrReference', e.target.elements.modelOrReference.value);
    formData.append('imeiOrSerial', e.target.elements.imei.value);
    // formData.append("equipmentInvoice", null)

    const deliveryAddress2 = isSameAddresses
      ? e.target.elements.pickUpAddress.value
      : e.target.elements.deliveryAddress.value;
    // console.log('deliveryAddress: ', deliveryAddress2)

    postEquipment(formData)
      .then((data) => {
        postRequest({
          idUser: JSON.parse(localStorage.getItem('user')).idUser,
          idEquipment: data.idEquipment,
          requestType: 'Reparacion',
          pickUpAddress: pickUpAddress,
          deliveryAddress: deliveryAddress2,
          statusQuote: 'Pendiente',
          autoDiagnosis: e.target.elements.autoDiagnosis.value,
        })
          .then((data) => {
            getRequestWithUserInfo({ id: data.idRequest }).then((userInfo) => {
              postRequestNotification({
                idRequest: data.idRequest,
                // message: "Nueva solicitud de servicio a domicilio a la dirección: " + data.pickUpAddress + " para la fecha " + startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate() + " a las " + startDate.getHours() + ":" + startDate.getMinutes() + " para recoger el dispositivo " + equipmentBrand + " " + e.target.elements.modelOrReference.value + " con imei o serial: " + e.target.elements.imei.value + " a nombre del señor/a " + JSON.parse(localStorage.getItem('user')).name + ", número de teléfono de contácto: " + userInfo[0].userDto.phone + ", el usuario decidió pagar por medio de " + e.target.elements.paymentMethod.value,
                message:
                  'Nueva solicitud de servicio a domicilio a la dirección: ' +
                  data.pickUpAddress +
                  ' para la fecha ' +
                  startDate.toLocaleDateString('es', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  }) +
                  ' para recoger el dispositivo ' +
                  equipmentBrand +
                  ' ' +
                  e.target.elements.modelOrReference.value +
                  ' con imei o serial: ' +
                  e.target.elements.imei.value +
                  ' a nombre del señor/a ' +
                  JSON.parse(localStorage.getItem('user')).name +
                  ', número de teléfono de contácto: ' +
                  userInfo[0].userDto.phone +
                  ', el usuario decidió pagar por medio de ' +
                  e.target.elements.paymentMethod.value,
                wasReviewed: false,
                notificationType: 'to_courier',
              }).catch((error) => {
                setLoading(false);
                console.log(error);
              });
            });
            postRepair({
              idRequest: data.idRequest,
              repairQuote: '0',
            })
              .then((data2) => {
                // console.log("Entro al then de repair", data2);
                postRepairPayment({
                  idRepair: data2.idRepair,
                  paymentMethod: e.target.elements.paymentMethod.value,
                })
                  .then((finalResponse) => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Exito!',
                      text: 'Solicitud de reparación enviada!',
                    }).then((response) => {
                      navigate('/home/user-repair-requests');
                    });
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
            postRequestStatus({
              idRequest: data.idRequest,
              status: 'Iniciada',
              paymentStatus: 'No pago',
              productReturned: false,
              productSold: false,
            }).catch((error) => {
              setLoading(false);
              console.log(error);
            });
            postRequestHistory({
              idRequest: data.idRequest,
              status: 'Iniciada',
              date: new Date(),
            }).catch((error) => {
              setLoading(false);
              console.log(error);
            });
            postHomeService({
              idRequest: data.idRequest,
              pickUpDate: startDate,
            }).catch((error) => {
              setLoading(false);
              console.log(error);
            });
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const isWeekDay = (date) => {
    const day = date.getDay();
    // return day !== 0 && day !== 6; ignora sabados y domingos
    return day !== 0; //solo ignora los domingos
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleVerifySerial = (e) => {
    e.preventDefault();
    getVerifyImei({ id: serial })
      .then((response) => {
        // console.log(response)
        setVerifyResponse(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyImei = (e) => {
    e.preventDefault();
    getVerifyImei({ id: imei })
      .then((response) => {
        // console.log(response)
        setVerifyResponse(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate('/home/dashboards/dashboard1');
  };

  const currentRole = JSON.parse(localStorage.getItem('user')).role;

  return loadingPage ? (
    <div>Cargando...</div>
  ) : (
    <div>
      <BreadCrumbsCeluparts />
      <div>
        <Row>
          <Col>
            {/* <Card className='container'> */}
            <CardTitle tag="h4" className="font-weight-bold p-3 mb-0 justify-content-start">
              <NoteAddIcon /> Nueva solicitud de reparación
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <ComponentCard title="Datos de la solicitud">
                  <Row>
                    <Col>
                      <Checkbox
                        defaultChecked
                        label=" Usar la misma dirección"
                        onChange={handleSameAddresses}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="6" className="mb-3">
                      <TextField
                        aria-describedby="my-helper-text"
                        id="pickUpAddress"
                        name="pickUpAddress"
                        value={pickUpAddress}
                        onChange={(e) => setPickUpAddress(e.target.value)}
                        placeholder="Ingrese la dirección donde se recogerá el producto"
                        type="text"
                        label="Dirección de recogida"
                        required
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PlaceIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Col>
                    <Col md="6">
                      {!isSameAddresses ? (
                        <TextField
                          id="deliveryAddress"
                          name="deliveryAddress"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          type="text"
                          placeholder="Ingrese la dirección donde se entregara el producto"
                          label="Dirección de entrega"
                          required
                          disabled
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MyLocationIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      ) : (
                        <>
                          <TextField
                            id="deliveryAddress"
                            name="deliveryAddress"
                            value={pickUpAddress}
                            type="text"
                            fullWidth
                            label="Dirección de entrega"
                            placeholder="Ingrese la dirección donde se entregara el producto"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MyLocationIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </>
                      )}
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md="6" className="mb-3">
                      {/* <Label for="PickUpTime">Fecha y hora de recogida*</Label> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%' }}>
                        <MobileDateTimePicker
                          renderInput={(props) => <TextField {...props} fullWidth />}
                          label="Fecha y hora de recogida"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          inputRef={(input) => input && input.focus()}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EventNoteIcon />
                              </InputAdornment>
                            ),
                          }}
                          helperText="Some important text"
                        />
                      </LocalizationProvider>
                      <Alert sx={{ marginTop: 1 }} severity="info">
                        El mensajero llegará en un estimado de 1 hora{' '}
                      </Alert>

                      {/* <DatePicker
                        id="PickUpTime"
                        className="form-control"
                        dateFormat="yyyy-MM-dd h:mm aa"
                        minTime={new Date(new Date().setHours(minTimeHour + 1, currentMins, 0, 0))}
                        // minTime={new Date(new Date().setHours(currentHour, currentMins, 0, 0))}
                        maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
                        minDate={new Date()}
                        showTimeSelect
                        placeholder="Fecha y Hora de recogida"
                        includeTimes={[
                          setHours(setMinutes(new Date(), 30), 8),
                          setHours(setMinutes(new Date(), 0), 9),
                          setHours(setMinutes(new Date(), 30), 9),
                          setHours(setMinutes(new Date(), 0), 10),
                          setHours(setMinutes(new Date(), 30), 10),
                          setHours(setMinutes(new Date(), 0), 11),
                          setHours(setMinutes(new Date(), 30), 11),
                          setHours(setMinutes(new Date(), 0), 12),
                          setHours(setMinutes(new Date(), 0), 14),
                          setHours(setMinutes(new Date(), 30), 14),
                          setHours(setMinutes(new Date(), 0), 15),
                          setHours(setMinutes(new Date(), 30), 15),
                          setHours(setMinutes(new Date(), 0), 16),
                          setHours(setMinutes(new Date(), 30), 16),
                          setHours(setMinutes(new Date(), 0), 17),
                          setHours(setMinutes(new Date(), 30), 17),
                          setHours(setMinutes(new Date(), 0), 18),
                        ]}
                        filterDate={isWeekDay}
                        selected={startDate.getDay() === 0 ? addDays(startDate, 1) : startDate}
                        onChange={(date) => setStartDate(date)}
                        timeFormat="HH:mm"
                      /> */}
                    </Col>
                    <Col md="6">
                      <TextField
                        id="paymentMethod"
                        name="paymentMethod"
                        type="select"
                        select
                        label="Metodo de pago"
                        defaultValue="Contraentrega"
                        required
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AddCardIcon />
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem value="Contraentrega">Contraentrega</MenuItem>
                        <MenuItem value="Transferencia bancaria">Transferencia bancaria</MenuItem>
                        <MenuItem value={'Datafono'}>Dátafono</MenuItem>
                      </TextField>
                    </Col>
                  </Row>
                </ComponentCard>

                <ComponentCard title="Datos del equipo">
                  {/* --------------- Datos equipo ---------------- */}
                  {/* <CardSubtitle tag="h6" className="border-bottom p-1 mb-3">
                                            <i className="bi bi-box-seam"> </i>
                                            <strong>Datos del equipo</strong>
                                        </CardSubtitle> */}
                  <Row className="mt-3">
                    <Col md="6" className="mb-3">
                      <TextField
                        id="typeOfEquipment"
                        name="select"
                        type="select"
                        select
                        label="Tipo de Dispositivo"
                        required
                        fullWidth
                        value={typeOfEquipment.typeOfEquipment}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DevicesOtherIcon />
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => {
                          setTypeOfEquipment({ typeOfEquipment: e.target.value });
                          e.target.value == '1'
                            ? setEquipmentBrand(computersList[0].brandName)
                            : e.target.value == '2'
                            ? setEquipmentBrand(cellphoneList[0].brandName)
                            : e.target.value == '3'
                            ? setEquipmentBrand(tabletsList[0].brandName)
                            : setEquipmentBrand(smartWatchesList[0].brandName);
                        }}
                      >
                        {typeOfEquipmentList.map((typeOfEquipmentData, index) => (
                          <MenuItem value={typeOfEquipmentData.idTypeOfEquipment} key={index}>
                            {typeOfEquipmentData.equipmentTypeName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Col>

                    {typeOfEquipment.typeOfEquipment === '1' ? (
                      <Col md="6">
                        {/* <Combobox
                                                        required
                                                        placeholder='Seleccione la marca del computador'
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        defaultValue={''}
                                                        data={computersList.map(computerData => computerData.brandName)}
                                                        value={equipmentBrand}
                                                        onChange={brand => setEquipmentBrand(brand)}
                                                    /> */}
                        <TextField
                          required
                          id="equipmentBrand"
                          name="equipmentBrand"
                          type="select"
                          select
                          label="Marca del computador"
                          fullWidth
                          value={equipmentBrand}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <ComputerIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setEquipmentBrand(e.target.value)}
                        >
                          {computersList.map((computerData, index) => (
                            <option value={computerData.brandName} key={index}>
                              {computerData.brandName}
                            </option>
                          ))}
                        </TextField>
                      </Col>
                    ) : typeOfEquipment.typeOfEquipment === '2' ? (
                      <Col md="6">
                        {/* <Combobox
                                                        required
                                                        placeholder='Seleccione la marca del celular'
                                                        id="equipmentBrand"
                                                        name="equipmentBrand"
                                                        defaultValue={''}
                                                        data={cellphoneList.map(cellphoneData => cellphoneData.brandName)}
                                                        value={equipmentBrand}
                                                        onChange={brand => setEquipmentBrand(brand)}
                                                    /> */}
                        <TextField
                          required
                          id="equipmentBrand"
                          name="equipmentBrand"
                          type="select"
                          value={equipmentBrand}
                          select
                          label="Marca del celular"
                          fullWidth
                          defaultValue=""
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneAndroidIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setEquipmentBrand(e.target.value)}
                        >
                          {cellphoneList.map((cellphoneData, index) => (
                            <option value={cellphoneData.brandName} key={index}>
                              {cellphoneData.brandName}
                            </option>
                          ))}
                        </TextField>
                      </Col>
                    ) : typeOfEquipment.typeOfEquipment === '3' ? (
                      <Col md="6">
                        <TextField
                          required
                          id="equipmentBrand"
                          name="equipmentBrand"
                          type="select"
                          select
                          label="Marca de la tablet"
                          fullWidth
                          defaultValue=""
                          value={equipmentBrand}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TabletIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setEquipmentBrand(e.target.value)}
                        >
                          {tabletsList.map((tabletData, index) => (
                            <option value={tabletData.brandName} key={index}>
                              {tabletData.brandName}
                            </option>
                          ))}
                        </TextField>
                      </Col>
                    ) : (
                      <Col md="6">
                        <TextField
                          required
                          id="equipmentBrand"
                          name="equipmentBrand"
                          type="select"
                          select
                          label="Marca del smartWatch"
                          fullWidth
                          defaultValue=""
                          value={equipmentBrand}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <WatchIcon />
                              </InputAdornment>
                            ),
                          }}
                          onChange={(e) => setEquipmentBrand(e.target.value)}
                        >
                          {smartWatchesList.map((smartWatchData, index) => (
                            <option value={smartWatchData.brandName} key={index}>
                              {smartWatchData.brandName}
                            </option>
                          ))}
                        </TextField>
                      </Col>
                    )}
                  </Row>

                  <Row className="mt-3">
                    <Col md="6" className="mb-3">
                      <TextField
                        id="modelOrReference"
                        name="modelOrReference"
                        placeholder="Ingrese el modelo o referencia del dispositivo"
                        type="text"
                        required
                        label="Modelo o referencia dispositivo"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AppSettingsAltIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Col>
                    {typeOfEquipment.typeOfEquipment === '1' ? (
                      <>
                        <Col md="6">
                          <TextField
                            id="imei"
                            name="imei"
                            value={serial}
                            placeholder="Ingrese el imei dispositivo"
                            type="text"
                            onChange={(e) => setSerial(e.target.value)}
                            required
                            label="Serial del dispositivo"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <NumbersIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Col>
                        {/* {
                                                        serial === '' && currentRole !== 'user' ?
                                                            <FormGroup>
                                                                <Button disabled>
                                                                    Verificar serial
                                                                </Button>
                                                            </FormGroup>
                                                            : currentRole !== 'user' ?
                                                                <FormGroup>
                                                                    <Button onClick={handleVerifySerial}>
                                                                        Verificar serial
                                                                    </Button>
                                                                </FormGroup>
                                                                : null
                                                    } */}
                      </>
                    ) : typeOfEquipment.typeOfEquipment === '2' ? (
                      <>
                        <Col md="6">
                          <TextField
                            id="imei"
                            name="imei"
                            value={imei}
                            placeholder="Ingrese el imei dispositivo"
                            type="text"
                            onChange={(e) => setImei(e.target.value)}
                            required
                            label="Imei del dispositivo"
                            fullWidth
                          />
                        </Col>
                        {/* {
                                                        imei === '' && currentRole !== 'user' ?
                                                            <FormGroup>
                                                                <Button disabled>
                                                                    Verificar imei
                                                                </Button>
                                                            </FormGroup>
                                                            : currentRole !== 'user' ?
                                                                <FormGroup>
                                                                    <Button onClick={handleVerifyImei}>
                                                                        Verificar imei
                                                                    </Button>
                                                                </FormGroup>
                                                                : null
                                                    } */}
                      </>
                    ) : (
                      <>
                        <Col md="6">
                          <Label for="imei">Imei/Serial del dispositivo*</Label>
                          <TextField
                            id="imei"
                            name="imei"
                            value={imei}
                            placeholder="Ingrese el imei dispositivo"
                            type="text"
                            onChange={(e) => setImei(e.target.value)}
                            required
                            label="Imei/Serial del dispositivo"
                            fullWidth
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                  {verifyResponse}
                  <Row className="my-3">
                    <Col>
                      <Label for="autoDiagnosis">Describe brevemente en qué falla tu equipo*</Label>
                      <Input
                        id="autoDiagnosis"
                        name="autoDiagnosis"
                        placeholder="Máximo 250 caracteres"
                        type="textarea"
                        maxLength={250}
                        required
                      />
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between">
                    {loading ? (
                      <button className="btn btn-primary center" type="button" disabled>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Cargando...</span>
                      </button>
                    ) : (
                      <Button color="celuparts-dark-blue " className="btn btn-primary">
                        Enviar
                      </Button>
                    )}

                    <Button className="btn btn-danger justify-content-end" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                </ComponentCard>
              </Form>
            </CardBody>
            {/* </Card> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
