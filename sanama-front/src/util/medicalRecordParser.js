// http://localhost:8080/atencion/post/buscarHistorialClinico
// {
//     "idHistorialClinico": 3,
//     "codigo": "HCN-74032409",
//     "hojasMedicas": [
//         {
//             "idHojaMedica": 1,
//             "codigo": "HM-20230921-143000",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 2,
//             "codigo": "HM-20230815-153000",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 3,
//             "codigo": "HM-20230831-113512",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 4,
//             "codigo": "HM-20220817-232245",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 5,
//             "codigo": "HM-20220820-232245",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 7,
//             "codigo": "HM-20220803-232250",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 8,
//             "codigo": "HM-20220813-231250",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 9,
//             "codigo": "HM-20231009-232245",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 10,
//             "codigo": "HM-20231010-232245",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 19,
//             "codigo": "HM-20231020-080000",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 24,
//             "codigo": "HM-20231025-080000",
//             "idMedicoCreador": 1
//         },
//         {
//             "idHojaMedica": 42,
//             "codigo": "HM-20231026-102000",
//             "idMedicoCreador": 1
//         }
//     ]
// }

//Para la tabla de medicalrecords
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
  const columns = ["idHojaMedica", "codigo", "idMedicoCreador"];
  const table = data.map((row) => {
    return columns.map((column) => {
      return { data: row[column] };
    });
  });
  return table;
}
