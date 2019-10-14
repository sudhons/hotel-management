import { Router } from 'express';
import RoomCapacityController from './roomCapacity.controller';

const router = Router();
router
  .route('/')
  .get(RoomCapacityController.getRoomCapacities)
  .post(RoomCapacityController.createARoomCapacity);

router
  .route('/:id')
  .get(RoomCapacityController.getRoomCapacityById)
  .put(RoomCapacityController.updateRoomCapacityById)
  .delete(RoomCapacityController.deleteRoomCapacityById);

export default router;
