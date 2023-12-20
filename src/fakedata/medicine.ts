type Medicine = {
  image: string;
  id: string;
  name: string;
  price: number;
  status: string;
  quantity: number;
};

const fakeMedicines: Medicine[] = [];

for (let i = 0; i < 100; i++) {
  fakeMedicines.push({
    image: `https://example.com/medicine${i}.jpg`,
    id: `med-${i + 1}`,
    name: `Medicine ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10, // Random price between 10 and 110
    status: Math.random() > 0.5 ? 'In Stock' : 'Out of Stock',
    quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
  });
}

export default fakeMedicines;
