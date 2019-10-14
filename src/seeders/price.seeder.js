const uuid = require('uuid');
const { roomCapacities, roomTypes } = require('./seederIds');

const priceSeeder = [
  {
    id: uuid.v4(),
    price: 5000,
    room_type: roomTypes[0],
    room_capacity: roomCapacities[0]
  },
  {
    id: uuid.v4(),
    price: 8000,
    room_type: roomTypes[0],
    room_capacity: roomCapacities[1]
  },
  {
    id: uuid.v4(),
    price: 9000,
    room_type: roomTypes[0],
    room_capacity: roomCapacities[2]
  },
  {
    id: uuid.v4(),
    price: 10000,
    room_type: roomTypes[1],
    room_capacity: roomCapacities[0]
  },
  {
    id: uuid.v4(),
    price: 12000,
    room_type: roomTypes[1],
    room_capacity: roomCapacities[1]
  },
  {
    id: uuid.v4(),
    price: 15000,
    room_type: roomTypes[1],
    room_capacity: roomCapacities[2]
  }
];

module.exports = {
  priceSeeder
};
