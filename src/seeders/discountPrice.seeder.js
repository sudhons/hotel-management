import uuid from 'uuid';
import { roomTypes } from './seederIds';

export const discountPrice = [
  {
    id: uuid.v4(),
    price: 3000,
    room_type: roomTypes[0],
    till_date: 'now()',
    number_of_rooms: 5
  },
  {
    id: uuid.v4(),
    price: 6000,
    room_type: roomTypes[1],
    till_date: 'now()',
    number_of_rooms: 5
  },
  {
    id: uuid.v4(),
    price: 7500,
    room_type: roomTypes[2],
    till_date: 'now()',
    number_of_rooms: 2
  },
  {
    id: uuid.v4(),
    price: 9000,
    room_type: roomTypes[3],
    till_date: 'now()',
    number_of_rooms: 2
  }
];
