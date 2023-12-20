import React from 'react';
import { MedicineTable } from './MedicineTable';
import { columns } from './MedicineColumns';
import fakeMedicines from '../../fakedata/medicine';

type Props = {};

const MedicineGrid = (props: Props) => {
  return (
    <div className='container mx-auto py-10'>
      <MedicineTable columns={columns} data={fakeMedicines} />
    </div>
  );
};

export default MedicineGrid;
