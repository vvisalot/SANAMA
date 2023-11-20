import { format, parse, parseISO } from "date-fns"

const STATUS = {
  ATTENDED: 1,
  IN_CONSULTATION: 2,
  CANCELLED: 3,
  PENDING: 4,
  IN_TRIAGE: 5,
}

export function getStatus(estado) {

  const statusMapping = {
    [STATUS.ATTENDED]: { text: "Atendida", className: "highlight-blue" },
    [STATUS.IN_CONSULTATION]: {
      text: "Consultorio",
      className: "highlight-orange",
    },
    [STATUS.CANCELLED]: { text: "Cancelada", className: "highlight-red" },
    [STATUS.PENDING]: { text: "Pendiente", className: "highlight-green" },
    [STATUS.IN_TRIAGE]: { text: "En Triaje", className: "highlight-yellow" },
  }
  return statusMapping[estado] || "Desconocido"
}

const formatFullName = ({ nombres, apellidoPaterno, apellidoMaterno }) =>
  `${nombres} ${apellidoPaterno} ${apellidoMaterno}`

const formatDateAndTime = (fechaCita, horaCita) => {
  const formattedDate = format(parseISO(fechaCita), "dd/MM/yyyy")
  const formattedTime = format(
    parse(horaCita, "HH:mm:ss", new Date()),
    " HH:mm"
  )
  return `${formattedDate} ${formattedTime}`
}

// export function parseAppointmentTable(data) {
//   return data.map((row) => {
//     const { text: estadoTexto, className: estadoClase } = getStatus(row.estado)
//     console.log(estadoTexto)
//     return [
//       { "data": row.idCita },
//       { "data": row.codigoCita },
//       { "data": formatDateAndTime(row.fechaCita, row.horaCita) },
//       { "data": formatFullName(row.paciente) },
//       { "data": formatFullName(row.medico) },
//       { "data": row.medico.especialidad.nombre },
//       { "data": estadoTexto, "className": estadoClase },
//     ]
//   })
// }


export function parsePatientAppointmentTable(data) {
  return data.map((row) => {

    const { text: estadoTexto, className: estadoClase } = getStatus(row.estado)
    return [
      { data: row.idCita },
      { data: formatFullName(row.medico) },
      { data: row.medico.especialidad.nombre },
      { data: formatDateAndTime(row.fechaCita, row.horaCita) },
      { data: estadoTexto, className: estadoClase },
    ]
  })
}

export function parseAppointmentTable(data) {
  return data.map((row) => ({
    idCita: row.idCita,
    codigo: row.codigoCita,
    date: formatDateAndTime(row.fechaCita, row.horaCita),
    patientName: formatFullName(row.paciente),
    doctorName: formatFullName(row.medico),
    specialty: row.medico.especialidad.nombre,
    status: row.estado,
  }))
}