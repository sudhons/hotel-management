import { SchemaTypes } from '../db/SchemaTypes';

export const roomType = {
  columns: {
    id: {
      type: SchemaTypes.UUID,
      primary: true,
      nullable: false,
      unique: true
    },

    name: {
      type: SchemaTypes.STRING,
      maxLength: 25,
      unique: true,
      nullable: false
    }
  }
};
