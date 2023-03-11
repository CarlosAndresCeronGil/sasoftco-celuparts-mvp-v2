/* eslint-disable */
import React, { useEffect, useState } from "react";
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
  Input
} from "reactstrap";

import { NumberFormatBase } from "react-number-format";

import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import getSingleRepair from "../../services/getSingleRepair";
import putRepair from "../../services/putRepair";
import getRequestNotification from "../../services/getRequestNotification";
import putRequestNotification from "../../services/putRequestNotification";
import getTechnicianByEmail from "../../services/getTechnicianByEmail";
import getPartsInfo from "../../services/getPartsInfo";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getSearchRepeatedPartsToRepair from "../../services/getSearchRepeatedPartsToRepair";
import postPartsToRepair from "../../services/postPartsToRepair";
import putPartsToRepair from "../../services/putPartsToRepair";
import getCelupartsInfo from "../../services/getCelupartsInfo";
import getPartsToRepairByIdRepair from "../../services/getPartsToRepairByIdRepair";
import deletePartsToRepairByIdRequestAndPart from "../../services/deletePartsToRepairByIdRequestAndPart";
import putRequestStatus from "../../services/putRequestStatus";
import postRequestHistory from "../../services/postRequestHistory";
import getSingleRequestStatus from "../../services/getSingleRequestStatus";
import MyCustomNumberFormat from "../../components/FormatValue";
import postRequestNotification from "../../services/postRequestNotification";

