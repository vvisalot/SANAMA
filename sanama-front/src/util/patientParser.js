
// http://localhost:8080/admision/post/buscarPaciente

import { format } from "date-fns"
import { da } from "date-fns/locale"

export function parsePatientTable(data) {
    return data.map((row) => ({
        idPersona: row.idPersona,
        patientName: row.nombres + ' ' + row.apellidoPaterno + ' ' + row.apellidoMaterno,
        dni: row.dni,
        birthdate: format(new Date(row.fechaNacimiento), "dd/MM/yyyy"),
        phone: row.telefono,
    }))
}


export function parsePatientModal(data) {
    return data.map(row => {
        return {
            "data": row.idPersona,
            "data": `${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`,
            "data": row.dni
        }
    })
}

export const sexParser = (sex) => {
    if (sex === "M") {
        return "Masculino"
    } else if (sex === "F") {
        return "Femenino"
    } else {
        // Puedes manejar otros valores o dejarlo como está
        return sex
    }
}