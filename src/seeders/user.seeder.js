import uuid from 'uuid';
import { hashPassword } from '../utils/helpers';

export const user = [
  {
    id: uuid.v4(),
    first_name: 'standard1',
    last_name: 'standard',
    password: hashPassword('standard1'),
    email: 'standard1@stan.com'
  },
  {
    id: uuid.v4(),
    first_name: 'standard2',
    last_name: 'standard',
    password: hashPassword('standard2'),
    email: 'standard2@stan.com'
  },
  {
    id: uuid.v4(),
    first_name: 'standard3',
    last_name: 'standard',
    password: hashPassword('standard3'),
    email: 'standard3@stan.com'
  }
];
