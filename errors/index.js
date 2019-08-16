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

// TODO: Delete
// module.exports.MissingEmailError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.clientMessage = messages.error.MISSING_EMAIL;
//     this.httpStatus = 400;
//   }
// };

// TODO: Delete
// module.exports.InvalidEmailError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.clientMessage = messages.error.INVALID_EMAIL;
//     this.httpStatus = 400;
//   }
// };

// TODO: Delete
// module.exports.MissingSubredditError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.clientMessage = messages.error.MISSING_SUBREDDIT;
//     this.httpStatus = 400;
//   }
// };

// module.exports.AlreadyExistsError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.clientMessage = messages.error.SUBSCRIPTION_EXISTS;
//     this.httpStatus = 422;
//   }
// };

// module.exports.LimitReachedError = class extends Error {
//   constructor(message) {
//     super(message);
//     this.clientMessage = messages.error.SUB_LIMIT_EXCEEDED;
//     this.httpStatus = 422;
//   }
// };
