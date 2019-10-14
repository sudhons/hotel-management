const { Client } = require('pg');
const dotenv = require('dotenv');
const { SchemaTypes } = require('./SchemaTypes');
const schemas = require('../schemas');
const seeders = require('../seeders');
// const uuid = require('uuid');

dotenv.config();

const pool = new Client({
  connectionString: process.env.DATABASE_URL
});

pool.connect();

pool.on('connect', () => {
  console.log('connected to database');
});

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

const getTableName = schemaName => {
  return schemaName
    .replace(/[A-Z]/g, '_$&')
    .toLowerCase()
    .replace(/[a-z]$/, v => {
      switch (v) {
        case 'y':
          return 'ies';
        case 'f':
          return 'ves';
        case 'x':
          return 'xes';
        default:
          return v === 's' ? v : v + 's';
      }
    });
};

const convertSchemaTypes = v => {
  const { type, maxLength, reference, primary, nullable, unique } = v;
  let result = type;

  if (type === SchemaTypes.STRING) {
    result = `${result}(${maxLength})`;
  }

  if (primary) {
    result = `${result} ${'PRIMARY KEY'}`;
  }

  if (!nullable) {
    result = `${result} ${'NOT NULL'}`;
  }

  if (unique) {
    result = `${result} ${'UNIQUE'}`;
  }

  if (reference) {
    const { schemaName, columnName, onDelete } = reference;

    result = `${result} ${'REFERENCES'} ${getTableName(
      schemaName
    )}(${columnName})`;

    if (onDelete) {
      result = `${result} ON DELETE ${onDelete}`;
    }
  }

  if (v.default) {
    if (v.default === SchemaTypes.UUID) {
      result = `${result} DEFAULT uuid_generate_v1()`;
    } else {
      result = `${result}  DEFAULT ${v.default}`;
    }
  }

  return result;
};

const createTable = (name, schema) => {
  // const schema = { ...n_schema };
  // delete schema.constraints;
  // let constraints = '';
  // if (n_schema.constraints) {
  //   constraints = `, ADD CONSTRAINT ${
  //     Object.keys(n_schema.constraints)[0]
  //   } UNIQUE (${Object.values(n_schema.constraints)[0].join(', ')})`;
  // }
  const columnsWithProperties = Object.keys(schema)
    .reduce((tot, column) => {
      return `${tot}, ${column} ${convertSchemaTypes(schema[column])}`;
    }, '')
    .slice(2);

  // console.log(constraints);

  // const query = `
  //   CREATE TABLE IF NOT EXISTS
  //     ${name}(
  //       ${columnsWithProperties}
  //       ${constraints}
  //     );
  // `;

  const query = `
  CREATE TABLE IF NOT EXISTS
    ${name}(
      ${columnsWithProperties}
    );
  `;

  // console.log(query);

  return query;
};

const createTables = () => {
  const queryString = Object.keys(schemas).reduce((tot, key) => {
    return `${tot}${createTable(getTableName(key), schemas[key])}`;
  }, '');

  pool
    .query(queryString)
    .then(res => {
      console.log('tables created');
    })
    .catch(err => {
      console.log(err);
      console.log('failed to create tables');
    })
    .finally(() => {
      pool.end();
    });
};

const dropTable = name => `DROP TABLE IF EXISTS ${name} CASCADE;`;

const dropTables = () => {
  const queryString = Object.keys(schemas).reduce((tot, key) => {
    return `${tot}${dropTable(getTableName(key))}`;
  }, '');

  pool
    .query(queryString)
    .then(res => {
      console.log('tables dropped');
    })
    .catch(err => {
      console.log('failed to drop tables');
    })
    .finally(() => {
      pool.end();
    });
};

const convertSeed = data => {
  return `(${data.reduce((tot, key) => `${tot}, '${key}'`, '').slice(2)})`;
};

