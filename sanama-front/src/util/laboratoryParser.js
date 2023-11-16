import moment from 'moment';

export function parseLaboratoryTable(data) {
    return data.map(row => {
        const paciente = row.citaMedica.paciente;

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


        // let resultados;
        // if (row.examenMedico && row.examenMedico.urlDescarga) {
        //     resultados = `<a href="${row.examenMedico.urlDescarga}" download class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 inline-block">Descargar</a>`;
        // } else {
        //     resultados = "No disponible";
        // }

        const fechaOrden = moment(row.fechaOrden).format('DD/MM/YYYY');
        const horaOrden = moment(row.horaOrden, 'HH:mm:ss').format('hh:mm A');

        return [
            { "data": row.idOrdenLaboratorio }, // ID
            { "data": row.codigoOrden },
            { "data": `${fechaOrden} ${horaOrden}`, "className": "centered-column"  },   // FECHA Y HORA
            { "data": paciente.dni }, 
            { "data": `${paciente.nombres} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}` }, // NOMBRE COMPLETO// DNI
            { "data": row.tipoMuestra }, // TIPO DE ORDEN/EXAMEN
            { "data": <span className={estadoClase}>{estadoTexto}</span> } // ESTADO con su clase
            // { "data": resultados, "className": "text-center" }, // RESULTADOS
        ];
    });
}
