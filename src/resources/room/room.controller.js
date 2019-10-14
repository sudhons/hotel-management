import RoomService from './room.service';

export default class Room {
  static async getRooms(req, res) {
    return res.status(200).json(await RoomService.findAll());
  }

  static async createARoom(req, res) {
    return res.status(201).json(await RoomService.createOne(req.body));
  }

  static async getRoomById(req, res) {
    return res.status(200).json(await RoomService.findById(req.params.id));
  }

  static async deleteRoomById(req, res) {
    return res.status(201).json(await RoomService.deleteById(req.params.id));
  }

  static async updateRoomById(req, res) {
    return res
      .status(200)
      .json(await RoomService.updateById(req.params.id, req.body));
  }
}
