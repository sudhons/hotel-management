import { Router } from 'express';
import RoomController from './room.controller';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router
  .route('/')
  .get(asyncHandler(RoomController.getRooms))
  .post(asyncHandler(RoomController.createARoom));

router
  .route('/:id')
  .get(asyncHandler(RoomController.getRoomById))
  .put(asyncHandler(RoomController.updateRoomById))
  .delete(asyncHandler(RoomController.deleteRoomById));

export default router;
