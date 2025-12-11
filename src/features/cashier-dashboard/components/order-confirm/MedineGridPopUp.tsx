import { usePaymentContext } from '../../layout/MainCashierDashboard';

const MedineGridPopUp = () => {
  const { orderedMedicine } = usePaymentContext();

  return (
    <div className='rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
      <div className='max-h-[280px] overflow-y-auto'>
        <table className='w-full text-sm text-left'>
          <thead className='text-xs font-semibold uppercase bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 sticky top-0 z-10'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Medicine ID
              </th>
              <th scope='col' className='px-6 py-3'>
                Medicine Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Unit Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {orderedMedicine.map((item) => (
              <tr className='hover:bg-blue-50 transition-colors duration-150' key={item.id}>
                <td className='px-6 py-3 font-medium text-gray-900'>{item.id}</td>
                <td className='px-6 py-3 font-medium text-gray-700'>{item.name}</td>
                <td className='px-6 py-3 text-gray-700'>Rs. {item.unitPrice.toFixed(2)}</td>
                <td className='px-6 py-3 font-semibold text-blue-600'>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orderedMedicine.length === 0 && (
        <div className='flex items-center justify-center h-32 text-gray-500'>
          No items in order
        </div>
      )}
    </div>
  );
};

export default MedineGridPopUp;
