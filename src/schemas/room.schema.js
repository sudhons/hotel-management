import { SchemaTypes } from '../db/SchemaTypes';

export const room = {
  columns: {
    id: {
      type: SchemaTypes.UUID,
      primary: true,
      nullable: false
    },
    name: {
      type: SchemaTypes.STRING,
      maxLength: 5,
      nullable: false,
      unique: true
    },
    room_type: {
      type: SchemaTypes.UUID,
      nullable: false,
      reference: {
        refSchema: 'roomType',
        refColumn: 'id',
        onDelete: SchemaTypes.CASCADE
      }
    },
    room_capacity: {
      type: SchemaTypes.UUID,
      nullable: false,
      reference: {
        refSchema: 'roomCapacity',
        refColumn: 'id',
        onDelete: SchemaTypes.CASCADE
      }
    },
    availability: {
      type: SchemaTypes.BOOLEAN,
      nullable: false,
      default: false
    }
  }
};
