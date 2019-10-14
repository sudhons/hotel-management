import uuid from 'uuid';
import Models from '../../models';

const { RoomCapacity } = Models;

export default class RoomCapacityService {
  static findAll() {
    return RoomCapacity.findAll();
  }

  static findById(id) {
    return RoomCapacity.findByPK(id);
  }

  static createOne(roomCapacity) {
    roomCapacity.id = uuid.v4();
    return RoomCapacity.createOne(roomCapacity);
  }

  static deleteById(id) {
    return RoomCapacity.deleteByPK(id);
  }

  static updateById(id, roomCapacity) {
    return RoomCapacity.updateByPK(id, roomCapacity);
  }
}
