const { SchemaTypes } = require('../db/SchemaTypes');

const room = {
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
  availability: {
    type: SchemaTypes.BOOLEAN,
    nullable: false
  }
};

module.exports = {
  room
};
