import uuid from 'uuid';
import Models from '../../models';

const { Room, RoomType } = Models;

export default class RoomService {
  static findAll() {
    // return Room.findAll();
    // return Room.findAll({
    //   include: ['name', 'availability', 'id']
    // });
    // return Room.findAll({
    //   exclude: ['id', 'name']
    // });
    return Room.findAll({
      rename: {
        room_type: 'roomType'
      }
    });
    // return Room.findAll({
    //   include: {
    //     // id: 'id',
    //     // availability: 'Availability',
    //     // name: 'name',
    //     // availability: {
    //     //   alias: 'Availability'
    //     // }
    //     allColumns: true,
    //     room_type: {
    //       model: RoomType,
    //       through: 'id',
    //       alias: 'roomType',
    //       include: ['name']
    //     }
    //   }
    // });
  }

  static findById(id) {
    return Room.findByPK(id, {
      rename: {
        room_type: 'roomType'
      }
    });
  }

  static createOne(room) {
    room.id = uuid.v4();
    return Room.createOne(room, {
      asColumns: {
        roomType: 'room_type'
      },
      rename: {
        room_type: 'roomType'
      }
    });
  }

  static deleteById(id) {
    return Room.deleteByPK(id);
  }

  static updateById(id, room) {
    return Room.updateByPK(id, room);
  }
}
