import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Container,
  Paper,
  InputLabel,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useAppointments } from "@/context/AppointmentsContext";
import useAppointmentInfo from "./path/to/your/useAppointmentInfo";

const patientFieldsConfig = [
  { name: "codigoSeguro", label: "N° DE SEGURO" },
  { name: "dni", label: "DOCUMENTO DE IDENTIDAD" },
  { name: "tipoSeguro", label: "TIPO DE SEGURO" },
  { name: "nombres", label: "NOMBRES" },
  { name: "apellidoPaterno", label: "PRIMER APELLIDO" },
  { name: "apellidoMaterno", label: "SEGUNDO APELLIDO" },
  { name: "fechaNacimiento", label: "FECHA DE NACIMIENTO" },
  { name: "telefono", label: "TELEFONO" },
  { name: "correo", label: "CORREO" },
];

const camposAtencion = [
  { id: "numero-cita", label: "Número de cita", type: "text" },
  { id: "fecha-atencion", label: "Fecha de atención", type: "date" },
  { id: "hora-atencion", label: "Hora de atención", type: "time" },
  { id: "medico-responsable", label: "Médico responsable", type: "text" },
  { id: "especialidad", label: "Especialidad", type: "text" },
  { id: "dniAcompanhante", label: "DOCUMENTO ACOMPAÑANTE", type: "text" },
  { id: "nombreAcompanhante", label: "NOMBRES ACOMPAÑANTE", type: "text" },
  { id: "estado", label: "Estado", type: "text" },
];

function AppointmentInfo() {
  const theme = useTheme();
  const { appointmentData } = useAppointments();
  const {
    loading,
    error,
    isAppointmentRegistered,
    confirmationMessage,
    handleRegisterAppointment,
  } = useAppointmentInfo();

  const pacienteData = appointmentData.selectedPatientData;
  const doctorResponsable = appointmentData.selectedDoctor;
  const companionData = appointmentData.companionData;
  const nombreDoctor = doctorResponsable
    ? `${doctorResponsable.sexo === "M" ? "Dr." : "Dra."} ${
        doctorResponsable.nombres
      } ${doctorResponsable.apellidoPaterno} ${
        doctorResponsable.apellidoMaterno
      }`
    : "";
  const especialidadNombre =
    doctorResponsable && doctorResponsable.especialidad
      ? doctorResponsable.especialidad.nombre
      : "";
  const selectedTriage = appointmentData.selectedTriage; // Obtenemos el valor de selectedTriage

  return (
    <Container>
      <Paper elevation={3} style={{ padding: theme.spacing(3) }}>
        <Box sx={{ marginBottom: 4, color: "black" }}>
          <Typography variant="h5" gutterBottom>
            Información del paciente
          </Typography>
          <Grid container spacing={3}>
            {patientFieldsConfig.map((campo) => (
              <Grid item xs={4} key={campo.name}>
                <InputLabel htmlFor={campo.name}>{campo.label}</InputLabel>
                <TextField
                  type={campo.type}
                  id={campo.name}
                  name={campo.name}
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={pacienteData ? pacienteData[campo.name] : ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginBottom: 4, color: "black" }}>
          <Typography variant="h5" gutterBottom>
            Información de la atención
          </Typography>
          <Grid container spacing={3}>
            {camposAtencion.map((campo) => (
              <Grid item xs={4} key={campo.id}>
                <InputLabel htmlFor={campo.id}>{campo.label}</InputLabel>
                <TextField
                  type={campo.type}
                  id={campo.id}
                  name={campo.id}
                  variant="outlined"
                  required
                  fullWidth
                  defaultValue={
                    campo.id === "fecha-atencion"
                      ? appointmentData.selectedDate
                      : campo.id === "hora-atencion"
                      ? appointmentData.selectedHour
                      : campo.id === "medico-responsable"
                      ? nombreDoctor
                      : campo.id === "estado"
                      ? "PENDIENTE"
                      : campo.id === "especialidad"
                      ? especialidadNombre
                      : appointmentData[campo.id]
                  }
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegisterAppointment}
          disabled={loading || isAppointmentRegistered}
        >
          Registrar Cita
        </Button>

        {error && <Typography color="error">{error}</Typography>}
        {isAppointmentRegistered && (
          <Typography color="primary" style={{ marginTop: 16 }}>
            {confirmationMessage}
          </Typography>
        )}

        {error && <Typography color="error">{error}</Typography>}
        <Link href="/AppointmentManagement" passHref>
          <Button variant="contained" color="secondary" fullWidth>
            Volver
          </Button>
        </Link>
      </Paper>
    </Container>
  );
}

export default AppointmentInfo;
