const messages = require('../constants/messages');
const names = require('../constants/names');
const {
  MissingValueError,
  InvalidValueError,
  DuplicateValueError,
  SubscriptionLimitError,
} = require('../errors');

module.exports.mapErrorToHttpResponse = error => {
  let response = { error: 'Internal server error', statusCode: 500 };

  if (error instanceof MissingValueError) {
    if (error.field === names.EMAIL) {
      response.error = messages.error.MISSING_EMAIL;
    } else if (error.field === names.SUBREDDIT) {
      response.error = messages.error.MISSING_SUBREDDIT;
    }
    response.statusCode = 400;
  } else if (error instanceof InvalidValueError) {
    if (error.field === names.EMAIL) {
      response.error = messages.error.INVALID_EMAIL;
    } else if (error.field === names.SUBREDDIT) {
      response.error = messages.error.INVALID_SUBREDDIT;
    }
    response.statusCode = 400;
  } else if (error instanceof DuplicateValueError) {
    response.error = messages.error.SUBSCRIPTION_EXISTS;
    response.statusCode = 422;
  } else if (error instanceof SubscriptionLimitError) {
    response.error = messages.error.SUB_LIMIT_EXCEEDED;
    response.statusCode = 422;
  }

  return response;
};
