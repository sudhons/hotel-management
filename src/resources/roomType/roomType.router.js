import { Router } from 'express';
import RoomTypeController from './roomType.controller';
import asyncHandler from '../../middlewares/asyncHandler';
import { roomTypeSchema } from './roomType.validator';
import { validatorHandler } from '../../middlewares/validatorHandler';

const router = Router();

router
  .route('/')
  .get(asyncHandler(RoomTypeController.getRoomTypes))
  .post(
    validatorHandler(roomTypeSchema),
    asyncHandler(RoomTypeController.createARoomType)
  );

router
  .route('/:id')
  .get(asyncHandler(RoomTypeController.getRoomTypeById))
  .put(asyncHandler(RoomTypeController.updateRoomTypeById))
  .delete(asyncHandler(RoomTypeController.deleteRoomTypeById));

export default router;
