import Table from "@/components/table/Table";

const columns = [
  { name: "ID" },
  { name: "N° de Atención" },
  { name: "Fecha" },
  { name: "Nombre del Doctor" },
  { name: "Opciones" },
];

const EvaluationTable = ({ data }) => {
  return <Table columns={columns} data={data} url="/laboratories/profile" />;
};

export default EvaluationTable;
