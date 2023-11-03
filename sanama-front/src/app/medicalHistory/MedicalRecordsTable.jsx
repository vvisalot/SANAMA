import Table from "@/components/table/Table";

const columns = [
  { name: "idHojaMedica" },
  { name: "codigo" },
  { name: "idMedicoCreador" },
  { name: "atender" },
];

const MedicalRecordsTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      url="/patients/profile"
      optionsText="Atender"
    />
  );
};
export default MedicalRecordsTable;
