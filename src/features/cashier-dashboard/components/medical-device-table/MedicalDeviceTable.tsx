import { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { IMedicine } from '../../../../interfaces/IMedicine';
import CountRoundButton from '../../../../shared/buttons/CountRoundButton';
import { usePaymentContext } from '../../layout/MainCashierDashboard';
import { MedicineType } from '../medicine-table/MedicineColumns';
import useItemService from '../../services/ItemService';

const MedicalDeviceTable = () => {
  const { orderedMedicine, setOrderedMedicine } = usePaymentContext();
  const [medicine, setMedicine] = useState<IMedicine[]>([]);
  const { getAllItems } = useItemService();

  //function to add medicine to ordered medicine
  const handleAddClick = (medicine: MedicineType) => {
    setOrderedMedicine([
      ...orderedMedicine,
      {
        id: medicine.id,
        name: medicine.name,
        unitPrice: medicine.price,
        amount: 0,
        availableQuantity: medicine.quantity,
      },
    ]);
  };

  //
  useEffect(() => {
    //fetchMedicine from server
    fetchMedicine();
  },[]);
  //

  const fetchMedicine = async () => {
    const allItems = await getAllItems();
    //filter only personal care
    const medicine = allItems.filter(
      (item: IMedicine) => item.category === 'Medical Devices'
    );
    setMedicine(medicine);
  };

  return (
    <div className='max-h-[750px] overflow-y-scroll w-full'>
      <table className='text-sm text-left text-gray-500 dark:text-gray-400 max-h-screen overflow-scroll w-full'>
        <thead className='text-xs uppercase bg-slate-300 sticky top-0'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Medicine ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Image
            </th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Quantity
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {medicine.map((cashier) => (
            <tr className='bg-slate-50 border-b'>
              <td className='px-6 py-4'>{cashier.id}</td>
              <td className='px-6 py-4 w-8 h-8'>
                <img src={cashier.image} alt={cashier.name} />
              </td>
              <td className='px-6 py-4'>{cashier.name}</td>
              <td className='px-6 py-4'>{cashier.price}</td>
              <td className='px-6 py-4'>{cashier.quantity}</td>
              <td className='px-6 py-4'>{cashier.status}</td>
              <td className='px-6 py-4'>
                <CountRoundButton
                  onClick={() => handleAddClick(cashier)}
                  icon={<IoIosAdd />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalDeviceTable;
