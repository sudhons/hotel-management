const { discountPrice } = require('./discountPrice.schema');
const { price } = require('./price.schema');
const { room } = require('./room.schema');
const { roomCapacity } = require('./roomCapacity.schema');
const { roomType } = require('./roomType.schema');
const { user } = require('./user.schema');

module.exports = {
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

// export default fs
//   .readdirSync(__dirname)
//   .filter(
//     file =>
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//   )
//   .reduce(async (schemas, file) => {
//     const [schemaName, schema] = await Object.entries(
//       (await import(path.join(__dirname, file))).default
//     )[0];

//     schemas[schemaName] = schema;
//     console.log(schemas);
//     return schemas;
//   }, {});
