import React from "react";
import Table from "@/components/table/Table";

const LaboratoryMSTable = ({ data }) => {
  const columns = React.useMemo(() => [
    {
      accessorKey: "nombreArchivo",
      header: "Nombre del Archivo",
      enableSorting: true,
    },
    {
      accessorKey: "medicoFirmante",
      header: "Médico Firmante",
      enableSorting: true,
    },
    {
      accessorKey: "tipoMuestra",
      header: "Tipo de Muestra",
      enableSorting: true,
    },
    {
      accessorKey: "downloadUrl",
      header: "Archivo",
      cell: ({ row }) => (
        <a href={row.original.downloadUrl} download={row.original.nombreArchivo}>
          Descargar
        </a>
      ),
    },
  ], []);

  return <Table columns={columns} data={data} />;
};

export default LaboratoryMSTable;