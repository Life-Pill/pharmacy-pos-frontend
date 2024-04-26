import { usePaymentContext } from '../../layout/MainCashierDashboard';

const MedineGridPopUp = () => {
  const { orderedMedicine } = usePaymentContext();

  return (
    <div className='overflow-y-scroll flex h-[400px] flex-col'>
      <table className='text-sm text-left text-gray-500 dark:text-gray-400 max-h-screen overflow-scroll'>
        <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
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
        <tbody>
          {orderedMedicine.map((cashier) => (
            <tr className='bg-slate-50 border-b' key={cashier.id}>
              <td className='px-6 py-4'>{cashier.id}</td>
              <td className='px-6 py-4'>{cashier.name}</td>
              <td className='px-6 py-4'>{cashier.unitPrice}</td>

              <td className='px-6 py-4'>{cashier.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedineGridPopUp;
