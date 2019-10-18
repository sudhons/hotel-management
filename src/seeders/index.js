// const { discountPriceSeeder } = require('./discountPrice.seeder');
import { price } from './price.seeder';
import { room } from './room.seeder';
import { roomCapacity } from './roomCapacity.seeder';
import { roomType } from './roomType.seeder';
import { user } from './user.seeder';

export default {
  roomType,
  roomCapacity,
  price,
  room,
  user
  // discount_prices: discountPriceSeeder
};
