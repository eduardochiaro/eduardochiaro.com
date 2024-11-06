import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import Card from '@/components/frontend/Card';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function DashboardAppsView({ params }: { params: { pid: string } }) {
  const app = await pullSingleApp(params.pid);
  return (
    <div>
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Apps Edit</h2>
      </Card>
      {app && (
        <div>
          <h2 className="text-2xl font-semibold">{app.name}</h2>
          <p>{app.description}</p>
          <p>{app.file?.name}</p>
        </div>
      )}
    </div>
  );
}

const pullSingleApp = async (id: string) => {
  return prisma.app.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      file: true,
    },
  });
};
