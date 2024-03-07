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

type Medicine = {
  name: string;
  unitPrice: string;
  amount: number;
};

type Props = {};

function MedicineGrid({}: Props) {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      name: 'Medicine1',
      unitPrice: '$10.00',
      amount: 5,
    },
    {
      name: 'Medicine2',
      unitPrice: '$15.00',
      amount: 3,
    },
    {
      name: 'Medicine3',
      unitPrice: '$20.00',
      amount: 8,
    },
    {
      name: 'Medicine4',
      unitPrice: '$12.00',
      amount: 10,
    },
    {
      name: 'Medicine5',
      unitPrice: '$25.00',
      amount: 4,
    },
    {
      name: 'Medicine6',
      unitPrice: '$18.00',
      amount: 6,
    },
    {
      name: 'Medicine7',
      unitPrice: '$22.00',
      amount: 7,
    },
    {
      name: 'Medicine8',
      unitPrice: '$30.00',
      amount: 2,
    },
  ]);

  const handleAddAmount = (index: number) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].amount += 1;
    setMedicines(updatedMedicines);
  };

  const handleSubtractAmount = (index: number) => {
    const updatedMedicines = [...medicines];
    if (updatedMedicines[index].amount > 0) {
      updatedMedicines[index].amount -= 1;
    }
    setMedicines(updatedMedicines);
  };

  return (
    <div className='overflow-y-auto flex-grow flex'>
      <Table>
        <div>
          <TableHead>
            <TableRow>
              <TableHead className='w-1/3'>Medicine</TableHead>
              <TableHead className='w-1/3'>Unit Price</TableHead>
              <TableHead className='w-1/3'>Amount</TableHead>
              <TableHead className='w-1/3'></TableHead>
            </TableRow>
          </TableHead>
        </div>

        <div className='overflow-y-auto max-h-[400px]'>
          <TableBody>
            {medicines.map((medicine, index) => (
              <TableRow key={medicine.name}>
                <TableCell className='font-medium w-1/3'>
                  {medicine.name}
                </TableCell>
                <TableCell className='w-1/3'>{medicine.unitPrice}</TableCell>
                <TableCell className='w-2/3'>
                  <div className='flex justify-center items-center gap-2'>
                    <CountRoundButton
                      icon={<IoIosAdd />}
                      onClick={() => handleAddAmount(index)}
                    />
                    {medicine.amount}
                    <CountRoundButton
                      icon={<IoIosRemove />}
                      onClick={() => handleSubtractAmount(index)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </div>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right text-blueDarker font-semibold'>
              $2,500.00
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default MedicineGrid;
