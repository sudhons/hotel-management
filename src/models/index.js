import { createModel } from '../db';
import schemas from '../schemas';

export const User = createModel('users', schemas.user);
export const RoomType = createModel('room_types', schemas.roomType);
export const Room = createModel('rooms', schemas.room);
export const RoomPrice = createModel('prices', schemas.price);
