interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: Date;
}

const transactionDetails: Transaction[] = [
  {
    id: 1,
    description: 'Payment for groceries',
    amount: 50.99,
    date: new Date(Date.now() - 86400000 * 2), // Subtracting 2 days from current date
  },
  {
    id: 2,
    description: 'Online shopping',
    amount: 120.49,
    date: new Date(Date.now() - 86400000 * 5), // Subtracting 5 days from current date
  },
  {
    id: 3,
    description: 'Restaurant bill',
    amount: 80.75,
    date: new Date(Date.now() - 86400000 * 7), // Subtracting 7 days from current date
  },
  {
    id: 4,
    description: 'Fuel purchase',
    amount: 35.25,
    date: new Date(Date.now() - 86400000 * 10), // Subtracting 10 days from current date
  },
  {
    id: 5,
    description: 'Payment for groceries',
    amount: 50.99,
    date: new Date(Date.now() - 86400000 * 2), // Subtracting 2 days from current date
  },
];

export default transactionDetails;
