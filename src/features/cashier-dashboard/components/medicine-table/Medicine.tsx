import { IoIosAdd } from 'react-icons/io';
import CountRoundButton from '../../../../shared/buttons/CountRoundButton';
import { usePaymentContext } from '../../layout/MainCashierDashboard';
import { MedicineType } from './MedicineColumns';
import { useEffect, useState } from 'react';
import useItemService from '../../services/ItemService';

const Medicine = () => {
  const { orderedMedicine, setOrderedMedicine } = usePaymentContext();
  const [loading, setLoading] = useState(true);
  const { getAllItems } = useItemService();

  const { setMedicine, medicine, setFilteredMedicine, filteredMedicine } =
    usePaymentContext();

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

  const fetchMedicine = async () => {
    try {
      const medicineData = await getAllItems();
      setMedicine(medicineData);
      setFilteredMedicine(medicineData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medicine data:', error);
    }
  };

  //
  useEffect(() => {
    //fetchMedicine from server
    fetchMedicine();
  }, [fetchMedicine]);
  //

  return (
    <div className='max-h-[750px] overflow-y-scroll w-full'>
      {loading ? (
        <p>Loading...</p>
      ) : !medicine ? (
        <p>No medicines available.</p>
      ) : (
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
            {filteredMedicine.map((cashier) => (
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
      )}
    </div>
  );
};

export default Medicine;
