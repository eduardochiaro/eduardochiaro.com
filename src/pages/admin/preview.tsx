import { useSession } from 'next-auth/react';
import AdminWrapper from '@/components/admin/Wrapper';

const AdminPreviewIndex = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <AdminWrapper isPageOpen={true}>
        <iframe 
          className="h-screen w-full" 
          src="/"
          allowTransparency={true}
        ></iframe>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminPreviewIndex;
