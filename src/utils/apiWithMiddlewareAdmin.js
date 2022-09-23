import { use } from 'next-api-middleware';
import addRequestId from '@/middlewares/addRequestId';
import adminOnly from '@/middlewares/adminOnly';

export default use(
    addRequestId,
    adminOnly
);
