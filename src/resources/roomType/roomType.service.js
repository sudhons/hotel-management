import uuid from 'uuid';
import Models from '../../models';

const { RoomType, RoomPrice } = Models;

export default class RoomTypeService {
  static findAll() {
    return RoomType.findAll();
  }

  static findById(id) {
    return RoomType.findByPK(id);
  }

  static createOne(roomType) {
    roomType.id = uuid.v4();
    return RoomType.createOne(roomType);
  }

  static deleteById(id) {
    return RoomType.deleteByPK(id);
  }

  static updateById(id, roomType) {
    return RoomType.updateByPK(id, roomType);
  }
}
