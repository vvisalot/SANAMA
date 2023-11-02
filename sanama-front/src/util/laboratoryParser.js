export function parseLaboratoryTable(data) {
    return data.map(row => {
        const paciente = row.citaMedica.paciente;

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

        const resultados = row.resultados ? row.resultados : "No disponible";

        return [
            { "data": row.idOrdenLaboratorio }, // ID
            { "data": `${row.fechaOrden}     ${row.horaOrden}`}, // FECHA Y HORA
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // NOMBRE COMPLETO
            { "data": paciente.dni }, // DNI
            { "data": row.tipoMuestra }, // TIPO DE ORDEN/EXAMEN
            { "data": estadoTexto, "className": estadoClase },  // ESTADO con su clase
            { "data": resultados }, // RESULTADOS
        ];
    });
}
