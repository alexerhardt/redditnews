const sqlite = require('sqlite');
const validator = require('validator');
const dbPath = require('../config/db');
const limits = require('../constants/limits');
const {
  InvalidEmailError,
  AlreadyExistsError,
  LimitReachedError,
  MissingEmailError,
  MissingSubredditError,
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
      throw new MissingEmailError();
    }
    if (!validator.isEmail(email)) {
      throw new InvalidEmailError();
    }
    if (!subreddit) {
      throw new MissingSubredditError();
    }
    if (await this.exists(email, subreddit)) {
      throw new AlreadyExistsError();
    }
    if (await this.exceedsLimits(email)) {
      throw new LimitReachedError();
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
