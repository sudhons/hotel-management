export default class Validator {
  static validate() {
    this.validates = [];
    return this;
  }

  static string() {
    this.validates.push((value, name) => {
      return (
        typeof value === 'string' || `(${name}) = (${value}) should be a string`
      );
    });
    return this;
  }

  static alpha() {
    this.validates.push((value = '', name) => {
      return (
        /[A-Za-z]/.test(value) ||
        `(${name}) = (${value || undefined}) should be letters`
      );
    });
    return this;
  }

  static maxLen(length) {
    this.validates.push((value = '', name) => {
      return (
        value.length <= length ||
        `(${name}) = (${value ||
          undefined}) should have maximun lenght of ${length}`
      );
    });
    return this;
  }

  static minLen(length) {
    this.validates.push((value = '', name) => {
      return (
        value.length >= length ||
        `(${name}) = (${value ||
          undefined}) should have minimun length of ${length}`
      );
    });
    return this;
  }

  static email() {
    this.validates.push((value = '', name) => {
      return (
        /\w+@\w+\.\w+/.test(value) ||
        `(${name}) = (${value || undefined}) should be an email`
      );
    });
    return this;
  }

  static required() {
    this.validates.unshift((value, name) => {
      return value !== undefined || `${name} is required`;
    });
    return this.validates;
  }

  static regex() {}

  static integer() {}

  static float() {}

  static minValue(value) {}

  static maxValue(value) {}
}

const validateHelper = (schema, body, name) => {
  return schema.reduce(
    (result, validationFunc) => {
      const value = validationFunc(body, name);
      typeof value !== 'boolean' && result[name].push(value);
      return result;
    },
    { [name]: [] }
  );
};

export const validate = (body, schema) => {
  const schemaKeys = Object.keys(schema);

  const result = schemaKeys.reduce((arr, next) => {
    const value = validateHelper(schema[next], body[next], next);
    value[next].length && arr.push(value);
    return arr;
  }, []);

  if (result.length) throw result;
};
