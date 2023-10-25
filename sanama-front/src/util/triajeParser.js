
export function parseTriajeTable(data) {
    return data.map(row => {
        const paciente = row.paciente;

        let estadoTexto;
        switch (row.estado) {
            case 1:
                estadoTexto = "Atendida";
                break;
            case 2:
                estadoTexto = "En Consultorio";
                break;
            case 3:
                estadoTexto = "Cancelada";
                break;
            case 4:
                estadoTexto = "Pendiente";
                break;
            default:
                estadoTexto = "Desconocido";
        }

        return [
            { "data": row.idTriaje }, // ID
            { "data": row.fechaTriaje }, // Fecha
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // Nombre completo
            { "data": paciente.dni }, // DNI del paciente
            { "data": estadoTexto },  // Estado 
            { "data": row.prioridad }, // Urgencia
        ];
    });
}
