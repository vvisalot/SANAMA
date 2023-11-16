import moment from 'moment';

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
        let estadoClase = ""; 
        switch (row.estado) {
            case 1:
                estadoTexto = "Atendida";
                estadoClase = "highlight-green";
                break;
            case 2:
                estadoTexto = "En Consultorio";
                break;
            case 3:
                estadoClase = "highlight-red"; 
                estadoTexto = "Cancelada";
                break;
            case 4:
                estadoClase = "highlight-orange";
                estadoTexto = "Pendiente";
                break;
            default:
                estadoTexto = "Desconocido";
        }

        const fechaOrden = moment(row.fechaTriaje).format('DD/MM/YYYY');
        const horaOrden = moment(row.horaTriaje, 'HH:mm:ss').format('hh:mm A');

        return [
            { "data": row.idTriaje },
            { "data": row.codigoTriaje },
            { "data": `${fechaOrden} ${horaOrden}`, "className": "centered-column"  },   
            { "data": paciente.dni },
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` },
            { "data": `${prioridadIcon} ${prioridadTexto}`, "className": "" }, 
            { "data": <span className={estadoClase}>{estadoTexto}</span> }
        ];
    });
}

