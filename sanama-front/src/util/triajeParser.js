export function parseTriajeTable(data) {
    return data.map(row => {
        const paciente = row.paciente;
        let prioridadTexto = row.prioridad;
        let prioridadIcon; 

        switch (prioridadTexto) {
            case 'Resucitacion':
                prioridadIcon = "🔴";
                break;
            case 'Emergencia':
                prioridadIcon = "🟠";
                break;
            case 'Urgencia':
                prioridadIcon = "🟡";
                break;
            case 'Urgencia menor':
                prioridadIcon = "🟢";
                break;
            case 'Sin Urgencia':
                prioridadIcon = "🔵";
                break;
            case 'N.A.': 
                prioridadIcon = "⚪";
                prioridadTexto = "Sin atender"; 
                break;
        }

        let estadoTexto;
        let estadoClase;
        switch (row.estado) {
            case 1:
                estadoTexto = "Atendida";
                estadoClase = "bg-atendida";
                break;
            case 2:
                estadoTexto = "En Consultorio";
                break;
            case 3:
                estadoTexto = "Cancelada";
                break;
            case 4:
                estadoTexto = "Pendiente";
                estadoClase = "bg-pendiente";
                break;
            default:
                estadoTexto = "Desconocido";
        }

        const fechaOrden = row.fechaTriaje.split('-').reverse().join('-'); 

        return [
            { "data": row.idTriaje },
            { "data": row.codigoTriaje },
            { "data": `${fechaOrden}     ${row.horaTriaje}`},
            { "data": paciente.dni },
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` },
            { "data": estadoTexto, "className": estadoClase },
            { "data": `${prioridadIcon} ${prioridadTexto}`, "className": "" }, 
        ];
    });
}

