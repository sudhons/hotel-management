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

  static uuidv4() {
    this.validates.push((value, name) => {
      return (
        /^[a-f0-9]{8}-[a-f0-9]{4}-[4][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
          value
        ) || `(${name}) = (${value}) should be a uuid version 4`
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

  static optional() {
    this.validates.unshift(value => (value ? 'continue' : 'stop'));
    return this.validates;
  }

  static regex() {}

  static integer() {}

  static float() {
    this.validates.push((value, name) => {
      return (
        Number.isFinite(value) || `(${name}) = (${value}) should be a float`
      );
    });
    return this;
  }

  static positive() {
    this.validates.push((value, name) => {
      return (
        value > 0 || `(${name}) = (${value}) should be a positive float number`
      );
    });
    return this;
  }

  static minValue(value) {}

  static maxValue(value) {}
}

const validateHelper = (schema, body, name) => {
  const result = { [name]: [] };

  for (let index = 0; index < schema.length; index++) {
    const value = schema[index](body, name);

    if (value === 'continue') continue;
    if (value === 'stop') return result;

    value !== true && result[name].push(value);
  }

  return result;
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
