import Validate from '../../validator';

export const roomTypeSchema = {
  name: Validate.validate()
    .string()
    .minLen(3)
    .maxLen(25)
    .required()
};
