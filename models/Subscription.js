const sqlite = require('sqlite');
const validator = require('validator');
const dbPath = require('../config/db');
const limits = require('../constants/limits');
const names = require('../constants/names');
const {
  MissingValueError,
  InvalidValueError,
  DuplicateValueError,
  SubscriptionLimitError,
} = require('../errors');

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
    if (!email) {
      throw new MissingValueError(names.EMAIL);
    }
    if (!validator.isEmail(email)) {
      throw new InvalidValueError(names.EMAIL, email);
    }
    if (!subreddit) {
      throw new MissingValueError(names.SUBREDDIT);
    }
    // If it already exists, do nothing; this results in a 200
    // We don't want to unveil if a user is subscribed to a certain subreddit
    if (await this.exists(email, subreddit)) {
      return;
    }
    if (await this.exceedsLimits(email)) {
      throw new SubscriptionLimitError(names.EMAIL, limits.MAX_SUBS_PER_EMAIL);
    }

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
