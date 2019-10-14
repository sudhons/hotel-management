const { roomCapacities } = require('./seederIds');

const roomCapacitySeeder = [
  {
    id: roomCapacities[0],
    name: 'single'
  },
  {
    id: roomCapacities[1],
    name: 'double'
  },
  {
    id: roomCapacities[2],
    name: 'family'
  }
];

module.exports = {
  roomCapacitySeeder
};
