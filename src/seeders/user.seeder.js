const uuid = require('uuid');

const userSeeder = [
  {
    id: uuid.v4(),
    first_name: 'standard1',
    last_name: 'standard',
    password: 'standard1',
    email: 'standard1@stan.com'
  },
  {
    id: uuid.v4(),
    first_name: 'standard2',
    last_name: 'standard',
    password: 'standard2',
    email: 'standard2@stan.com'
  },
  {
    id: uuid.v4(),
    first_name: 'standard3',
    last_name: 'standard',
    password: 'standard3',
    email: 'standard3@stan.com'
  }
];

module.exports = {
  userSeeder
};
