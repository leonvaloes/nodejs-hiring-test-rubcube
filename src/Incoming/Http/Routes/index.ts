import { Router } from 'express';
import adminRouter from './AdminRoutes';
import payerRouter from './PlayerRoutes';

const router = Router();

router.use('/admin', adminRouter);
router.use('/player', payerRouter);


export default router;
