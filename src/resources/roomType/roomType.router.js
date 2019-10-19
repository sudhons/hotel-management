import { Router } from 'express';
import RoomTypeController from './roomType.controller';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router
  .route('/')
  .get(asyncHandler(RoomTypeController.getRoomTypes))
  .post(asyncHandler(RoomTypeController.createARoomType));

router
  .route('/:id')
  .get(asyncHandler(RoomTypeController.getRoomTypeById))
  .put(asyncHandler(RoomTypeController.updateRoomTypeById))
  .delete(asyncHandler(RoomTypeController.deleteRoomTypeById));

export default router;
