interface TableRowProps {
  label: string;
  value: string | number | boolean;
}

const TableRow: React.FC<TableRowProps> = ({ label, value }) => {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
        {label}
      </td>
      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
        {value}
      </td>
    </tr>
  );
};

export default TableRow;
