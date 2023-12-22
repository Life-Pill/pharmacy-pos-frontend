import React from 'react';
import { MedicineTable } from './MedicineTable';
import { columns } from './MedicineColumns';
import fakeMedicines from '../../fakedata/medicine';

type Props = {};

const MedicineGrid = (props: Props) => {
  return (
    <div className='font-poppins w-full'>
      <MedicineTable columns={columns} data={fakeMedicines} />
    </div>
  );
};

export default MedicineGrid;
