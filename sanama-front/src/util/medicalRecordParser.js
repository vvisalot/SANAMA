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
  return data.map((item) => ({
    idHojaMedica: item.idHojaMedica,
    codigo: item.codigo,
    medico: `${item.citaMedica.medico.nombres} ${item.citaMedica.medico.apellidoPaterno} ${item.citaMedica.medico.apellidoMaterno}`,
    especialidad: item.citaMedica.medico.especialidad.nombre,
    horaAtencion: item.horaAtencion,
    fechaAtencion: item.fechaAtencion,
  }));
}
