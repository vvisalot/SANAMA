import { format, parse, parseISO } from 'date-fns'
import moment from 'moment'

const URGENCIA_TRIAJE = {
	RESUCITACION: 1,
	EMERGENCIA: 2,
	URGENCIA: 3,
	URGENCIA_MENOR: 4,
	SIN_URGENCIA: 5,
	NA: 6,
}

const ESTADO_TRIAJE = {
	ATENDIDA: 1,
	EN_TRIAJE: 2,
	CANCELADA: 3,
	PENDIENTE: 4,
}


export function getTriajeStatus(estado) {
	const statusMapping = {
		[ESTADO_TRIAJE.ATENDIDA]: { text: "Atendida", className: "highlight-blue" },
		[ESTADO_TRIAJE.EN_TRIAJE]: { text: "En Triaje", className: "highlight-yellow" },
		[ESTADO_TRIAJE.CANCELADA]: { text: "Cancelada", className: "highlight-red" },
		[ESTADO_TRIAJE.PENDIENTE]: { text: "Pendiente", className: "highlight-green" },
	}
	return statusMapping[estado] || "Desconocido"
}


export function priorityMapping() {
	return {
		1: { text: "Resucitacion", icon: "🔴" },
		2: { text: "Emergencia", icon: "🟠" },
		3: { text: "Urgencia", icon: "🟡" },
		4: { text: "Urgencia menor", icon: "🟢" },
		5: { text: "Sin Urgencia", icon: "🔵" },
		6: { text: "N.A.", icon: "⚪" },
	}
};

const formatDateAndTime = (fechaCita, horaCita) => {
	const formattedDate = format(parseISO(fechaCita), "dd/MM/yyyy")
	const formattedTime = format(parse(horaCita, "HH:mm:ss", new Date()), " HH:mm")
	return `${formattedDate} ${formattedTime}`
}

const formatFullName = ({ nombres, apellidoPaterno, apellidoMaterno }) =>
	`${nombres} ${apellidoPaterno} ${apellidoMaterno}`



export function parseTriajeTable(data) {
	return data.map((row) => ({
		idTriaje: row.idTriaje,
		codigoTriaje: row.codigoTriaje,
		fechaHoraActualizacion: formatDateAndTime(row.fechaTriaje, row.horaTriaje),
		dni: row.paciente.dni,
		nombreCompleto: formatFullName(row.paciente),
		prioridad: row.prioridad,
		estado: row.estado,
	}))
}

