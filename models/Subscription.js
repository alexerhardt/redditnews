const sqlite = require('sqlite');
const dbPath = require('../config/db');
const limits = require('../constants/limits');

class Subscription {
  static async exists(email, subreddit) {
    const db = await sqlite.open(dbPath);
    const res = await db.get(
      `SELECT * FROM Subscriptions
         WHERE email = '${email}' AND subreddit = '${subreddit}'`,
    );
    return res !== undefined;
  }

  static async exceedsLimits(email) {
    const db = await sqlite.open(dbPath);
    const res = await db.all(
      `SELECT * FROM Subscriptions WHERE email = '${email}'`,
    );
    return res && res.length >= limits.MAX_SUBS_PER_EMAIL;
  }

  static async subscribe(email, subreddit) {
    // TODO
    // Validate email
    // TODO
    // Check that email has not appeared more than 3 times
    // TODO
    // Check that subreddit name is valid
    // Write user
    // Write subscription
    const db = await sqlite.open(dbPath);
    await db.run(`INSERT INTO 'Users' (email) VALUES ('${email}')`);
    await db.run(
      `INSERT INTO 'Subscriptions' (email, subreddit) VALUES ('${email}', '${subreddit}')`,
    );
  }

  static async unsubscribe(email, subreddit) {
    // TODO
  }
}

module.exports = Subscription;
