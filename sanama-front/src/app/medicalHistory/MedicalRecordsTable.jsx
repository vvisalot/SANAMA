import Table from "@/components/table/Table";

const columns = [
  { name: "idHojaMedica" },
  { name: "codigo" },
  { name: "idMedicoCreador" },
];

const MedicalRecordsTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      url="/patients/profile"
      optionsText="Ver perfl"
    />
  );
};
export default MedicalRecordsTable;
