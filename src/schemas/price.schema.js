const { SchemaTypes } = require('../db/SchemaTypes');

const price = {
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
  }
  // constraints: {
  //   room_capacity_room_type: ['room_capacity', 'room_type']
  // }
};

module.exports = {
  price
};
