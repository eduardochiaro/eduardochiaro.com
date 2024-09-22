import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';

export const metadata: Metadata = {
  title: 'Admin | Eduardo Chiaro',
};

export default async function AdminIndex() {
  const columns = [
    {
      title: 'Product name',
      key: 'product_name',
      sortable: true,
    },
    {
      title: 'Color',
      key: 'color',
      sortable: true,
    },
    {
      title: 'Category',
      key: 'category',
      sortable: true,
    },
    {
      title: 'Price',
      key: 'price',
      sortable: false,
    },
  ];
  const data = [
    {
      product_name: 'Apple MacBook Pro 17"',
      color: 'Silver',
      category: 'Laptop',
      price: '$2999',
    },
    {
      product_name: 'Microsoft Surface Pro',
      color: 'White',
      category: 'Laptop PC',
      price: '$1999',
    },
    {
      product_name: 'Magic Mouse 2',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
  ];
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}
