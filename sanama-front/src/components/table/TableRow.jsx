import { Fragment } from "react";
import TableCell from "./TableCell";
import TableOptions from "./TableOptions";

// const TableRow = ({ row, url, optionsText, iconName }) => {
//   return (
//     <tr className="bg-white border-b ">
//       {row.map((cell, index) => {
//         if (index != 0) {
//           if (index === row.length - 1) {
//             return (
//               <Fragment key={index}>
//                 <TableCell data={cell.data} className={cell.className ? cell.className : ""} />
//                 {url.length > 0 ? (
//                   <TableOptions
//                     id={parseInt(row[0].data)}
//                     url={url}
//                     text={optionsText}
//                     iconName={iconName}                    
//                     estado={row[4].data}
//                   />
//                 ) : null}
//               </Fragment>
//             );
//           } else {
//             return <TableCell key={index} data={cell.data} className={cell.className ? cell.className : ""} />;
//           }
//         }
//       })}
//     </tr>
//   );
// };

const TableRow = ({ row, url, optionsText, iconName }) => {
  return (
    <tr className="bg-white border-b">
      {row.map((cell, index) => {
        if (index === row.length - 1) {
          return (
            <Fragment key={index}>
              <TableCell data={cell.data} className={cell.className ? cell.className : ""} />
              {url.length > 0 ? (
                <TableOptions
                  id={parseInt(row[0].data)}
                  url={url}
                  text={optionsText}
                  iconName={iconName}                    
                  estado={row[4].data}
                />
              ) : null}
            </Fragment>
          );
        } else {
          return <TableCell key={index} data={cell.data} className={cell.className ? cell.className : ""} />;
        }
      })}
    </tr>
  );
};

export default TableRow;

