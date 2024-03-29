import uuid from 'uuid';
import { RoomPrice } from '../../models';

export default class RoomPriceService {
  static findAll() {
    return RoomPrice.findAll({
      rename: {
        room_type: 'roomType'
      }
    });
  }

  static findById(id) {
    return RoomPrice.findByPK(id);
  }

  static createOne(roomPrice) {
    roomPrice.id = uuid.v4();
    return RoomPrice.createOne(roomPrice, {
      rename: {
        room_type: 'roomType'
      },
      asColumns: {
        roomType: 'room_type'
      }
    });
  }

  static deleteById(id) {
    return RoomPrice.deleteByPK(id);
  }

  static updateById(id, price) {
    return RoomPrice.updateByPK(id, price);
  }
}
