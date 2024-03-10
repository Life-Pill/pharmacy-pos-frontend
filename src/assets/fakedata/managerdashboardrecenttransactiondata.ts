export interface Transaction {
  id: number;
  name: string;
  amount1: string;
  flow: string;
  imageUrl: string; // New field for image URL
}

const cashierReport: Transaction[] = [
  {
    id: 1,
    name: 'John Doe',
    amount1: 'LKR 7894',
    flow: 'LKR 32104',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    amount1: 'LKR 4321',
    flow: 'LKR 21094',
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    amount1: 'LKR 12345',
    flow: 'LKR 54321',
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 4,
    name: 'Bob Brown',
    amount1: 'LKR 9876',
    flow: 'LKR 45678',
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

export default cashierReport;
