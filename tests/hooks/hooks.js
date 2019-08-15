const sqlite = require('sqlite');
const dbPath = require('../../config/db');
const { subs } = require('../seed/seed');

module.exports.populateDB = async function() {
  try {
    const db = await sqlite.open(dbPath);
    const queries = subs.map(sub => {
      db.run(
        `INSERT INTO Subscriptions (email, subreddit) 
         VALUES ('${sub.email}', '${sub.subreddit}')`,
      );
    });
    return await Promise.all(queries);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.wipeDB = async function() {
  try {
    const db = await sqlite.open(dbPath);
    await db.run('DELETE FROM Subscriptions');
    return db.run('DELETE FROM Users');
  } catch (err) {
    throw new Error(err);
  }
};
