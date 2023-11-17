import { Fragment } from "react";
import TableCell from "./TableCell";
import TableOptions from "./TableOptions";

const getEstadoFromRow = (row) => {
  for (let item of row) {
    // Verifica si item.data es un objeto y tiene una propiedad props
    if (typeof item.data === 'object' && item.data !== null && item.data.props) {
      // Accede a las propiedades del objeto para obtener el texto
      const estadoTexto = item.data.props.children;
      if (typeof estadoTexto === 'string') {
        // Retorna el texto si es una cadena
        return estadoTexto;
      }
    }
  }
  return null;
};

const TableRow = ({ row, url, optionsText, iconName }) => {
  const estado = getEstadoFromRow(row);
  
  console.log("El row es: ", row)
  console.log("El estado es: ", estado)
  return (
    <tr className="bg-white border-b">
      {row.map((cell, index) => {
        if (index === 0) return null;
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
