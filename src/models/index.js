import { createModel } from '../db';
import schemas from '../schemas';

const capitalise = schemaName => {
  return schemaName.replace(
    /^[a-z]/,
    firstLetter => `${firstLetter.toUpperCase()}`
  );
};

export default Object.entries(schemas).reduce(
  (models, [schemaName, schema]) => {
    models[capitalise(schemaName)] = createModel({
      [schemaName]: schema
    });

    return models;
  },
  {}
);
