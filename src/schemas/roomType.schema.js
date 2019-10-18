import { SchemaTypes } from '../db/SchemaTypes';

export const roomType = {
  id: {
    type: SchemaTypes.UUID,
    primary: true,
    nullable: false,
    unique: true
    // default: SchemaTypes.UUID
  },

  name: {
    type: SchemaTypes.STRING,
    maxLength: 25,
    unique: true,
    nullable: false
  }
};
