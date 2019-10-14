import { Router } from 'express';
import roomPriceRouter from '../resources/roomPrice/roomPrice.router';
import roomTypeRouter from '../resources/roomType/roomType.router';
import roomCapacityRouter from '../resources/roomCapacity/roomCapacity.router';
import roomRouter from '../resources/room/room.router';
import authRouter from '../resources/auth/auth.router';

const router = Router();

router.use('/auth', authRouter);

router.use('/rooms/prices', roomPriceRouter);

router.use('/rooms/types', roomTypeRouter);

router.use('/rooms/capacities', roomCapacityRouter);

router.use('/rooms', roomRouter);

export default router;
