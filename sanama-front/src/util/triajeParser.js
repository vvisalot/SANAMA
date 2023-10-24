// {
//     "idCita": 5,
//     "paciente": {
//         "idPersona": 0,
//         "nombres": "Javier",
//         "apellidoPaterno": "Mendez",
//         "apellidoMaterno": "Molinas",
//         "dni": "74032409",
//         "fechaNacimiento": "1998-09-10",
//         "sexo": "MASCULINO",
//         "telefono": null,
//         "correoElectronico": null,
//         "foto": null,
//         "estado": 0,
//         "codigoSeguro": null,
//         "tipoSeguro": null,
//         "tieneAcompanhante": false,
//         "nombreAcompnhante": null,
//         "dniAcompanhante": null,
//         "correo": null,
//         "direccion": null,
//         "parentezco": null,
//         "historialClinico": null,
//         "programacionesCitas": null
//     },
//     "triaje": {
//         "idTriaje": 2,
//         "codigoTriaje": "TR-20230831-113512",
//         "peso": 70,
//         "talla": 180,
//         "temperatura": 37,
//         "motivoVisita": "Dolor de poto",
//         "presionArterial": 120,
//         "estado": 1,
//         "prioridad": "Media",
//         "fechaTriaje": "2022-12-18",
//         "horaTriaje": "14:32:51",
//         "saturacionOxigeno": "98",
//         "frecuenciaCardiaca": "75",
//         "frecuenciaRespiratoria": null,
//         "nivelConciencia": "Consciente",
//         "nivelDolor": "Leve",
//         "condicionesPrexistentes": "Ninguna",
//         "enfermera": null
//     },
// }

export function parseTriajeTable(data) {
    const table = data.map(row => {
        const paciente = row.paciente;
        const triaje = row.triaje;
        return [
            { "data": triaje.fechaTriaje }, // Fecha de Triaje
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // Nombre completo
            { "data": paciente.dni }, // DNI del paciente
            { "data": triaje.estado == 0 ? "Inactivo" : "Activo" }, // Estado 
            { "data": triaje.prioridad } // Urgencia
        ];
    });
    return table;
}

// export function parseTriajeTable(data) {
//     const columns = ["idPersona", "paciente", "fecha", "estado", "urgencia"]
//     const table = data.map(row => {
//         return columns.map(column => {
//             if (column === "nombres") {
//                 return {
//                     "data": `${row["nombres"]} ${row["apellidoPaterno"]} ${row["apellidoMaterno"]}`
//                 }
//             } else if (column === "especialidad") {
//                 return { "data": row["especialidad"]["nombre"] }
//             }
//             else {
//                 return { "data": row[column] }
//             }
//         })
//     })

//     return table;
// }