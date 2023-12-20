import React from 'react';

type Props = {};

const MedicineGrid = (props: Props) => {
  return (
    <div>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </table>
    </div>
  );
};

export default MedicineGrid;
