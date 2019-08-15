const messages = require('../constants/messages');

module.exports.MissingEmailError = class extends Error {
  constructor(message) {
    super(message);
    this.clientMessage = messages.error.MISSING_EMAIL;
    this.httpStatus = 400;
  }
};

module.exports.InvalidEmailError = class extends Error {
  constructor(message) {
    super(message);
    this.clientMessage = messages.error.INVALID_EMAIL;
    this.httpStatus = 400;
  }
};

module.exports.MissingSubredditError = class extends Error {
  constructor(message) {
    super(message);
    this.clientMessage = messages.error.MISSING_SUBREDDIT;
    this.httpStatus = 400;
  }
};

module.exports.AlreadyExistsError = class extends Error {
  constructor(message) {
    super(message);
    this.clientMessage = messages.error.SUBSCRIPTION_EXISTS;
    this.httpStatus = 422;
  }
};

module.exports.LimitReachedError = class extends Error {
  constructor(message) {
    super(message);
    this.clientMessage = messages.error.SUB_LIMIT_EXCEEDED;
    this.httpStatus = 422;
  }
};
