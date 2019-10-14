RoomService.findAll({
  include: ['id', 'name', 'price', 'primary_key'],
  include: {
    primary_key: 'primaryKey',
    id: 'Id'
  },
  include: {
    primary_key: 'primaryKey',
    id: 'Id',
    product: {
      model: Product,
      alias: 'PRODUCT',
      include: [],
      include: {},
      exclude: [],
      rename: {}
    }
  },
  exclude: ['amount', 'password'],
  rename: {
    primary_key: 'primaryKey'
  }
});
