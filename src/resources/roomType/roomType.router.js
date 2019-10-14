import { Router } from 'express';
import RoomTypeController from './roomType.controller';

const router = Router();

router
  .route('/')
  .get(RoomTypeController.getRoomTypes)
  .post(RoomTypeController.createARoomType);

router
  .route('/:id')
  .get(RoomTypeController.getRoomTypeById)
  .put(RoomTypeController.updateRoomTypeById)
  .delete(RoomTypeController.deleteRoomTypeById);

export default router;