export default function UpdateRepairForm(props) {
  const [idTechnician, setIdTechnician] = useState({ idTechnician: 0 });
  const [deviceDiagnostic, setDeviceDiagnostic] = useState({
    deviceDiagnostic: ""
  });
  const [repairDiagnostic, setRepairDiagnostic] = useState({
    repairDiagnostic: ""
  });
  const [repairStartDate, setRepairStartDate] = useState({
    repairStartDate: new Date()
  });
  const [repairDate, setRepairDate] = useState({ repairDate: new Date() });
  const [repairQuote, setRepairQuote] = useState({ repairQuote: 0 });
  const [idRequest, setIdRequest] = useState({ idRequest: 0 });
  const [priceReviewedByAdmin, setPriceReviewedByAdmin] = useState({
    priceReviewedByAdmin: false
  });
  const [isRepairDateNull, setIsRepairDateNull] = useState({
    isRepairDateNull: false
  });
  const [isRepairStartDateNull, setIsRepairStartDateNull] = useState({
    isRepairStartDateNull: false
  });

  const [celupartsContactPhone, setCelupartsContactPhone] = useState("");
  const [celupartsContactEmail, setCelupartsContactEmail] = useState("");

  const [nullFinishDateArrived, setNullFinishDateArrived] = useState(false);
  const [nullStartDateArrived, setNullStartDateArrived] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);

  const [isRepairStarted, setIsRepairStarted] = useState(false);
  const [isRepairFinished, setIsRepairFinished] = useState(false);

  //Control de los checkbox de la tabla de partes
  const [listOfParts, setListOfParts] = useState([]);
  const [listOfReplaceCheckedParts, setListOfReplaceCheckedParts] = useState(
    []
  );
  const [listOfRepairCheckedParts, setListOfRepairCheckedParts] = useState([]);
  const [listOfUncheckedParts, setListOfUncheckedParts] = useState([]);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState(location.state.status);
  const [checkRepair, setcheckRepair] = useState(
    repairDate.repairDate ? "off" : "on"
  );
  /*
   *   Usado para verificar que el usuario logeado sea tecnico, en caso que lo sea
   *   no mostrara el input de "Id de tecnico asociado" dado que lo tomara automaticamente
   */
  const [isTechnician, setIsTechnician] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const postListOfRepairCheckedParts = () => {
    listOfRepairCheckedParts.map(repariPart =>
      getSearchRepeatedPartsToRepair({
        idRepair: location.state.idRepair,
        partName: repariPart
      }).then(responseSearchRepeated => {
        // console.log("responseSearchRepeated status: ", responseSearchRepeated.status)
        if (responseSearchRepeated.status == 404) {
          postPartsToRepair({
            idRepair: location.state.idRepair,
            part: repariPart,
            toReplace: false,
            toRepair: true
          }).catch(error => {
            console.log("Error post partToRepair", error);
          });
        } else {
          // console.log("Es nueva registro ", responseSearchRepeated)
          putPartsToRepair({
            idPartsToRepair: responseSearchRepeated[0].idPartsToRepair,
            idRepair: responseSearchRepeated[0].idRepair,
            part: responseSearchRepeated[0].part,
            toReplace: false,
            toRepair: true
          }).catch(error => {
            console.log("Error put partsToRepair", error);
          });
        }
      })
    );
  };

  const postListOfReplaceCheckedParts = () => {
    listOfReplaceCheckedParts.map(repariPart =>
      getSearchRepeatedPartsToRepair({
        idRepair: location.state.idRepair,
        partName: repariPart
      }).then(responseSearchRepeated => {
        // console.log("responseSearchRepeated status: ", responseSearchRepeated.status)
        if (responseSearchRepeated.status == 404) {
          postPartsToRepair({
            idRepair: location.state.idRepair,
            part: repariPart,
            toReplace: true,
            toRepair: false
          }).catch(error => {
            console.log("Error post partToRepair", error);
          });
        } else {
          // console.log("Es nueva registro ", responseSearchRepeated)
          putPartsToRepair({
            idPartsToRepair: responseSearchRepeated[0].idPartsToRepair,
            idRepair: responseSearchRepeated[0].idRepair,
            part: responseSearchRepeated[0].part,
            toReplace: true,
            toRepair: false
          }).catch(error => {
            console.log("Error put partsToRepair", error);
          });
        }
      })
    );
  };

  const postUnCheckedParts = () => {
    listOfUncheckedParts.map(uncheckedPart =>
      deletePartsToRepairByIdRequestAndPart({
        idRepair: location.state.idRepair,
        partName: uncheckedPart
      })
    );
  };

  const handleSubmitInfo = e => {
    setLoadingPut(true);

    nullFinishDateArrived && nullStartDateArrived
      ? //PRODUCTO REVISADO SIN SER ACEPTADA LA COTIZACION
        putRepair({
          idRepair: location.state.idRepair,
          idRequest: idRequest.idRequest,
          idTechnician: idTechnician.idTechnician,
          repairDate: null,
          repairStartDate: null,
          deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
          repairQuote: repairQuote.repairQuote,
          priceReviewedByAdmin:
            (isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin) &&
            Number(repairQuote.repairQuote) > 0
              ? true
              : false
        })
          .then(data => {
            postListOfRepairCheckedParts();
            postListOfReplaceCheckedParts();
            postUnCheckedParts();
            putRequestStatus({
              idRequestStatus: location.state.idStatus,
              idRequest: idRequest.idRequest,
              status: "Revisado",
              paymentStatus: "No Pago"
            })
              .then(data => {
                // console.log("DATA", data);
                /*Aqui se mira el estado de la solicitud, para asi, enviar un mensaje en la 
                    notificacion a quien corresponda*/
                postRequestHistory({
                  idRequest: data.idRequest,
                  status: "Revisado",
                  date: new Date()
                });
                setStatus("Revisado");
                !isUserAdmin &&
                  postRequestNotification({
                    idRequest: idRequest.idRequest,
                    message: `Un técnico ha realizado la revisión del producto ${location.state.data.equipmentData}`,
                    wasReviewed: false,
                    notificationType: "to_admin"
                  }).catch(error => {
                    console.log(error);
                  });
                !isUserAdmin &&
                  postRequestNotification({
                    idRequest: idRequest.idRequest,
                    message: `Un técnico ha realizado la revisión del producto ${location.state.data.equipmentData}`,
                    wasReviewed: false,
                    notificationType: "to_aux_admin"
                  })
                    .catch(error => {
                      console.log(error);
                    })
                    .finally(() => {
                      Swal.fire({
                        icon: "success",
                        title: "Exito!",
                        text: "Estado de reparación actualizadisimo!"
                      }).then(response => {
                        navigate(-1);
                      });
                    });
                !isUserAdmin
                  ? notifications.map(tdata =>
                      tdata.idRequest === idRequest.idRequest
                        ? putRequestNotification({
                            idRequestNotification: tdata.idRequestNotification,
                            idRequest: tdata.idRequest,
                            message:
                              "Tu dispositivo ya ha sido revisado por uno de nuestros técnicos",
                            wasReviewed: false,
                            notificationType: "to_customer"
                          }).catch(error => {
                            console.log(error);
                          })
                        : null
                    )
                  : null;
              })
              .catch(error => {
                console.log(error);
              });

            isUserAdmin
              ? notifications.map(tdata =>
                  tdata.idRequest === idRequest.idRequest
                    ? putRequestNotification({
                        idRequestNotification: tdata.idRequestNotification,
                        idRequest: tdata.idRequest,
                        message:
                          'Tu dispositivo ya tiene precio de reparación! haz click en "Mis reparaciones" para revisar',
                        wasReviewed: false,
                        notificationType: "to_customer"
                      })
                        .then(response => {
                          // console.log("Exito!", response)
                        })
                        .then(finalResponse => {
                          console.log("entre en repair ultimo");

                          Swal.fire({
                            icon: "success",
                            title: "Exito!",
                            text: "Estado de reparación actualizadisimo!"
                          }).then(response => {
                            navigate(-1);
                          });
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    : null
                )
              : null;
            setLoadingPut(false);
          })
          .catch(error => {
            console.log(error);
            setLoadingPut(false);
          })
      : nullFinishDateArrived && !nullStartDateArrived
      ? putRepair({
          idRepair: location.state.idRepair,
          idRequest: idRequest.idRequest,
          idTechnician: idTechnician.idTechnician,
          repairDate: null,
          repairStartDate: repairStartDate.repairStartDate,
          deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
          repairQuote: repairQuote.repairQuote,
          priceReviewedByAdmin:
            (isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin) &&
            Number(repairQuote.repairQuote) > 0
              ? true
              : false
        })
          .then(data => {
            // console.log(data)
            postListOfRepairCheckedParts();
            postListOfReplaceCheckedParts();
            postUnCheckedParts();
            notifications.map(tdata =>
              tdata.idRequest === idRequest.idRequest
                ? putRequestNotification({
                    idRequestNotification: tdata.idRequestNotification,
                    idRequest: tdata.idRequest,
                    message:
                      'Tu dispositivo ya tiene precio de reparación! haz click en "Mis reparaciones" para revisar',
                    wasReviewed: false,
                    notificationType: "to_customer"
                  })
                    .then(response => {
                      // console.log("Exito!", response)
                    })
                    .finally(finalResponse => {
                      Swal.fire({
                        icon: "success",
                        title: "Exito!",
                        text: "Estado de reparación actualizadisimo!"
                      }).then(response => {
                        navigate(-1);
                      });
                    })
                    .catch(error => {
                      console.log(error);
                    })
                : null
            );
            setLoadingPut(false);
          })
          .catch(error => {
            console.log(error);
            setLoadingPut(false);
          })
      : nullStartDateArrived && !nullFinishDateArrived
      ? putRepair({
          idRepair: location.state.idRepair,
          idRequest: idRequest.idRequest,
          idTechnician: idTechnician.idTechnician,
          repairDate: repairDate.repairDate,
          repairStartDate: null,
          deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
          repairQuote: repairQuote.repairQuote,
          priceReviewedByAdmin:
            (isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin) &&
            Number(repairQuote.repairQuote) > 0
              ? true
              : false
        })
          .then(data => {
            // console.log(data)
            postListOfRepairCheckedParts();
            postListOfReplaceCheckedParts();
            postUnCheckedParts();
            notifications.map(tdata =>
              tdata.idRequest === idRequest.idRequest
                ? putRequestNotification({
                    idRequestNotification: tdata.idRequestNotification,
                    idRequest: tdata.idRequest,
                    message:
                      'Tu dispositivo ya tiene precio de reparación! haz click en "Mis reparaciones" para revisar',
                    wasReviewed: false,
                    notificationType: "to_customer"
                  })
                    .then(response => {
                      console.log("Exito!", response);
                    })
                    .finally(finalResponse => {
                      Swal.fire({
                        icon: "success",
                        title: "Exito!",
                        text: "Estado de reparación actualizadisimo!"
                      }).then(response => {
                        navigate(-1);
                      });
                    })
                    .catch(error => {
                      console.log(error);
                    })
                : null
            );
            setLoadingPut(false);
          })
          .catch(error => {
            console.log(error);
            setLoadingPut(false);
          })
      : putRepair({
          idRepair: location.state.idRepair,
          idRequest: idRequest.idRequest,
          idTechnician: idTechnician.idTechnician,
          repairDate: repairDate.repairDate,
          repairStartDate: repairStartDate.repairStartDate,
          deviceDiagnostic: deviceDiagnostic.deviceDiagnostic,
          repairDiagnostic: repairDiagnostic.repairDiagnostic,
          repairQuote: repairQuote.repairQuote,
          priceReviewedByAdmin:
            (isUserAdmin || priceReviewedByAdmin.priceReviewedByAdmin) &&
            Number(repairQuote.repairQuote) > 0
              ? true
              : false
        })
          .then(data => {
            putRequestStatus({
              idRequestStatus: location.state.idStatus,
              idRequest: idRequest.idRequest,
              status: "Reparado pendiente de pago",
              paymentStatus: "No Pago"
            }).then(data => {
              postRequestHistory({
                idRequest: data.idRequest,
                status: "Reparado pendiente de pago",
                date: new Date()
              }).then(() => setStatus("Reparado pendiente de pago"));
              notifications.map(tdata =>
                tdata.idRequest === idRequest.idRequest
                  ? putRequestNotification({
                      idRequestNotification: tdata.idRequestNotification,
                      idRequest: tdata.idRequest,
                      message:
                        "Tú dispositivo ha sido reparado, contactate con el administrador al siguiente número: " +
                        celupartsContactPhone +
                        " o al siguiente correo " +
                        celupartsContactEmail +
                        " para confirmar pago",
                      wasReviewed: false,
                      notificationType: "to_customer"
                    })
                      .then(response => {
                        navigate(-1);
                      })
                      .catch(error => {
                        console.log(error);
                      })
                  : null
              );
            });

            postListOfRepairCheckedParts();
            postListOfReplaceCheckedParts();
            postUnCheckedParts();
            setLoadingPut(false);
          })
          .finally(finalResponse => {
            Swal.fire({
              icon: "success",
              title: "Exito!",
              text: "Estado de reparación actualizadisimo!"
            }).then(response => {
              navigate(-1);
            });
          })
          .catch(error => {
            console.log(error);
            setLoadingPut(false);
          });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      listOfRepairCheckedParts.length == 0 &&
      listOfReplaceCheckedParts.length == 0
    ) {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¿Deseas guardar los cambios sin asociar partes a reparar o reemplazar? ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Guardar cambios",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.isConfirmed) {
          console.log("entre");
          handleSubmitInfo(e);
          return;
        }
      });
    } else {
      console.log("entre 2");
      handleSubmitInfo(e);
      return;
    }
  };

  useEffect(
    function () {
      setLoading(true);
      //admin aux_admin
      JSON.parse(localStorage.getItem("user")).role === "admin" ||
      JSON.parse(localStorage.getItem("user")).role === "aux_admin"
        ? setIsUserAdmin(true)
        : setIsUserAdmin(false);
      getSingleRepair({ id: location.state.idRepair })
        .then(response => {
          // console.log("response single repair", response)
          setIdTechnician({ idTechnician: response[0].idTechnician });
          setDeviceDiagnostic({
            deviceDiagnostic: response[0].deviceDiagnostic
          });
          setRepairQuote({ repairQuote: response[0].repairQuote });
          setIdRequest({ idRequest: response[0].idRequest });
          setPriceReviewedByAdmin({
            priceReviewedByAdmin: response[0].priceReviewedByAdmin
          });
          setRepairDiagnostic({
            repairDiagnostic: response[0].repairDiagnostic
          });
          if (response[0].repairDate == null) {
            setIsRepairDateNull({ isRepairDateNull: true });
            setRepairDate({ repairDate: new Date() });
            setNullFinishDateArrived(true);
          } else {
            setIsRepairDateNull({ isRepairDateNull: false });
            setRepairDate({ repairDate: new Date(response[0].repairDate) });
          }

          if (response[0].repairStartDate == null) {
            setIsRepairStartDateNull({ isRepairStartDateNull: true });
            setRepairStartDate({ repairStartDate: new Date() });
            setNullStartDateArrived(true);
          } else {
            setIsRepairStartDateNull({ isRepairStartDateNull: false });
            setRepairStartDate({
              repairStartDate: new Date(response[0].repairStartDate)
            });
          }

          if (JSON.parse(localStorage.getItem("user")).role == "tecnico") {
            getTechnicianByEmail({
              email: JSON.parse(localStorage.getItem("user")).email
            }).then(responseTechnicianInfo => {
              setIdTechnician({
                idTechnician: responseTechnicianInfo.idTechnician
              });
            });
            setIsTechnician(true);
          } else {
            setIsTechnician(false);
          }

          getRequestNotification()
            .then(response => {
              setNotifications(response);
              getPartsInfo()
                .then(responsePartsInfo => {
                  setListOfParts(responsePartsInfo);
                  console.log("parts info ", responsePartsInfo);
                  getPartsToRepairByIdRepair({
                    id: location.state.idRepair
                  })
                    .then(responsePartsToRepairByIdRepair => {
                      console.log(responsePartsToRepairByIdRepair);
                      responsePartsToRepairByIdRepair.map(part =>
                        part.toRepair == true
                          ? setListOfRepairCheckedParts(array => [
                              ...array,
                              part.part
                            ])
                          : setListOfReplaceCheckedParts(array => [
                              ...array,
                              part.part
                            ])
                      );
                      setLoading(false);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                })
                .catch(error => {
                  console.log(error);
                  setLoading(false);
                });
            })
            .catch(error => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    },
    [location.state.idRepair]
  );

  useEffect(() => {
    console.log();
    getSingleRequestStatus({ id: idRequest.idRequest }).then(data => {
      console.log(data);
      setStatus(data.status);
    });
  }, [idRequest.idRequest]);

  useEffect(() => {
    getCelupartsInfo()
      .then(response => {
        setCelupartsContactPhone(response[0].contactPhone);
        setCelupartsContactEmail(response[0].contactEmail);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleIdTechnicianChange = e => {
    setIdTechnician(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeviceDiagnosticChange = e => {
    setDeviceDiagnostic(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleRepairDiagnosticChange = e => {
    setRepairDiagnostic(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleRepairQuoteChange = ({ value }, sourceInfo) => {
    const { event } = sourceInfo;
    if (!event) return;
    console.log(value);
    if (value == "0") return;
    setRepairQuote(prev => ({
      ...prev,
      [event.target.name]: value
    }));
  };

  const handleStartRepairCheck = e => {
    setIsRepairStarted(!isRepairStarted);
    setRepairStartDate({ repairStartDate: new Date() });
    setNullStartDateArrived(!nullStartDateArrived);
  };

  const handleFinishRepairCheck = e => {
    setIsRepairFinished(!isRepairFinished);
    setRepairDate({ repairDate: new Date() });
    setNullFinishDateArrived(!nullFinishDateArrived);
    setcheckRepair(checkRepair == "on" ? "off" : "on");
  };

  const handleAddReplace = (e, partName) => {
    if (e.target.checked) {
      setListOfReplaceCheckedParts(array => [...array, partName]);
      setListOfUncheckedParts(current =>
        current.filter(name => name != partName)
      );
    } else {
      // console.log('⛔️ Checkbox is NOT checked');
      setListOfReplaceCheckedParts(current =>
        current.filter(name => name != partName)
      );
      setListOfUncheckedParts(array => [...array, partName]);
    }
  };

  const handleAddRepair = (e, partName) => {
    if (e.target.checked) {
      setListOfRepairCheckedParts(array => [...array, partName]);
      setListOfUncheckedParts(current =>
        current.filter(name => name != partName)
      );
    } else {
      // console.log('⛔️ Checkbox is NOT checked');
      setListOfRepairCheckedParts(current =>
        current.filter(name => name != partName)
      );
      setListOfUncheckedParts(array => [...array, partName]);
    }
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>
        <Row>
          <Col>
            <Card className="container">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      allowScrollButtonsMobile
                      scrollButtons="auto"
                      variant="scrollable"
                    >
                      <Tab
                        wrapped
                        fullwidth
                        label="Revisión Técnica"
                        value="1"
                      />
                      {(location.state.statusQuote === "Aceptada" &&
                        location.state.status == "En reparacion") ||
                      !isRepairStartDateNull.isRepairStartDateNull ? (
                        <Tab wrapped fullwidth label="Reparación" value="2" />
                      ) : (
                        <Tab
                          wrapped
                          fullwidth
                          label="Reparación"
                          value="2"
                          disabled
                        />
                      )}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                        <CardSubtitle
                          tag="h6"
                          className="border-bottom p-1 mb-2"
                        >
                          <i className="bi bi-eyeglasses"> </i>
                          <strong>Datos de la Revisión</strong>
                        </CardSubtitle>

                        <FormGroup>
                          <Label for="deviceDiagnostic">
                            Diagnostico del dispositivo
                          </Label>
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
                                            <Label check>He empezado mi labor de reparación</Label>
                                        </FormGroup> */}

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
                              {listOfParts.map((part, index) => (
                                <tr key={index} className="border-top">
                                  <td>{part.partName}</td>
                                  <td>
                                    <Input
                                      type="checkbox"
                                      checked={listOfReplaceCheckedParts.some(
                                        x => x == part.partName
                                      )}
                                      disabled={listOfRepairCheckedParts.some(
                                        x => x == part.partName
                                      )}
                                      onChange={e =>
                                        handleAddReplace(e, part.partName)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Input
                                      type="checkbox"
                                      checked={listOfRepairCheckedParts.some(
                                        x => x == part.partName
                                      )}
                                      disabled={listOfReplaceCheckedParts.some(
                                        x => x == part.partName
                                      )}
                                      onChange={e =>
                                        handleAddRepair(e, part.partName)
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </FormGroup>

                        {JSON.parse(localStorage.getItem("user")).role ==
                          "admin" ||
                        JSON.parse(localStorage.getItem("user")).role ==
                          "aux_admin" ? (
                          <FormGroup>
                            <Label
                              style={{ display: "block" }}
                              for="repairQuote"
                            >
                              Cuota de reparación
                            </Label>
                            <MyCustomNumberFormat
                              id="repairQuote"
                              name="repairQuote"
                              required
                              defaultValue={repairQuote.repairQuote}
                              placeholder="Ingrese la cuota de reparación del producto"
                              onValueChange={handleRepairQuoteChange}
                            />
                          </FormGroup>
                        ) : null}

                        {loadingPut ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Cargando...</span>
                          </button>
                        ) : (
                          <>
                            {(JSON.parse(localStorage.getItem("user")).role ===
                              "admin" ||
                              JSON.parse(localStorage.getItem("user")).role ===
                                "aux_admin") &&
                            location.state.statusQuote != "Aceptada" ? (
                              <Button color="primary">Guardar</Button>
                            ) : priceReviewedByAdmin.priceReviewedByAdmin ? (
                              <Button color="primary" disabled>
                                Guardar
                              </Button>
                            ) : (
                              <Button color="primary">Guardar</Button>
                            )}
                          </>
                        )}
                      </Form>
                    </CardBody>
                  </TabPanel>
                  <TabPanel value="2">
                    <CardBody>
                      <Form onSubmit={handleSubmit}>
                        {/* <FormGroup check>
                                            <Input disabled={!isRepairStartDateNull.isRepairStartDateNull} type='checkbox' onClick={handleStartRepairCheck} />
                                            <Label check>He empezado mi labor de reparación</Label>
                                        </FormGroup> */}

                        <FormGroup>
                          {console.log(checkRepair)}
                          <Input
                            disabled={!isRepairDateNull.isRepairDateNull}
                            type="checkbox"
                            value={checkRepair}
                            defaultChecked={
                              !isRepairDateNull.isRepairDateNull ? true : false
                            }
                            onChange={handleFinishRepairCheck}
                          />
                          <Label>He terminado mi reparación exitosamente</Label>
                        </FormGroup>

                        <FormGroup className="mt-3">
                          <Label for="repairDiagnostic">
                            Descripción de la reparación
                          </Label>
                          <Input
                            id="repairDiagnostic"
                            name="repairDiagnostic"
                            placeholder="Ingrese una descripción del dispositivo reparado"
                            type="textarea"
                            value={repairDiagnostic.repairDiagnostic}
                            onChange={handleRepairDiagnosticChange}
                            required
                            disabled={!isRepairDateNull.isRepairDateNull}
                          />
                        </FormGroup>

                        {loadingPut ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="sr-only">Cargando...</span>
                          </button>
                        ) : isRepairDateNull.isRepairDateNull &&
                          checkRepair == "on" ? (
                          <Button color="primary">Guardar</Button>
                        ) : (
                          <Button color="primary" disabled>
                            Guardar
                          </Button>
                        )}
                      </Form>
                    </CardBody>
                  </TabPanel>
                </TabContext>
              </Box>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
