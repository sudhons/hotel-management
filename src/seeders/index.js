// const { discountPriceSeeder } = require('./discountPrice.seeder');
const { priceSeeder } = require('./price.seeder');
const { roomSeeder } = require('./room.seeder');
const { roomCapacitySeeder } = require('./roomCapacity.seeder');
const { roomTypeSeeder } = require('./roomType.seeder');
const { userSeeder } = require('./user.seeder');

module.exports = {
  roomType: roomTypeSeeder,
  roomCapacity: roomCapacitySeeder,
  price: priceSeeder,
  room: roomSeeder,
  user: userSeeder
  // discount_prices: discountPriceSeeder
};
