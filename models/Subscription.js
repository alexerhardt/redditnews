const dbPath = require('../config/db');
const sqlite = require('sqlite');

class Subscription {
  static async exists(email, subreddit) {
    try {
      const db = await sqlite.open(dbPath);
      const res = await db.get(
        `SELECT * FROM Subscriptions
         WHERE email = '${email}' AND subreddit = '${subreddit}'`,
      );
      return res !== undefined;
    } catch (err) {
      throw new Error(err);
    }
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
    try {
      const db = await sqlite.open(dbPath);
      await db.run(`INSERT INTO 'Users' (email) VALUES ('${email}')`);
      await db.run(
        `INSERT INTO 'Subscriptions' (email, subreddit) VALUES ('${email}', '${subreddit}')`,
      );
    } catch (err) {
      throw new Error('Error creating new subscription: ' + err);
    }
  }

  static async unsubscribe(email, subreddit) {
    // TODO
  }
}

module.exports = Subscription;
