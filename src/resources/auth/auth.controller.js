import UserService from './auth.service';

export default class User {
  static async register(req, res) {
    return res.status(201).json(await UserService.createOne(req.body));
  }

  static async login(req, res) {
    return res.status(200).json(await UserService.findByEmail(req.body.email));
  }
}
