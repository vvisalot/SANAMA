import { format, parse, parseISO } from "date-fns";

const STATUS = {
  ATTENDED: 1,
  IN_CONSULTATION: 2,
  CANCELLED: 3,
  PENDING: 4,
  IN_TRIAGE: 5,
};

const getStatus = (estado) => {
  const statusMapping = {
    [STATUS.ATTENDED]: "Atendida",
    [STATUS.IN_CONSULTATION]: "En Consultorio",
    [STATUS.CANCELLED]: "Cancelada",
    [STATUS.PENDING]: "Pendiente",
    [STATUS.IN_TRIAGE]: "En Triaje",
  };
  return statusMapping[estado] || "Desconocido";
};

const formatFullName = ({ nombres, apellidoPaterno, apellidoMaterno }) =>
  `${nombres} ${apellidoPaterno} ${apellidoMaterno}`;

const formatDateAndTime = (fechaCita, horaCita) => {
  const formattedDate = format(parseISO(fechaCita), "dd/MM/yyyy");
  const formattedTime = format(
    parse(horaCita, "HH:mm:ss", new Date()),
    "hh:mm a"
  );
  return `${formattedDate} ${formattedTime}`;
};

export function parseAppointmentTable(data) {
  return data.map((row) => [
    { data: row.idCita },
    { data: row.codigoCita },
    { data: formatDateAndTime(row.fechaCita, row.horaCita) },
    { data: formatFullName(row.paciente) },
    { data: formatFullName(row.medico) },
    { data: row.medico.especialidad.nombre },
    { data: getStatus(row.estado) },
  ]);
}

export function parsePatientAppointmentTable(data) {
  return data.map((row) => [
    { data: row.idCita },
    { data: formatFullName(row.medico) },
    { data: row.medico.especialidad.nombre },
    { data: formatDateAndTime(row.fechaCita, row.horaCita) },
    { data: getStatus(row.estado) },
  ]);
}
