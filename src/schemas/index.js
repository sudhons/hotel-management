import { discountPrice } from './discountPrice.schema';
import { price } from './price.schema';
import { room } from './room.schema';
import { roomCapacity } from './roomCapacity.schema';
import { roomType } from './roomType.schema';
import { user } from './user.schema';

export default {
  user,
  roomType,
  roomCapacity,
  room,
  price,
  discountPrice
};

// import fs from 'fs';
// import path from 'path';

// const basename = path.basename(__filename);

// const files = fs
//   .readdirSync(__dirname)
//   .filter(
//     file =>
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//   )
//   .map(file => require(path.join(__dirname, file)));

// export default files.reduceRight((result, next) => {
//   const [key, value] = Object.entries(next)[0];
//   result[key] = value;
//   return result;
// }, {});
