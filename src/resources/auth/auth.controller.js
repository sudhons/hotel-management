import UserService from './auth.service';
import {
  hashPassword,
  validatePassword,
  generateAuthToken
} from '../../utils/helpers';
import { created, notFound, success } from '../../utils/jsonResponse';

export default class User {
  static async register(req, res) {
    const userData = { ...req.body };

    userData.password = hashPassword(userData.password);

    const user = await UserService.createOne(userData);

    const token = generateAuthToken(user);

    return created({ token, res });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);

    const isValidUser = user && validatePassword(password, user.password);

    if (!isValidUser) {
      return notFound({
        message: 'Invalid Credentials',
        res
      });
    }

    const { firstName, lastName, id } = user;

    const token = generateAuthToken({
      id,
      firstName,
      lastName
    });

    return success({ token, res });
  }
}
