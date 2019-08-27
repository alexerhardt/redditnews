const r = require('../config/reddit-api');

class Subreddit {
  static async exists(subreddit) {
    try {
      const res = await r.searchSubredditNames({
        query: subreddit,
        exact: true,
      });
      return res.length > 0;
    } catch (e) {
      if (e.statusCode === 404) {
        return false;
      }
      throw e;
    }
  }
}

module.exports = Subreddit;
