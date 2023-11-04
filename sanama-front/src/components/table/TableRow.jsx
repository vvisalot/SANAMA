import { Fragment } from "react";
import TableCell from "./TableCell";
import TableOptions from "./TableOptions";

const getEstadoFromRow = (row) => {
  for (let item of row) {
      if (["Atendida", "En Consultorio", "Cancelada", "Pendiente", "Desconocido"].includes(item.data)) {
          return item.data;
      }
  }
  return null; 
}

const TableRow = ({ row, url, optionsText, iconName }) => {

  const estado = getEstadoFromRow(row);
  return (
    <tr className="bg-white border-b">
      {row.map((cell, index) => {
        if (index === row.length - 1) {
          return (
            <Fragment key={index}>
              <TableCell
                data={cell.data}
                className={cell.className ? cell.className : ""}
              />
              {url.length > 0 ? (
                <TableOptions
                  id={parseInt(row[0].data)}
                  url={url}
                  text={optionsText}
                  iconName={iconName}
                  estado={estado}
                />
              ) : null}
            </Fragment>
          );
        } else {
          return (
            <TableCell
              key={index}
              data={cell.data}
              className={cell.className ? cell.className : ""}
            />
          );
        }
      })}
    </tr>
  );
};

export default TableRow;
