import { Metadata } from 'next';
import BackendLayout from '@/components/layouts/Backend';

export const metadata: Metadata = {
  title: 'Admin > Preview | Eduardo Chiaro',
};

export default async function AdminMenuIndex() {
  return (
    <BackendLayout isPageOpen={false}>
      <iframe className="h-screen w-full" src="/" allowTransparency={true}></iframe>
    </BackendLayout>
  );
}
