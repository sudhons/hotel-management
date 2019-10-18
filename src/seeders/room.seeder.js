import uuid from 'uuid';
import { roomCapacities, roomTypes } from './seederIds';

export const room = [
  {
    id: uuid.v4(),
    name: 'A1',
    room_type: roomTypes[0],
    room_capacity: roomCapacities[0],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'A2',
    room_type: roomTypes[0],
    room_capacity: roomCapacities[1],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'A3',
    room_type: roomTypes[0],
    room_capacity: roomCapacities[2],
    availability: false
  },
  {
    id: uuid.v4(),
    name: 'B1',
    room_type: roomTypes[1],
    room_capacity: roomCapacities[0],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'B2',
    room_type: roomTypes[1],
    room_capacity: roomCapacities[1],
    availability: false
  },
  {
    id: uuid.v4(),
    name: 'B3',
    room_type: roomTypes[1],
    room_capacity: roomCapacities[2],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'C1',
    room_type: roomTypes[0],
    room_capacity: roomCapacities[0],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'C2',
    room_type: roomTypes[0],
    room_capacity: roomCapacities[1],
    availability: false
  },
  {
    id: uuid.v4(),
    name: 'C3',
    room_type: roomTypes[0],
    room_capacity: roomCapacities[2],
    availability: false
  },
  {
    id: uuid.v4(),
    name: 'D1',
    room_type: roomTypes[1],
    room_capacity: roomCapacities[0],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'D2',
    room_type: roomTypes[1],
    room_capacity: roomCapacities[1],
    availability: true
  },
  {
    id: uuid.v4(),
    name: 'D3',
    room_type: roomTypes[1],
    room_capacity: roomCapacities[2],
    availability: true
  }
];
