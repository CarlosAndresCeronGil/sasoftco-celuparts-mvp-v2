import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import RequestStatusForm from "./RequestStatusForm";
import UpdateRepairForm from "./UpdateRepairForm";
import RepairPaymentForm from "./RepairPaymentForm";

// eslint-disable-next-line react/prop-types
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

// eslint-disable-next-line react/prop-types
export default function UpdateStateRepair() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Button className="btn btn-danger mb-4" onClick={handleBackPage}>
        Atrás
      </Button>
      <Box sx={{ marginBottom: "1rem", display: "flex", fontSize: "0.8rem" }}>
        {location.state.idRepair && (
          <Box sx={{ marginRight: " 1rem" }}>
            <strong>Id Reparación : </strong> {location.state.idRepair}
          </Box>
        )}
        <strong>Equipo</strong> : {location.state.data.equipmentData}
      </Box>
      <AppBar position="relative" sx={{ paddingRight: 0, paddingLeft: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ textTransform: "capitalize" }}
          aria-label="full width tabs example"
        >
          <Tab
            sx={{ textTransform: "capitalize" }}
            label="Actualizar Estado de solicitud"
            {...a11yProps(0)}
          />

          {JSON.parse(localStorage.getItem("user")).role ===
            "mensajero" ? null : location.state.status === "Iniciada" ||
              location.state.status === "En proceso de recogida" ||
              location.state.status === "En devolucion" ||
              location.state.status === "Devuelto sin reparacion" ||
              location.state.status === "Abandonada" ||
              location.state.status === "Terminada" ||
              location.state.status === "Anulado por IMEI" ||
              location.state.status === "En camino" ? (
            <Tab
              disabled
              sx={{ textTransform: "capitalize" }}
              label="Actualizar Estado de Reparación"
              {...a11yProps(1)}
            />
          ) : (
            <Tab
              sx={{ textTransform: "capitalize" }}
              label="Actualizar Estado de Reparación"
              {...a11yProps(1)}
            />
          )}
          {(JSON.parse(localStorage.getItem("user")).role === "admin" ||
            JSON.parse(localStorage.getItem("user")).role === "aux_admin") && location?.state.statusQuote === 'Aceptada' &&
            !(location.state.status === "Iniciada" ||
              location.state.status === "En proceso de recogida" ||
              location.state.status === "Recibida tecnico" ||
              location.state.status === "En devolucion" ||
              location.state.status === "Devuelto sin reparacion" ||
              location.state.status === "Abandonada" ||
              location.state.status === "Terminada" ||
              location.state.status === "Anulado por IMEI" ||
              location.state.status === "En camino") ? (
            <Tab
              sx={{ textTransform: "capitalize" }}
              label="Actualizar Pago Reparación"
              {...a11yProps(2)}
            />
          ) : (
            <Tab
              disabled
              sx={{ textTransform: "capitalize" }}
              label="Actualizar Pago Reparación"
              {...a11yProps(2)}
            />
          )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        sx={{ paddingRight: 0, paddingLeft: 0 }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <RequestStatusForm />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <UpdateRepairForm />
        </TabPanel>

        <TabPanel
          value={value}
          index={2}
          dir={theme.direction}
          sx={{ zIndex: 3 }}
        >
          <RepairPaymentForm />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}