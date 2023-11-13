import Table from "@/components/table/Table";

const columns = [
  { name: "ID", selector: (row) => row.idHojaMedica },
  { name: "Código", selector: (row) => row.codigo },
  { name: "Médico", selector: (row) => row.medico }, // Assuming 'medico' is a string with the full name
  { name: "Especialidad", selector: (row) => row.especialidad }, // Assuming 'especialidad' is a string
  { name: "Hora de Atención", selector: (row) => row.horaAtencion }, // Assuming 'horaAtencion' is a string
  { name: "Fecha de Atención", selector: (row) => row.fechaAtencion }, // Assuming 'fechaAtencion' is a string
];

const MedicalRecordsTable = ({ data }) => {
  // Directly use the parsed data prop, no need for additional mapping
  return (
    <Table
      columns={columns}
      data={data}
      url="/evaluations/"
      optionsText="Ver"
    />
  );
};
export default MedicalRecordsTable;
