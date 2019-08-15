const limits = require('./limits');

module.exports = {
  error: {
    INVALID_EMAIL: 'Invalid email',
    MISSING_EMAIL: 'Missing email',
    MISSING_SUBREDDIT: 'Missing subreddit',
    SUBSCRIPTION_EXISTS: 'This email / subreddit combination already exists.',
    SUB_LIMIT_EXCEEDED: `You have exceeded the limit of ${limits.MAX_SUBS_PER_EMAIL} subs`,
  },
};
