import { ColumnDef } from '@tanstack/react-table';

export type Medicine = {
  id: string;
  image: string;
  name: string;
  price: number;
  status: string;
  quantity: number;
};

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: 'id',
    header: 'MEDICINE ID',
  },
  {
    accessorKey: 'image',
    header: 'IMAGE',
  },
  {
    accessorKey: 'name',
    header: 'NAME',
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
  },
  {
    accessorKey: 'quantity',
    header: 'QUANTITY',
  },
];
