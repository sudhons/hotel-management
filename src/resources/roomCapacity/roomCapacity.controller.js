import RoomCapacityService from './roomCapacity.service';

export default class RoomCapacity {
  static async getRoomCapacities(req, res) {
    return res.status(200).json(await RoomCapacityService.findAll());
  }

  static async createARoomCapacity(req, res) {
    return res.status(201).json(await RoomCapacityService.createOne(req.body));
  }

  static async getRoomCapacityById(req, res) {
    return res
      .status(200)
      .json(await RoomCapacityService.findById(req.params.id));
  }

  static async deleteRoomCapacityById(req, res) {
    return res
      .status(201)
      .json(await RoomCapacityService.deleteById(req.params.id));
  }

  static async updateRoomCapacityById(req, res) {
    return res
      .status(200)
      .json(await RoomCapacityService.updateById(req.params.id, req.body));
  }
}
