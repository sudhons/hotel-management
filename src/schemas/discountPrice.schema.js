import { SchemaTypes } from '../db/SchemaTypes';

export const discountPrice = {
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
      schemaName: 'roomType',
      columnName: 'id',
      onDelete: SchemaTypes.CASCADE
    }
  },
  room_capacity: {
    type: SchemaTypes.UUID,
    nullable: false,
    reference: {
      schemaName: 'roomCapacity',
      columnName: 'id',
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
};
