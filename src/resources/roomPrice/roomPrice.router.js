import { Router } from 'express';
import RoomPriceController from './roomPrice.controller';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router
  .route('/')
  .get(asyncHandler(RoomPriceController.getRoomPrices))
  .post(asyncHandler(RoomPriceController.createARoomPrice));

router
  .route('/:id')
  .get(asyncHandler(RoomPriceController.getRoomPriceById))
  .put(asyncHandler(RoomPriceController.updateRoomPriceById))
  .delete(asyncHandler(RoomPriceController.deleteRoomPriceById));

export default router;
