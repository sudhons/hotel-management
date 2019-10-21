import { SchemaTypes } from '../db/SchemaTypes';

export const price = {
  columns: {
    id: {
      type: SchemaTypes.UUID,
      primary: true,
      nullable: false
    },
    price: {
      type: SchemaTypes.FLOAT,
      nullable: false
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
    }
  },

  constraints: {
    [SchemaTypes.UNIQUE]: ['room_capacity', 'room_type']
  }
};
