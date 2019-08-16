const messages = require('../constants/messages');
const names = require('../constants/names');
const {
  MissingValueError,
  InvalidValueError,
  DuplicateValueError,
  SubscriptionLimitError,
} = require('../errors');

module.exports.mapErrorToHttpResponse = error => {
  let response = { error: {}, statusCode: -1 };

  if (error instanceof MissingValueError) {
    if (error.field === names.EMAIL) {
      response.error[names.EMAIL] = messages.error.MISSING_EMAIL;
    } else if (error.field === names.SUBREDDIT) {
      response.error[names.SUBREDDIT] = messages.error.MISSING_SUBREDDIT;
    }
    response.statusCode = 400;
  } else if (error instanceof InvalidValueError) {
    if (error.field === names.EMAIL) {
      response.error[names.EMAIL] = messages.error.INVALID_EMAIL;
    } else if (error.field === names.SUBREDDIT) {
      response.error[names.EMAIL] = messages.error.INVALID_SUBREDDIT;
    }
    response.statusCode = 400;
  } else if (error instanceof DuplicateValueError) {
    response.error[names.EMAIL] = messages.error.SUBSCRIPTION_EXISTS;
    response.statusCode = 422;
  } else if (error instanceof SubscriptionLimitError) {
    response.error[names.EMAIL] = messages.error.SUB_LIMIT_EXCEEDED;
    response.statusCode = 422;
  } else {
    response.error = 'Internal server error';
    response.statusCode = 500;
  }

  return response;
};
