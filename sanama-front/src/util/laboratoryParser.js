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

        // let resultados;
        // if (row.examenMedico && row.examenMedico.urlDescarga) {
        //     resultados = `<a href="${row.examenMedico.urlDescarga}" download class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 inline-block">Descargar</a>`;
        // } else {
        //     resultados = "No disponible";
        // }

        const fechaOrden = row.fechaOrden.split('-').reverse().join('-'); 

        return [
            { "data": row.idOrdenLaboratorio }, // ID
            { "data": `${fechaOrden}     ${row.horaOrden}`}, // FECHA Y HORA
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // NOMBRE COMPLETO
            { "data": paciente.dni }, // DNI
            { "data": row.tipoMuestra }, // TIPO DE ORDEN/EXAMEN
            { "data": estadoTexto, "className": estadoClase },  // ESTADO con su clase
            // { "data": resultados, "className": "text-center" }, // RESULTADOS
        ];
    });
}
