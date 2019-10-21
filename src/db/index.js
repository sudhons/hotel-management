import('dotenv/config');
import { Client } from 'pg';
import { SchemaTypes } from './SchemaTypes';
import schemas from '../schemas';
import seeders from '../seeders';
import Model from './Model';

let alterString = '';

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

const makeQuery = queryString => {
  pool
    .query(queryString)
    .then(res => {
      console.log('success');
    })
    .catch(err => {
      console.log(err);
      console.log('failed');
    })
    .finally(() => {
      pool.end();
    });
};

const convertToTableName = schemaName => {
  return schemaName
    .replace(/[A-Z]/g, '_$&')
    .toLowerCase()
    .replace(/[a-z]$/, lastLetter => {
      switch (lastLetter) {
        case 'y':
          return 'ies';
        case 'f':
          return 'ves';
        case 'x':
          return 'xes';
        case 's':
        case 'h':
          return lastLetter + 'es';
        default:
          return lastLetter + 's';
      }
    });
};

// const convertSchemaTypes = typeObj => {
const convertSchemaTypes = (typeObj, tableName, columnName) => {
  const { type, maxLength, reference, primary, nullable, unique } = typeObj;
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

  // if (reference) {
  //   const { refSchema, refColumn, onDelete } = reference;

  //   result = `${result} ${'REFERENCES'} ${convertToTableName(
  //     refSchema
  //   )}(${refColumn})`;

  //   if (onDelete) {
  //     result = `${result} ON DELETE ${onDelete}`;
  //   }
  // }

  if (reference) {
    const { refSchema, onDelete } = reference;

    alterString += `ALTER TABLE ${tableName} ADD FOREIGN KEY (${columnName}) REFERENCES ${convertToTableName(
      refSchema
    )} ${onDelete ? `ON DELETE ${onDelete};` : ';'}`;
  }

  if (typeObj.default !== undefined) {
    if (typeObj.default === SchemaTypes.UUID) {
      result = `${result} DEFAULT uuid_generate_v1()`;
    } else {
      result = `${result}  DEFAULT ${typeObj.default}`;
    }
  }

  return result;
};

const createTable = (name, { columns, constraints }) => {
  let constraintString = '';

  if (constraints) {
    const [key, value] = Object.entries(constraints)[0];
    constraintString = `, ${key} (${value.join(', ')})`;
  }

  // const columnsWithProperties = Object.keys(columns)
  //   .reduce((tot, column) => {
  //     return `${tot}, ${column} ${convertSchemaTypes(columns[column])}`;
  //   }, '')
  //   .slice(2);
  const columnsWithProperties = Object.keys(columns)
    .reduce((tot, columnName) => {
      return `${tot}, ${columnName} ${convertSchemaTypes(
        columns[columnName],
        name,
        columnName
      )}`;
    }, '')
    .slice(2);

  const query = `
  CREATE TABLE IF NOT EXISTS
    ${name}(
      ${columnsWithProperties}
      ${constraintString}
    );
  `;

  return query;
};

const dropTable = name => `DROP TABLE IF EXISTS ${name} CASCADE;`;

const convertSeed = data => {
  return `(${data.reduce((tot, key) => `${tot}, '${key}'`, '').slice(2)})`;
};

const seedTable = (name, data) => {
  const columns = Object.keys(data[0])
    .reduce((tot, key) => `${tot}, ${key}`, '')
    .slice(2);

  const values = data
    .reduce((tot, item) => `${tot}, ${convertSeed(Object.values(item))}`, '')
    .slice(2);

  return `INSERT INTO ${name}(${columns}) VALUES ${values};`;
};

export const dropTables = () => {
  const queryString = Object.keys(schemas).reduce((tot, key) => {
    return `${tot}${dropTable(convertToTableName(key))}`;
  }, '');

  makeQuery(queryString);
};

export const seedTables = () => {
  const queryString = Object.keys(seeders).reduce((tot, key) => {
    return `${tot}${seedTable(convertToTableName(key), seeders[key])}`;
  }, '');

  makeQuery(queryString);
};

export const createTables = () => {
  const queryString = Object.keys(schemas).reduce((tot, key) => {
    return `${tot}${createTable(convertToTableName(key), schemas[key])}`;
  }, '');

  // makeQuery(queryString);
  makeQuery(queryString + alterString);
};

export const createModel = schemaObj => {
  const [schemaName, schema] = Object.entries(schemaObj)[0];
  const name = convertToTableName(schemaName);
  const queryString = createTable(name, schema);

  pool.query(queryString);

  return new Model(pool, schema, name);
};

import('make-runnable');
