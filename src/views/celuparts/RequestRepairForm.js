/* eslint-disable */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(utc);
dayjs.extend(calendar);

import { Row, Col, CardTitle, CardBody, Button, Form, Label, Input } from 'reactstrap';
import {
  TextField,
  MenuItem,
  Alert,
  InputAdornment,
  Select,
  InputLabel,
  FormControl,
  Box,
  SvgIcon,
  OutlinedInput,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';

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
  const [typeOfEquipment, setTypeOfEquipment] = useState({
    typeOfEquipment: '',
  });
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
  const [payMethodsList, setPayMethodsList] = useState([
    { payMethodValue: 'Contraentrega', payMethodName: 'Contraentrega' },
    {
      payMethodValue: 'Transferencia bancaria',
      payMethodName: 'Transferencia bancaria',
    },
    { payMethodValue: 'Datafono', payMethodName: 'Datáfono' },
  ]);
  const [computersList, setComputersList] = useState([]);
  const [tabletsList, setTabletsList] = useState([]);
  const [smartWatchesList, setSmartWatchesList] = useState([]);
  const [typeOfEquipmentList, setTypeOfEquipmentList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  /**Este objeto pondra la ultima direccion registrada por el cliente para que sea llenado este
   * campo automaticamente
   */
  const handleSameAddresses = () => {
    setIsSameAddresses(!isSameAddresses);
  };
  const handleArriveDate = () => {
    let date = dayjs(new Date());
    let arriveHour = date.hour() + 1;
    let minutes = 0;
    if (date.minute() < 10) {
      minutes = 0;
    } else if (date.minute() <= 35) {
      minutes = 30;
    } else {
      minutes = 0;
      arriveHour += 1;
    }

    if (date.hour() < 8) {
      return dayjs(dayjs().set('hour', 8).set('minute', 30).set('second', 0));
    } else if (date.hour() >= 17 && date.minute() >= 10) {
      let day = new Date();
      let nextDay = dayjs(dayjs(new Date().setDate(day.getDate() + 1)));
      return nextDay.set('hour', 8).set('minute', 30).set('second', 0);
    }
    return dayjs().set('hour', arriveHour).set('minute', minutes).set('second', 0);
  };
  //Variables para las fechas, finish date empieza en un día despues al día actual
  const [startDate, setStartDate] = useState(handleArriveDate());
  const [minTimeUser, setMinTimeUser] = useState(handleArriveDate());

  // const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  // //Variables para permitir que se haga un registro en una hora correcta
  const isSelectedDateToday = dayjs().date() === startDate.date();
  const isSelectedDateInFuture = +startDate > +dayjs();
  let minTimeHour = dayjs().hour();

  if (!isSelectedDateToday) minTimeHour = 0;

  const date = dayjs();
  let currentMins = date.minute();
  let currentHour = date.hour();
  if (isSelectedDateInFuture) {
    currentHour = 0;
    currentMins = 0;
  }

  const navigate = useNavigate();

  useEffect(function () {
    setLoadingPage(true);
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
                  startDate.toDate().toLocaleDateString('es', {
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
              pickUpDate: startDate.utc().format(),
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
    const day = date.day();
    // return day !== 0 && day !== 6; ignora sabados y domingos
    return day == 0; //solo ignora los domingos
  };

  const addDays = (date, days) => {
    var result = dayjs(date);
    result.set('date', result.date() + days);
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
                      <Checkbox label=" Usar la misma dirección" onChange={handleSameAddresses} />
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
                          placeholder="Ingrese la dirección donde se entregará el producto"
                          label="Dirección de entrega"
                          required
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
                            disabled
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
                      <LocalizationProvider
                        adapterLocale={es}
                        dateAdapter={AdapterDayjs}
                        sx={{ width: '100%' }}
                      >
                        <MobileDateTimePicker
                          sx={{ width: '100%' }}
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              inputProps={{
                                ...props.inputProps,
                                readOnly: true,
                              }}
                              required
                              fullWidth
                              error={false}
                            />
                          )}
                          ampm
                          label="Fecha y hora de recogida"
                          value={startDate.day() === 0 ? addDays(startDate, 1) : startDate}
                          onChange={(date) => {
                            setStartDate(date);
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EventNoteIcon />
                              </InputAdornment>
                            ),
                          }}
                          minDate={minTimeUser}
                          minTime={(() => {
                            if (dayjs().date() == startDate.date()) {
                              return minTimeUser;
                            } else {
                              return dayjs(
                                dayjs().set('hour', 8).set('minute', 30).set('second', 0),
                              );
                            }
                          })()}
                          maxTime={dayjs(dayjs().set('hour', 18).set('minute', 0).set('second', 0))}
                          shouldDisableDate={isWeekDay}
                          shouldDisableTime={(time, clock) => {
                            if (clock == 'hours') {
                              return time == 13;
                            }
                            if (clock == 'minutes') {
                              if (startDate.hour() == 12 && time == 30) {
                                return true;
                              }
                              if (startDate.hour() == 18 && time == 30) {
                                return true;
                              }
                            }
                          }}
                          inputFormat="YYYY/MM/DD hh:mm a"
                          helperText="Some important text"
                          minutesStep={30}
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
                      <FormControl fullWidth>
                        <InputLabel shrink id="paymentMethod">
                          Metodo de Pago *
                        </InputLabel>
                        <Select
                          labelId="paymentMethod"
                          id="paymentMethod"
                          name="paymentMethod"
                          displayEmpty
                          value={paymentMethod}
                          required
                          input={<OutlinedInput notched label="Metodo de Pago" required />}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          renderValue={(value) => {
                            const items = payMethodsList.find((v) => v.payMethodValue == value);
                            return (
                              <Box color="#757575" sx={{ display: 'flex', gap: 2 }}>
                                <SvgIcon>
                                  <AddCardIcon />
                                </SvgIcon>
                                <Box sx={{ color: 'black', fontSize: '0.9rem' }}>
                                  {items ? items.payMethodValue : 'Selecciona un metodo de pago'}
                                </Box>
                              </Box>
                            );
                          }}
                        >
                          <MenuItem value="">Selecciona un metodo de pago</MenuItem>
                          {payMethodsList.map((payMethod, index) => (
                            <MenuItem value={payMethod.payMethodValue} key={index}>
                              {payMethod.payMethodName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                      <FormControl fullWidth>
                        <InputLabel shrink id="typeOfEquipment">
                          Tipo de Dispositivo *
                        </InputLabel>
                        <Select
                          labelId="typeOfEquipment"
                          id="typeOfEquipment"
                          name="typeOfEquipment"
                          displayEmpty
                          defaultValue=""
                          value={typeOfEquipment.typeOfEquipment}
                          input={<OutlinedInput notched label="Tipo de dispositivo *" required />}
                          onChange={(e) => {
                            setEquipmentBrand('');
                            setTypeOfEquipment({ typeOfEquipment: String(e.target.value) });
                          }}
                          renderValue={(value) => {
                            const item = typeOfEquipmentList.find(
                              (v) => v.idTypeOfEquipment == value,
                            );
                            return (
                              <Box color="#757575" sx={{ display: 'flex', gap: 2 }}>
                                <SvgIcon>
                                  <DevicesOtherIcon />
                                </SvgIcon>
                                <Box sx={{ color: 'black', fontSize: '0.9rem' }}>
                                  {item
                                    ? item.equipmentTypeName
                                    : 'Seleccione un tipo de dispositivo'}
                                </Box>
                              </Box>
                            );
                          }}
                        >
                          <MenuItem value="">Seleccione un tipo de dispositivo</MenuItem>
                          {typeOfEquipmentList.map((typeOfEquipmentData, index) => (
                            <MenuItem value={typeOfEquipmentData.idTypeOfEquipment} key={index}>
                              {typeOfEquipmentData.equipmentTypeName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Col>
                    {typeOfEquipment.typeOfEquipment === '' ? (
                      <Col md="6">
                        <TextField
                          id="typeOfEquipment"
                          name="select"
                          required
                          disabled
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DevicesOtherIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Col>
                    ) : typeOfEquipment.typeOfEquipment === '1' ? (
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
                        <FormControl fullWidth>
                          <InputLabel shrink id="typeOfEquipment">
                            Marca del computador *
                          </InputLabel>
                          <Select
                            labelId="equipmentBrand"
                            id="equipmentBrand"
                            name="equipmentBrand"
                            displayEmpty
                            required
                            defaultValue=""
                            value={equipmentBrand}
                            input={
                              <OutlinedInput notched label="Marca del computador *" required />
                            }
                            onChange={(e) => setEquipmentBrand(e.target.value)}
                            renderValue={(value) => {
                              const item = computersList.find((v) => v.brandName === value);
                              return (
                                <Box color="#757575" sx={{ display: 'flex', gap: 2 }}>
                                  <SvgIcon>
                                    <ComputerIcon />
                                  </SvgIcon>
                                  <Box sx={{ color: 'black', fontSize: '0.9rem' }}>
                                    {item ? item.brandName : 'Seleccione marca de computador'}
                                  </Box>
                                </Box>
                              );
                            }}
                          >
                            <MenuItem defaultChecked value="">
                              Seleccione una Marca de Computador
                            </MenuItem>
                            {computersList.map((computerData, index) => (
                              <MenuItem value={computerData.brandName} key={index}>
                                {computerData.brandName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                        <FormControl fullWidth>
                          <InputLabel shrink id="typeOfEquipment">
                            Marca del celular *
                          </InputLabel>
                          <Select
                            labelId="equipmentBrand"
                            id="equipmentBrand"
                            name="equipmentBrand"
                            displayEmpty
                            required
                            defaultValue=""
                            value={equipmentBrand}
                            input={<OutlinedInput notched label="Marca del celular *" required />}
                            onChange={(e) => setEquipmentBrand(e.target.value)}
                            renderValue={(value) => {
                              const item = cellphoneList.find((v) => v.brandName === value);
                              return (
                                <Box color="#757575" sx={{ display: 'flex', gap: 2 }}>
                                  <SvgIcon>
                                    <PhoneAndroidIcon />
                                  </SvgIcon>
                                  <Box sx={{ color: 'black', fontSize: '0.9rem' }}>
                                    {item ? item.brandName : 'Seleccione marca de celular'}
                                  </Box>
                                </Box>
                              );
                            }}
                          >
                            <MenuItem value="">Seleccione una marca de celular</MenuItem>
                            {cellphoneList.map((cellphoneData, index) => (
                              <MenuItem value={cellphoneData.brandName} key={index}>
                                {cellphoneData.brandName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                    ) : typeOfEquipment.typeOfEquipment === '3' ? (
                      <Col md="6">
                        <FormControl fullWidth>
                          <InputLabel shrink id="typeOfEquipment">
                            Marca de la tablet *
                          </InputLabel>
                          <Select
                            labelId="equipmentBrand"
                            id="equipmentBrand"
                            name="equipmentBrand"
                            displayEmpty
                            required
                            defaultValue=""
                            value={equipmentBrand}
                            input={<OutlinedInput notched label="Marca de la tablet *" required />}
                            onChange={(e) => setEquipmentBrand(e.target.value)}
                            renderValue={(value) => {
                              const item = tabletsList.find((v) => v.brandName === value);
                              return (
                                <Box color="#757575" sx={{ display: 'flex', gap: 2 }}>
                                  <SvgIcon>
                                    <TabletIcon />
                                  </SvgIcon>
                                  <Box sx={{ color: 'black', fontSize: '0.9rem' }}>
                                    {item ? item.brandName : 'Seleccione marca de tablet'}
                                  </Box>
                                </Box>
                              );
                            }}
                          >
                            <MenuItem defaultChecked value="">
                              Seleccione una marca de tablet
                            </MenuItem>
                            {tabletsList.map((tabletData, index) => (
                              <MenuItem value={tabletData.brandName} key={index}>
                                {tabletData.brandName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Col>
                    ) : (
                      <Col md="6">
                        <FormControl fullWidth>
                          <InputLabel shrink id="typeOfEquipment">
                            Marca del smartWatch *
                          </InputLabel>
                          <Select
                            labelId="equipmentBrand"
                            id="equipmentBrand"
                            name="equipmentBrand"
                            displayEmpty
                            required
                            defaultValue=""
                            value={equipmentBrand}
                            input={
                              <OutlinedInput notched label="Marca del smartWatch *" required />
                            }
                            onChange={(e) => setEquipmentBrand(e.target.value)}
                            renderValue={(value) => {
                              const item = smartWatchesList.find((v) => v.brandName === value);
                              return (
                                <Box color="#757575" sx={{ display: 'flex', gap: 2 }}>
                                  <SvgIcon>
                                    <WatchIcon />
                                  </SvgIcon>
                                  <Box sx={{ color: 'black', fontSize: '0.9rem' }}>
                                    {item ? item.brandName : 'Seleccione marca de smartWatch'}
                                  </Box>
                                </Box>
                              );
                            }}
                          >
                            <MenuItem defaultChecked value="">
                              Seleccione una marca de smartWatch
                            </MenuItem>
                            {smartWatchesList.map((smartWatchData, index) => (
                              <MenuItem value={smartWatchData.brandName} key={index}>
                                {smartWatchData.brandName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <NumbersIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                  {verifyResponse}
                  <Row className="my-3">
                    <Col>
                      <TextField
                        id="autoDiagnosis"
                        name="autoDiagnosis"
                        placeholder="Máximo 250 caracteres"
                        type="textarea"
                        maxLength={250}
                        multiline
                        fullWidth
                        rows={2}
                        label="Describe brevemente en qué falla tu equipo"
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
