import { Router } from 'express';
import RoomController from './room.controller';
import asyncHandler from '../../middlewares/asyncHandler';
import { roomSchema } from './room.validator';
import { validatorHandler } from '../../middlewares/validatorHandler';

const router = Router();

router
  .route('/')
  .get(asyncHandler(RoomController.getRooms))
  .post(validatorHandler(roomSchema), asyncHandler(RoomController.createARoom));

router
  .route('/:id')
  .get(asyncHandler(RoomController.getRoomById))
  .put(asyncHandler(RoomController.updateRoomById))
  .delete(asyncHandler(RoomController.deleteRoomById));

export default router;
