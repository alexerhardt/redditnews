class ValidationError extends Error {
  constructor(message, field, value) {
    super();
    this.message = message;
    this.field = field;
    this.value = value;
  }
}

module.exports.MissingValueError = class extends ValidationError {
  constructor(field) {
    super(`Missing ${field}`, field, null);
  }
};

module.exports.InvalidValueError = class extends ValidationError {
  constructor(field, value) {
    super(`Invalid ${field}: ${value}`, field, value);
  }
};

module.exports.DuplicateValueError = class extends ValidationError {
  constructor(field, value) {
    super(`This ${field} already exists: ${value}`, field, value);
  }
};

module.exports.SubscriptionLimitError = class extends Error {
  constructor(email, limit) {
    super();
    this.message = `${email} has reached the subscription limit: ${limit}`;
  }
};
