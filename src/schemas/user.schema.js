import { SchemaTypes } from '../db/SchemaTypes';

export const user = {
  columns: {
    id: {
      type: SchemaTypes.UUID,
      primary: true,
      nullable: false
    },
    first_name: {
      type: SchemaTypes.STRING,
      maxLength: 20,
      nullable: false
    },
    last_name: {
      type: SchemaTypes.STRING,
      maxLength: 20,
      nullable: false
    },
    email: {
      type: SchemaTypes.STRING,
      maxLength: 50,
      nullable: false,
      unique: true
    },
    password: {
      type: SchemaTypes.STRING,
      maxLength: 100,
      nullable: false
    }
  }
};
