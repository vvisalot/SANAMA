const TableCell = ({ data, className }) => {
  return (
    <td
      scope="row"
      className={`px-4 py-4 text-gray-900 whitespace-nowrap truncate min-w-[80px] max-w-[150px] ${className}`}
    >
      {data}
    </td>
  );
};

export default TableCell;
