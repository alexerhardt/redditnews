const limits = require('./limits');

module.exports = {
  error: {
    INVALID_EMAIL: 'Invalid email',
    INVALID_SUBREDDIT: 'Cannot find that subreddit',
    MISSING_EMAIL: 'Missing email',
    MISSING_SUBREDDIT: 'Missing subreddit',
    SUBSCRIPTION_EXISTS: 'Operation could not be performed', // for privacy
    SUB_LIMIT_EXCEEDED: `You have exceeded the limit of ${limits.MAX_SUBS_PER_EMAIL} subs`,
    SERVER_ERROR: 'An internal server error occurred. Please try again later',
  },
};
