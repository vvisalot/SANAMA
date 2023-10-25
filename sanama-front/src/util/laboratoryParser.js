export function parseLaboratoryTable(data) {
    return data.map(row => {
        const paciente = row.paciente;

        let estadoOrdenTexto;
        switch (row.ordenLaboratorio.estado) {
            case 1:
                estadoOrdenTexto = "Atendida";
                break;
            case 2:
                estadoOrdenTexto = "En Consultorio";
                break;
            case 3:
                estadoOrdenTexto = "Cancelada";
                break;
            case 4:
                estadoOrdenTexto = "Pendiente";
                break;
            default:
                estadoOrdenTexto = "Desconocido"; 
        }

        return [
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` },  // Nombre completo del paciente
            { "data": row.ordenLaboratorio.fechaOrden },  // Fecha de Actualización (Usé la fecha de Orden de Laboratorio para este campo, asumiendo que es la fecha de actualización)
            { "data": estadoOrdenTexto },  // Estado de la Orden
        ];
    });
}