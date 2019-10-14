import RoomPriceService from './roomPrice.service';

export default class RoomPrice {
  static async getRoomPrices(req, res) {
    return res.status(200).json(await RoomPriceService.findAll());
  }

  static async createARoomPrice(req, res) {
    return res.status(201).json(await RoomPriceService.createOne(req.body));
  }

  static async getRoomPriceById(req, res) {
    return res.status(200).json(await RoomPriceService.findById(req.params.id));
  }

  static async deleteRoomPriceById(req, res) {
    return res
      .status(201)
      .json(await RoomPriceService.deleteById(req.params.id));
  }

  static async updateRoomPriceById(req, res) {
    return res
      .status(200)
      .json(await RoomPriceService.updateById(req.params.id, req.body));
  }
}
