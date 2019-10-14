const { SchemaTypes } = require('../db/SchemaTypes');

const roomType = {
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

module.exports = {
  roomType
};
