import { useSession } from 'next-auth/react';
import BackendLayout from '@/components/layouts/Backend';

const AdminPreviewIndex = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <BackendLayout isPageOpen={false}>
        <iframe className="h-screen w-full" src="/" allowTransparency={true}></iframe>
      </BackendLayout>
    );
  }
  return null;
};

export default AdminPreviewIndex;
