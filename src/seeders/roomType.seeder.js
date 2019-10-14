const { roomTypes } = require('./seederIds');

const roomTypeSeeder = [
  {
    id: roomTypes[0],
    name: 'standard'
  },
  {
    id: roomTypes[1],
    name: 'deluxe'
  }
];

module.exports = {
  roomTypeSeeder
};
