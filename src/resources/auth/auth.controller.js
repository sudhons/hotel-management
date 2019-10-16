import UserService from './auth.service';
import { hashPassword, validatePassword, generateAuthToken } from '../../utils';

export default class User {
  static async register(req, res) {
    const userData = { ...req.body };

    userData.password = hashPassword(userData.password);

    const user = await UserService.createOne(userData);

    const token = generateAuthToken(user);

    return res.status(201).json({
      status: 'success',
      token
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid Credentials'
      });
    }

    const isValidUser = validatePassword(password, user.password);

    if (!isValidUser) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid Credentials'
      });
    }

    const { firstName, lastName, id } = user;

    const token = generateAuthToken({
      id,
      firstName,
      lastName
    });

    return res.status(201).json({
      status: 'success',
      token
    });
  }
}