const seedTable = (name, data) => {
  const columns = Object.keys(data[0])
    .reduce((tot, key) => {
      return `${tot}, ${key}`;
    }, '')
    .slice(2);

  // const data2 = { ...data[0] };
  // delete data2.id;

  // const conflictColumns = Object.keys(data2)
  //   .reduce((tot, key) => {
  //     return `${tot}, ${key}`;
  //   }, '')
  //   .slice(2);

  const values = data
    .reduce((tot, item) => {
      return `${tot}, ${convertSeed(Object.values(item))}`;
    }, '')
    .slice(2);

  // const query = `
  //   INSERT INTO ${name}(${columns})
  //   VALUES ${values}
  //   ON CONFLICT (${conflictColumns}) DO NOTHING;
  // `;

  const query = `
    INSERT INTO ${name}(${columns})
    VALUES ${values};
  `;

  return query;
};

const seedTables = () => {
  const queryString = Object.keys(seeders).reduce((tot, key) => {
    return `${tot}${seedTable(getTableName(key), seeders[key])}`;
  }, '');

  pool
    .query(queryString)
    .then(res => {
      console.log('tables seeded');
    })
    .catch(err => {
      console.log(err);
      console.log('failed to seed tables');
    })
    .finally(() => {
      pool.end();
    });
};

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
  const attrObj = { ...schema };
  let result = '';
  if (!args) return '*';

  if (args.include) {
    return modelInclude(attrObj, tableName, args.include);
  }

  if (args.exclude) {
    result = modelExclude(attrObj, args.exclude);
  }

  if (args.rename) {
    return modelRename(result, tableName, args.rename);
  }

  return Object.keys(result).join(', ') || '*';
};

const createModel = schemaObj => {
  const [schemaName, schema] = Object.entries(schemaObj)[0];
  const name = getTableName(schemaName);
  const queryString = createTable(name, schema);

  pool
    .query(queryString)
    .then(res => {
      console.log(`table ${name} created`);
    })
    .catch(err => {
      console.log(err);
      console.log(`failed to create table ${name}`);
    });
  // .finally(() => {
  //   pool.end();
  // });

  return {
    schema,
    tableName: name,
    query: text => pool.query(text),
    findOneWhere: (where, args) => {
      const attr = convertQueryObj(schema, name, args);
      const [whereName, whereValue] = Object.entries(where)[0];

      return pool
        .query(
          `SELECT ${attr} FROM ${name} WHERE "${whereName}"='${whereValue}';`
        )
        .then(({ rows }) => rows[0]);
    },
    findAll: args => {
      const attr = convertQueryObj(schema, name, args);
      const joinClause = convertToJoin(name, args);
      const query = `SELECT ${attr} FROM ${name} ${joinClause};`;

      return pool.query(query).then(({ rows }) => rows);
    },
    findByPK: (pk, args) => {
      const attr = convertQueryObj(schema, name, args);

      return pool
        .query(`SELECT ${attr} FROM ${name} WHERE id='${pk}';`)
        .then(({ rows }) => rows[0]);
    },
    deleteByPK: pk => {
      return pool
        .query(`DELETE FROM ${name} WHERE id='${pk}' RETURNING *;`)
        .then(({ rows }) => rows[0]);
    },
    createOne: (dataObj, { asColumns, ...args } = {}) => {
      const newDataObj = asColumns
        ? modelAsColumns(dataObj, asColumns)
        : dataObj;

      const attr = convertQueryObj(schema, name, args);

      const columns = Object.keys(newDataObj)
        .reduce((tot, key) => {
          return `${tot}, ${key}`;
        }, '')
        .slice(2);

      const query = `INSERT INTO ${name}(${columns}) VALUES ${convertSeed(
        Object.values(dataObj)
      )} RETURNING ${attr};`;

      return pool.query(query).then(({ rows }) => rows[0]);
    },
    updateByPK: (pk, newData) => {
      const updateValues = Object.keys(newData)
        .reduce((tot, key) => {
          return `${tot}, ${key} = '${newData[key]}'`;
        }, '')
        .slice(2);
      return pool
        .query(
          `UPDATE ${name} SET ${updateValues} WHERE id='${pk}' RETURNING *;`
        )
        .then(({ rows }) => rows[0]);
    }
  };
};

module.exports = {
  createTables,
  createModel,
  dropTables,
  seedTables,
  getTableName
};

require('make-runnable');
