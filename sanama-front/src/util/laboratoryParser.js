export function parseLaboratoryTable(data) {
    return data.map(row => {
        const paciente = row.citaMedica.paciente;

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

        const resultados = row.resultados ? row.resultados : "No disponible";

        return [
            { "data": row.idOrdenLaboratorio }, // ID
            { "data": row.fechaOrden }, // FECHA
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // NOMBRE COMPLETO
            { "data": paciente.dni }, // DNI
            { "data": row.tipoOrden }, // EXAMEN
            { "data": estadoTexto },  // ESTADO 
            { "data": resultados }, // RESULTADOS
        ];
    });
}
