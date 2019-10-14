import { Router } from 'express';
import RoomController from './room.controller';

const router = Router();

router
  .route('/')
  .get(RoomController.getRooms)
  .post(RoomController.createARoom);

router
  .route('/:id')
  .get(RoomController.getRoomById)
  .put(RoomController.updateRoomById)
  .delete(RoomController.deleteRoomById);

export default router;
