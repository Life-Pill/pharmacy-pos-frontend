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
    header: () => <div className='font-thin'>MEDICINE ID</div>,
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return <div className='font-semibold '>{id}</div>;
    },
  },
  {
    accessorKey: 'image',
    header: () => <div className='font-thin'>IMAGE</div>,
    cell: ({ row }) => {
      const image: string = row.getValue('image');
      return (
        <div>
          <img
            src={image}
            alt='image'
            width={44}
            height={44}
            className='rounded-full'
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: () => <div className='font-thin'>NAME</div>,
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return <div className='font-semibold'>{name}</div>;
    },
  },
  {
    accessorKey: 'price',
    header: () => <div className='font-thin'>PRICE</div>,
    cell: ({ row }) => {
      const price: string = row.getValue('price');
      return <div className='font-semibold'>{price}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className='font-thin'>STATUS</div>,
    cell: ({ row }) => {
      const status: string = row.getValue('status');
      return <div className='font-semibold'>{status}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: () => <div className='font-thin'>QUANTITY</div>,
    cell: ({ row }) => {
      const quantity: string = row.getValue('quantity');
      return <div className='font-semibold'>{quantity}</div>;
    },
  },
];
