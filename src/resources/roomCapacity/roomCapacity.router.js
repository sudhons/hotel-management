import { Router } from 'express';
import RoomCapacityController from './roomCapacity.controller';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();
router
  .route('/')
  .get(asyncHandler(RoomCapacityController.getRoomCapacities))
  .post(asyncHandler(RoomCapacityController.createARoomCapacity));

router
  .route('/:id')
  .get(asyncHandler(RoomCapacityController.getRoomCapacityById))
  .put(asyncHandler(RoomCapacityController.updateRoomCapacityById))
  .delete(asyncHandler(RoomCapacityController.deleteRoomCapacityById));

export default router;
