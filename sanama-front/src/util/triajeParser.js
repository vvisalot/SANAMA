export function parseTriajeTable(data) {
    return data.map(row => {
        const paciente = row.paciente;
        let prioridadTexto = row.prioridad;
        let prioridadClase;

        
        switch (prioridadTexto) {
            case 'Resucitacion':
                prioridadClase = "bg-resucitacion";
                break;
            case 'Emergencia':
                prioridadClase = "bg-emergencia";
                break;
            case 'Urgencia':
                prioridadClase = "bg-urgencia";
                break;
            case 'Urgencia menor':
                prioridadClase = "bg-urgencia-menor";
                break;
            case 'Sin Urgencia':
                prioridadClase = "bg-sin-urgencia";
                break;
        }


        let estadoTexto;
        let estadoClase;
        switch (row.estado) {
            case 1:
                estadoTexto = "Atendida";
                estadoClase = "bg-atendida"; // Color de fondo para "Atendida"
                break;
            case 2:
                estadoTexto = "En Consultorio";
                break;
            case 3:
                estadoTexto = "Cancelada";
                break;
            case 4:
                estadoTexto = "Pendiente";
                estadoClase = "bg-pendiente";  // Color de fondo para "Pendiente"
                break;
            default:
                estadoTexto = "Desconocido";
        }

        return [
            { "data": row.idTriaje }, // ID
            { "data": row.fechaTriaje }, // Fecha
            { "data": paciente.dni }, // DNI del paciente
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // Nombre completo
            { "data": estadoTexto, "className": estadoClase }, // Estado con la clase CSS
            { "data": prioridadTexto, "className": prioridadClase },
        ];
    });
}

