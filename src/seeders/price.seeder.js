import uuid from 'uuid';
import { roomTypes } from './seederIds';

export const price = [
  {
    id: uuid.v4(),
    price: 5000,
    room_type: roomTypes[0]
  },
  {
    id: uuid.v4(),
    price: 8000,
    room_type: roomTypes[1]
  },
  {
    id: uuid.v4(),
    price: 9000,
    room_type: roomTypes[2]
  },
  {
    id: uuid.v4(),
    price: 10000,
    room_type: roomTypes[3]
  }
];
