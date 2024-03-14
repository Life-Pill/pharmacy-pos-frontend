import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '../../../../@shadcn/components/ui/table';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import CountRoundButton from '../../../../shared/buttons/CountRoundButton';
import { usePaymentContext } from '../../layout/MainCashierDashboard';

type Props = {};

function MedicineGrid({}: Props) {
  const {
    setPaymentDetails,
    setOrderedMedicine,
    paymentDetails,
    orderedMedicine,
  } = usePaymentContext();
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const handleAddAmount = (index: number) => {
    const updatedMedicines = [...orderedMedicine];
    if (updatedMedicines[index].availableQuantity > 0) {
      updatedMedicines[index].amount += 1;
      updatedMedicines[index].availableQuantity -= 1;
      setOrderedMedicine(updatedMedicines);
      calculateTotalAmount();
    } else {
      alert('You have reached the maximum quantity');
      return;
    }
  };

  const handleSubtractAmount = (index: number) => {
    const updatedMedicines = [...orderedMedicine];
    if (updatedMedicines[index].amount !== 0) {
      updatedMedicines[index].amount -= 1;
      updatedMedicines[index].availableQuantity += 1;
      setOrderedMedicine(updatedMedicines);
      calculateTotalAmount();
    } else {
      alert('You have reached the minimum quantity');
      return;
    }
  };

  const handleAmountChange = (amount: any, index: number) => {
    const updatedMedicines = [...orderedMedicine];
    if (amount > updatedMedicines[index].availableQuantity && !amount.isNan) {
      alert('You have reached the maximum quantity');
      return;
    } else {
      updatedMedicines[index].amount = amount;
      // updatedMedicines[index].availableQuantity -= amount;
      setOrderedMedicine(updatedMedicines);
      calculateTotalAmount();
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    orderedMedicine.forEach((medicine) => {
      total += medicine.unitPrice * medicine.amount;
    });
    setDiscountedTotal(total - (total * discount) / 100);
    setTotalAmount(total);
    setPaymentDetails({ ...paymentDetails, paymentAmount: total });
    setOrderedMedicine(orderedMedicine);
  };

  const calculateAfterDiscount = (discount: number) => {
    if (discount >= 0 && discount <= 100) {
      setDiscount(discount);
      setDiscountedTotal(totalAmount - (totalAmount * discount) / 100);
    } else {
      alert('Discount must be between 0 and 100');
      setDiscount(0);
    }
  };

  return (
    <>
      <div className='overflow-y-scroll flex min-h-[300px] max-h-[400px] flex-col'>
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
            {orderedMedicine.map((cashier, index) => (
              <tr className='bg-slate-50 border-b' key={cashier.id}>
                <td className='px-6 py-4'>{cashier.id}</td>
                <td className='px-6 py-4'>{cashier.name}</td>
                <td className='px-6 py-4'>{cashier.unitPrice}</td>

                <td>
                  <div className='flex justify-center items-center gap-2'>
                    <CountRoundButton
                      icon={<IoIosAdd />}
                      onClick={() => handleAddAmount(index)}
                    />
                    <input
                      type='number'
                      className='w-10'
                      value={cashier.amount}
                      onChange={(e) =>
                        handleAmountChange(e.target.valueAsNumber, index)
                      }
                      readOnly={false}
                    />
                    <CountRoundButton
                      icon={<IoIosRemove />}
                      onClick={() => handleSubtractAmount(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col items-center justify-start'>
        <table>
          <tbody>
            <tr>
              <td className='px-6 py-1'>Total Amount</td>
              <td className='px-6 py-1 text-blueDarker font-bold total-amount'>
                {totalAmount}
              </td>
            </tr>
            <tr>
              <td className='px-6 py-1'>Discount</td>
              <td className='px-6 py-1'>
                <input
                  type='number'
                  name='discount'
                  value={discount}
                  onChange={(e) =>
                    calculateAfterDiscount(e.target.valueAsNumber)
                  }
                  className='border rounded-md p-2 w-32'
                />
              </td>
            </tr>
            <tr>
              <td className='px-6 py-1'>After Discount</td>
              <td className='px-6 py-1 text-blueDarker font-bold'>
                {discountedTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MedicineGrid;
