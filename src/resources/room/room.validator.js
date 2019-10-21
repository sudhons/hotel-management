import Validate from '../../validator';

export const roomSchema = {
  name: Validate.validate()
    .string()
    .minLen(1)
    .maxLen(5)
    .required(),

  roomCapacity: Validate.validate()
    .string()
    .uuidv4()
    .required(),

  roomType: Validate.validate()
    .string()
    .uuidv4()
    .required()
};
