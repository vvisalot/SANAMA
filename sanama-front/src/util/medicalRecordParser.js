export function parseHistorial(data) {
  const columns = ["idHistorialClinico", "codigo", "hojasMedicas"];
  const table = data.map((row) => {
    return columns.map((column) => {
      return { data: row[column] };
    });
  });
  return table;
}

export function parseHojaMedicaTable(data) {
  const columns = [
    "idHojaMedica",
    "codigo",
    "medico",
    "especialidad",
    "horaAtencion",
    "fechaAtencion",
  ];
  const table = data.map((item) => {
    return columns.map((column) => {
      if (column === "medico") {
        return {
          data: `${item.citaMedica.medico.nombres} ${item.citaMedica.medico.apellidoPaterno} ${item.citaMedica.medico.apellidoMaterno}`,
        };
      } else if (column === "especialidad") {
        return { data: item.citaMedica.medico.especialidad.nombre };
      } else {
        return { data: item[column] };
      }
    });
  });
  return table;
}
