import { Router } from 'express';
import RoomPriceController from './roomPrice.controller';

const router = Router();

router
  .route('/')
  .get(RoomPriceController.getRoomPrices)
  .post(RoomPriceController.createARoomPrice);

router
  .route('/:id')
  .get(RoomPriceController.getRoomPriceById)
  .put(RoomPriceController.updateRoomPriceById)
  .delete(RoomPriceController.deleteRoomPriceById);

export default router;
