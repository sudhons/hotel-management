import uuid from 'uuid';
import Models from '../../models';

const { User } = Models;

export default class AuthService {
  // static findAll() {
  //   return User.findAll();
  // }

  // static findById(id) {
  //   return User.findByPK(id);
  // }

  static createOne(user) {
    user.id = uuid.v4();
    return User.createOne(user, {
      asColumns: {
        firstName: 'first_name',
        lastName: 'last_name'
      },
      rename: {
        first_name: 'firstName',
        last_name: 'lastName'
      },
      exclude: ['password']
    });
  }

  static findByEmail(email) {
    return User.findOneWhere(
      { email },
      {
        rename: {
          first_name: 'firstName',
          last_name: 'lastName'
        }
      }
    );
  }

  // static deleteById(id) {
  //   return User.deleteByPK(id);
  // }

  // static updateById(id, room) {
  //   return User.updateByPK(id, room);
  // }
}
