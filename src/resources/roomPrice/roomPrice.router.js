import { Router } from 'express';
import RoomPriceController from './roomPrice.controller';
import asyncHandler from '../../middlewares/asyncHandler';
import { roomPriceSchema } from './roomPrice.validator';
import { validatorHandler } from '../../middlewares/validatorHandler';

const router = Router();

router
  .route('/')
  .get(asyncHandler(RoomPriceController.getRoomPrices))
  .post(
    validatorHandler(roomPriceSchema),
    asyncHandler(RoomPriceController.createARoomPrice)
  );

router
  .route('/:id')
  .get(asyncHandler(RoomPriceController.getRoomPriceById))
  .put(asyncHandler(RoomPriceController.updateRoomPriceById))
  .delete(asyncHandler(RoomPriceController.deleteRoomPriceById));

export default router;
