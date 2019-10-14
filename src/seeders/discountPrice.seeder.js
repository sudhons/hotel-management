const uuid = require('uuid');
const { roomCapacities, roomTypes } = require('./seederIds');

const discountPriceSeeder = [
  {
    id: uuid.v4(),
    price: 3000,
    room_type: roomTypes[0],
    room_capacity: roomCapacities[0],
    till_date: new Date(),
    number_of_rooms: 5
  },
  {
    id: uuid.v4(),
    price: 6000,
    room_type: roomTypes[0],
    room_capacity: roomCapacities[1],
    till_date: new Date(),
    number_of_rooms: 5
  },
  {
    id: uuid.v4(),
    price: 7500,
    room_type: roomTypes[0],
    room_capacity: roomCapacities[2],
    till_date: new Date(),
    number_of_rooms: 2
  }
];

module.exports = {
  discountPriceSeeder
};
