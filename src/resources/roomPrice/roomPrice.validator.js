import Validate from '../../validator';

export const roomPriceSchema = {
  price: Validate.validate()
    .float()
    .positive()
    .required(),

  roomType: Validate.validate()
    .string()
    .uuidv4()
    .required()
};
