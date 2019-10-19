const selectQueryTemplate = (tableName, columnName, columnAlias) =>
  `"${tableName}"."${columnName}" AS "${columnAlias}"`;

const getName = (tableName, aliasName, schema) => {
  return Object.keys(schema)
    .reduce(
      (tot, next) =>
        `${tot}, "${tableName}"."${next}" AS "${aliasName}.${next}"`,
      ''
    )
    .slice(2);
};

const modelInclude = (attrObj, tableName, includeData) => {
  const includeDataObj = Array.isArray(includeData)
    ? includeData.reduce((tot, value) => {
        tot[value] = value;
        return tot;
      }, {})
    : includeData;

  const keys = includeDataObj.allColumns
    ? Object.keys(attrObj)
    : Object.keys(attrObj).filter(value => includeDataObj[value]);

  return keys
    .reduce((tot, value) => {
      if (includeDataObj[value] && includeDataObj[value].model) {
        return `${tot}, ${getName(
          includeDataObj[value].model.tableName,
          includeDataObj[value].alias || includeDataObj[value].model.tableName,
          includeDataObj[value].model.schema
        )}`;
      }

      return `${tot}, ${selectQueryTemplate(
        tableName,
        value,
        (includeDataObj[value] && includeDataObj[value].alias) ||
          includeDataObj[value] ||
          value
      )}`;
    }, '')
    .slice(2);
};

const modelExclude = (attrObj, excludeArray) => {
  excludeArray.forEach(value => delete attrObj[value]);
  return attrObj;
};

const modelRename = (attrObj, tableName, renameObj) => {
  return Object.keys(attrObj)
    .reduce(
      (tot, value) =>
        `${tot}, ${selectQueryTemplate(
          tableName,
          value,
          renameObj[value] || value
        )}`,
      ''
    )
    .slice(2);
};

const modelAsColumns = (dataObj, renameObj) => {
  return Object.keys(dataObj).reduce((newDataObj, value) => {
    newDataObj[renameObj[value] || value] = dataObj[value];
    return newDataObj;
  }, {});
};

const convertToJoin = (tableName, args) => {
  if (args && typeof args.include === 'object') {
    return Object.keys(args.include)
      .reduce((tot, value) => {
        if (
          typeof (args.include[value] === 'object') &&
          args.include[value].model
        ) {
          return `${tot} LEFT JOIN ${
            args.include[value].model.tableName
          } ON ${tableName}.${value}=${
            args.include[value].model.tableName
          }.${args.include[value].through || 'id'}`;
        }
        return '';
      }, '')
      .slice(1);
  }
  return '';
};

const convertQueryObj = (schema, tableName, args) => {
  let attrObj = { ...schema };

  if (!args) return '*';

  if (args.include) {
    return modelInclude(attrObj, tableName, args.include);
  }

  if (args.exclude) {
    attrObj = modelExclude(attrObj, args.exclude);
  }

  if (args.rename) {
    return modelRename(attrObj, tableName, args.rename);
  }

  return Object.keys(attrObj).join(', ');
};

export default class Model {
  constructor(dbConnection, tableSchema, tableName) {
    const schema = { ...tableSchema };
    delete schema.constraints;

    this.schema = schema;
    this.tableName = tableName;
    this.dbConnection = dbConnection;
  }

  query(text) {
    return this.dbConnection.query(text);
  }

  findOneWhere(where, args) {
    const attr = convertQueryObj(this.schema, this.tableName, args);
    const [whereName, whereValue] = Object.entries(where)[0];
    const query = `SELECT ${attr} FROM ${this.tableName} WHERE "${whereName}"='${whereValue}';`;

    return this.query(query).then(({ rows }) => rows[0]);
  }

  findAll(args) {
    const attr = convertQueryObj(this.schema, this.tableName, args);
    const joinClause = convertToJoin(this.tableName, args);
    const query = `SELECT ${attr} FROM ${this.tableName} ${joinClause};`;

    return this.query(query).then(({ rows }) => rows);
  }

  findByPK(pk, args) {
    const attr = convertQueryObj(this.schema, this.tableName, args);
    const query = `SELECT ${attr} FROM ${this.tableName} WHERE id='${pk}';`;

    return this.query(query).then(({ rows }) => rows[0]);
  }

  deleteByPK(pk) {
    const query = `DELETE FROM ${this.tableName} WHERE id='${pk}' RETURNING *;`;

    return this.query(query).then(({ rows }) => rows[0]);
  }

  createOne(dataObj, { asColumns, ...args } = {}) {
    const newDataObj = asColumns ? modelAsColumns(dataObj, asColumns) : dataObj;

    const attr = convertQueryObj(this.schema, this.tableName, args);

    const columns = Object.keys(newDataObj)
      .reduce((tot, key) => `${tot}, ${key}`, '')
      .slice(2);

    const values = `(${Object.values(dataObj)
      .reduce((tot, key) => `${tot}, '${key}'`, '')
      .slice(2)})`;

    const query = `INSERT INTO ${this.tableName}(${columns}) VALUES ${values} RETURNING ${attr};`;

    return this.query(query).then(({ rows }) => rows[0]);
  }

  updateByPK(pk, newData) {
    const updateValues = Object.keys(newData)
      .reduce((tot, key) => {
        return `${tot}, ${key} = '${newData[key]}'`;
      }, '')
      .slice(2);

    const query = `UPDATE ${this.tableName} SET ${updateValues} WHERE id='${pk}' RETURNING *;`;

    return this.query(query).then(({ rows }) => rows[0]);
  }
}
