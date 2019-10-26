import { SchemaTypes } from '../db/SchemaTypes';

export const discountPrice = {
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
    till_date: {
      type: SchemaTypes.TIMESTAMP,
      nullable: false
    },
    number_of_rooms: {
      type: SchemaTypes.INT,
      nullable: false
    }
  },

  constraints: {
    [SchemaTypes.UNIQUE]: ['room_type']
  }
};
