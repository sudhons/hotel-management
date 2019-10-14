import RoomTypeService from './roomType.service';

export default class RoomType {
  static async getRoomTypes(req, res) {
    return res.status(200).json(await RoomTypeService.findAll());
  }

  static async createARoomType(req, res) {
    return res.status(201).json(await RoomTypeService.createOne(req.body));
  }

  static async getRoomTypeById(req, res) {
    return res.status(200).json(await RoomTypeService.findById(req.params.id));
  }

  static async deleteRoomTypeById(req, res) {
    return res
      .status(201)
      .json(await RoomTypeService.deleteById(req.params.id));
  }

  static async updateRoomTypeById(req, res) {
    return res
      .status(200)
      .json(await RoomTypeService.updateById(req.params.id, req.body));
  }
}
