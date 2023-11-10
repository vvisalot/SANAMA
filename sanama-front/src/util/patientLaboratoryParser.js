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

        const fechaOrden = row.fechaOrden.split('-').reverse().join('-'); 

        return [
            { "data": row.idOrdenLaboratorio }, // ID
            { "data": fechaOrden},
            { "data": row.horaOrden},
            { "data": row.tipoMuestra }, // TIPO DE ORDEN/EXAMEN
            { "data": estadoTexto, "className": estadoClase },  // ESTADO con su clase
        ];
    });
}